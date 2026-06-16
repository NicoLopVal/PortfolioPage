import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// ─── Node model ───────────────────────────────────────────────────────────────

interface Node {
  x: number;
  y: number;
  /** Velocity in logical-px/frame (≈16 ms). */
  vx: number;
  vy: number;
}

// ─── Tuning constants ─────────────────────────────────────────────────────────

/** One node per this many CSS px² of canvas area (lower = denser web). */
const AREA_PER_NODE = 14_000;
/** Clamp on node count so huge / tiny viewports stay sensible & performant. */
const MIN_NODES = 30;
const MAX_NODES = 130;

/** Max distance (px) between two nodes for a line to be drawn. */
const LINK_DIST = 132;
/** Max distance (px) from the cursor for a node to link to it. */
const MOUSE_LINK_DIST = 178;
/** Radius (px) within which the cursor nudges nodes away. */
const MOUSE_PUSH_RADIUS = 150;
/** Strength of the cursor's push impulse per frame. */
const MOUSE_PUSH = 0.55;

/** Baseline drift speed each node settles back toward. */
const BASE_SPEED = 0.24;
/** Hard cap on speed so cursor impulses never make nodes fly. */
const MAX_SPEED = 1.15;
/** Per-frame velocity damping (bleeds off cursor impulses smoothly). */
const FRICTION = 0.98;

/**
 * Per-theme palette. On dark backgrounds we blend additively ('lighter') with
 * bright warm tones for a luminous, glowing web. That trick washes out on a
 * light/white background (white + colour = white), so in light mode we paint
 * normally ('source-over') with a deeper, more saturated orange that reads
 * clearly against the near-white background.
 */
const PALETTE = {
  dark: {
    composite: 'lighter' as GlobalCompositeOperation,
    line: '255, 138, 48',
    dot: '255, 172, 86',
    lineAlpha: 0.5,
    mouseAlpha: 0.65,
    dotAlpha: 0.85,
  },
  light: {
    composite: 'source-over' as GlobalCompositeOperation,
    line: '234, 88, 12',
    dot: '194, 65, 12',
    lineAlpha: 0.55,
    mouseAlpha: 0.72,
    dotAlpha: 0.95,
  },
};

/**
 * A single, page-wide particle "plexus" background. It is a fixed, viewport-
 * sized layer that sits behind the whole site, so the web is one continuous
 * field — scrolling between sections never restarts it and the seams between
 * sections are imperceptible. Sections that should hide it (e.g. the accent
 * Services section) simply paint an opaque background over the top.
 */
@Component({
  selector: 'app-particle-network',
  standalone: true,
  templateUrl: './particle-network.component.html',
  styleUrl: './particle-network.component.scss',
})
export class ParticleNetworkComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private readonly canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);

  // ── State ─────────────────────────────────────────────────────────────────

  private ctx!: CanvasRenderingContext2D;
  private nodes: Node[] = [];

  /** Canvas size in CSS pixels — the viewport (logical units for the sim). */
  private w = 0;
  private h = 0;

  /** Cursor position in viewport CSS pixels (matches clientX/Y directly). */
  private mouseX = -1;
  private mouseY = -1;
  private mouseActive = false;

  private rafId: number | null = null;
  private themeObserver?: MutationObserver;
  private running = false;
  private reducedMotion = false;

  /** Active palette (swapped on theme change). */
  private theme = PALETTE.light;

  // ── Bound listeners (stored for clean removal) ────────────────────────────

  private readonly onMouseMoveBound = (e: MouseEvent) => this.onMouseMove(e);
  private readonly onMouseLeaveBound = () => { this.mouseActive = false; };
  private readonly onResizeBound = () => this.resize();
  private readonly onVisibilityBound = () => {
    if (document.hidden) this.stop();
    else this.start();
  };

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // canvas unavailable — degrade gracefully to the plain bg
    this.ctx = ctx;

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.readTheme();
    this.resize();

    // Swap the palette when the site theme flips (no getComputedStyle in the loop).
    this.themeObserver = new MutationObserver(() => {
      this.readTheme();
      if (this.reducedMotion) this.render(); // static frame needs a manual repaint
    });
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    this.ngZone.runOutsideAngular(() => {
      // Cursor interaction only matters for fine pointers (mouse / trackpad).
      if (window.matchMedia('(any-pointer: fine)').matches) {
        window.addEventListener('mousemove', this.onMouseMoveBound, { passive: true });
        window.addEventListener('mouseout', this.onMouseLeaveBound, { passive: true });
      }
      window.addEventListener('resize', this.onResizeBound, { passive: true });
      document.addEventListener('visibilitychange', this.onVisibilityBound);

      this.start();
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('mousemove', this.onMouseMoveBound);
    window.removeEventListener('mouseout', this.onMouseLeaveBound);
    window.removeEventListener('resize', this.onResizeBound);
    document.removeEventListener('visibilitychange', this.onVisibilityBound);
    this.themeObserver?.disconnect();
    this.stop();
  }

  private readTheme(): void {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    this.theme = dark ? PALETTE.dark : PALETTE.light;
  }

  // ── Loop control ──────────────────────────────────────────────────────────

  private start(): void {
    if (this.running) return;
    this.running = true;
    if (this.reducedMotion) {
      // Honour reduced-motion: paint a single static frame, no animation.
      this.render();
      this.running = false;
      return;
    }
    this.rafId = requestAnimationFrame(() => this.loop());
  }

  private stop(): void {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private loop(): void {
    if (!this.running) return;
    this.update();
    this.render();
    this.rafId = requestAnimationFrame(() => this.loop());
  }

  // ── Input ─────────────────────────────────────────────────────────────────

  private onMouseMove(e: MouseEvent): void {
    // The layer is viewport-fixed, so client coords map straight to canvas coords.
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.mouseActive =
      e.clientX >= 0 && e.clientX <= this.w && e.clientY >= 0 && e.clientY <= this.h;
  }

  // ── Simulation ──────────────────────────────────────────────────────────────

  private update(): void {
    for (const n of this.nodes) {
      // Cursor repulsion — gently parts the web around the pointer.
      if (this.mouseActive) {
        const dx = n.x - this.mouseX;
        const dy = n.y - this.mouseY;
        const d2 = dx * dx + dy * dy;
        const r = MOUSE_PUSH_RADIUS;
        if (d2 > 0 && d2 < r * r) {
          const d = Math.sqrt(d2);
          const f = (1 - d / r) * MOUSE_PUSH;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }
      }

      // Damp, then keep each node drifting within [BASE_SPEED, MAX_SPEED].
      n.vx *= FRICTION;
      n.vy *= FRICTION;
      let sp = Math.hypot(n.vx, n.vy);
      if (sp < 1e-4) {
        const a = Math.random() * Math.PI * 2;
        n.vx = Math.cos(a) * BASE_SPEED;
        n.vy = Math.sin(a) * BASE_SPEED;
        sp = BASE_SPEED;
      }
      const clamped = Math.min(MAX_SPEED, Math.max(BASE_SPEED, sp));
      if (clamped !== sp) {
        n.vx = (n.vx / sp) * clamped;
        n.vy = (n.vy / sp) * clamped;
      }

      // Integrate + bounce off the edges to keep density uniform.
      n.x += n.vx;
      n.y += n.vy;
      if (n.x <= 0) { n.x = 0; n.vx = -n.vx; }
      else if (n.x >= this.w) { n.x = this.w; n.vx = -n.vx; }
      if (n.y <= 0) { n.y = 0; n.vy = -n.vy; }
      else if (n.y >= this.h) { n.y = this.h; n.vy = -n.vy; }
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  private render(): void {
    const ctx = this.ctx;
    const t = this.theme;
    ctx.clearRect(0, 0, this.w, this.h);
    // Dark theme blends additively so the web glows; light theme paints
    // normally with a deeper orange so it stays visible on the near-white bg.
    ctx.globalCompositeOperation = t.composite;

    const nodes = this.nodes;

    // Node-to-node links.
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > LINK_DIST * LINK_DIST) continue;
        const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * t.lineAlpha;
        ctx.strokeStyle = `rgba(${t.line}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // Cursor links — brighter, slightly thicker.
    if (this.mouseActive) {
      ctx.lineWidth = 1.2;
      for (const n of nodes) {
        const dx = n.x - this.mouseX;
        const dy = n.y - this.mouseY;
        const d2 = dx * dx + dy * dy;
        if (d2 > MOUSE_LINK_DIST * MOUSE_LINK_DIST) continue;
        const alpha = (1 - Math.sqrt(d2) / MOUSE_LINK_DIST) * t.mouseAlpha;
        ctx.strokeStyle = `rgba(${t.line}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(this.mouseX, this.mouseY);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();
      }
    }

    // Dots on top.
    ctx.fillStyle = `rgba(${t.dot}, ${t.dotAlpha})`;
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.7, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  // ── Sizing & seeding ──────────────────────────────────────────────────────

  private resize(): void {
    const w = Math.max(1, window.innerWidth);
    const h = Math.max(1, window.innerHeight);

    const countTarget = Math.round((w * h) / AREA_PER_NODE);
    const desired = Math.min(MAX_NODES, Math.max(MIN_NODES, countTarget));

    const canvas = this.canvasRef.nativeElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const grew = w > this.w || h > this.h;
    this.w = w;
    this.h = h;

    this.reseed(desired);

    // Static reduced-motion frame needs an explicit repaint on resize.
    if (this.reducedMotion && grew) this.render();
  }

  /** Add or remove nodes to hit `count`, keeping existing ones in bounds. */
  private reseed(count: number): void {
    for (const n of this.nodes) {
      n.x = Math.min(this.w, Math.max(0, n.x));
      n.y = Math.min(this.h, Math.max(0, n.y));
    }
    while (this.nodes.length < count) this.nodes.push(this.spawn());
    if (this.nodes.length > count) this.nodes.length = count;
  }

  private spawn(): Node {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      vx: Math.cos(angle) * BASE_SPEED,
      vy: Math.sin(angle) * BASE_SPEED,
    };
  }
}
