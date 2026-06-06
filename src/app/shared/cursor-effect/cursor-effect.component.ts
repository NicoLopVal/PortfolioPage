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
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

// ─── Particle model ──────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  /** Velocity in logical-px/frame (≈16 ms) at the moment of spawning. */
  vx: number;
  vy: number;
  /** Magnitude of (vx, vy). */
  speed: number;
  birthTime: number;
  /** Total lifespan in ms — inversely proportional to speed. */
  duration: number;
}

// ─── Tuning constants ─────────────────────────────────────────────────────────

/** Pixels of cursor travel between consecutive particle spawns. */
const SPAWN_DIST_PX = 5;
/** Hard cap on live particles to guard against runaway RAM usage. */
const MAX_PARTICLES = 160;
/** Outer ring radius in logical pixels. */
const CURSOR_RADIUS = 18;
/** Inner dot radius in logical pixels. */
const DOT_RADIUS = 2;
/** Lerp factor applied to the ring position each rAF frame (0..1).
 *  Lower = more lag, higher = snappier. 0.12 ≈ ~150 ms perceived delay. */
const RING_LERP = 0.12;
/** Minimum trailing ellipse half-height (perpendicular axis). */
const MIN_RADIUS_B = 1.5;
/** Base particle half-radius before any elongation. */
const BASE_RADIUS = 3;
/** Scale factor: maps speed (px/frame) → elongation pixels. */
const ELONGATION_SCALE = 0.85;
/** Peak particle opacity at life = 1. */
const PEAK_OPACITY = 0.6;

@Component({
  selector: 'app-cursor-effect',
  standalone: true,
  templateUrl: './cursor-effect.component.html',
  styleUrl: './cursor-effect.component.scss',
})
export class CursorEffectComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private readonly canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly ngZone = inject(NgZone);
  private readonly doc = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  // ── State ─────────────────────────────────────────────────────────────────

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];

  /** Current cursor position in logical CSS pixels. */
  private mouseX = -300;
  private mouseY = -300;

  /** Previous cursor position — used to compute displacement between events. */
  private lastX = -300;
  private lastY = -300;
  private lastMoveTime = 0;

  /** Accumulated travel distance since the last particle was spawned. */
  private spawnAccum = 0;

  /** Accent colour string read from the active CSS theme. */
  private accentColor = '#0EA5E9';

  /** Lagging ring position — lerps toward mouseX/Y every frame. */
  private ringX = -300;
  private ringY = -300;

  private rafId: number | null = null;
  private themeObserver?: MutationObserver;

  /** True once the first mousemove has fired (avoids a giant dx/dy on init). */
  private hasFirstMove = false;

  /** False while the pointer is outside the viewport — hides both cursor elements. */
  private isVisible = false;

  /** True while touch is the active input — suppresses the custom cursor. */
  private isTouchActive = false;

  // ── Bound callbacks (stored so we can removeEventListener cleanly) ─────────

  private readonly onMouseMoveBound = (e: MouseEvent) => this.onMouseMove(e);
  private readonly onResizeBound = () => this.resize();
  private readonly onMouseEnterBound = () => { if (!this.isTouchActive) this.isVisible = true; };
  private readonly onMouseLeaveBound = () => { this.isVisible = false; };
  private readonly onTouchStartBound = () => {
    // Touch input detected — hide the custom cursor and restore the native one
    // so touch interactions feel completely normal.
    this.isTouchActive = true;
    this.isVisible = false;
    this.doc.documentElement.classList.remove('cursor-custom');
  };

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Skip when NO input device supports a fine pointer (pure touch/stylus only).
    // Using any-pointer instead of pointer so hybrid devices (touchscreen laptops)
    // still activate the cursor when a mouse is connected.
    if (!window.matchMedia('(any-pointer: fine)').matches) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // GPU / canvas unavailable — bail gracefully
    this.ctx = ctx;
    this.resize();

    // Apply the CSS class that hides the OS cursor globally.
    this.doc.documentElement.classList.add('cursor-custom');

    // Seed the accent colour and watch for theme changes via MutationObserver
    // so we never need getComputedStyle inside the hot render loop.
    this.readAccentColor();
    this.themeObserver = new MutationObserver(() => this.readAccentColor());
    this.themeObserver.observe(this.doc.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // ── Everything below runs OUTSIDE Angular's zone ───────────────────────
    //
    // Rationale: mousemove fires at up to ~1 000 Hz on modern hardware.
    // If we ran inside the zone, Angular's change-detection would re-evaluate
    // the entire component tree on every single mouse event, causing severe
    // jank.  By running outside the zone we bypass that entirely; the canvas
    // is updated directly via the DOM API and Angular never has to do any work
    // while the cursor moves.
    this.ngZone.runOutsideAngular(() => {
      this.doc.addEventListener('mousemove', this.onMouseMoveBound, { passive: true });
      this.doc.addEventListener('touchstart', this.onTouchStartBound, { passive: true });
      this.doc.documentElement.addEventListener('mouseenter', this.onMouseEnterBound);
      this.doc.documentElement.addEventListener('mouseleave', this.onMouseLeaveBound);
      window.addEventListener('resize', this.onResizeBound, { passive: true });

      // Kick off the rAF render loop — also outside the zone for the same reason.
      this.rafId = requestAnimationFrame((t) => this.loop(t));
    });
  }

  ngOnDestroy(): void {
    this.doc.removeEventListener('mousemove', this.onMouseMoveBound);
    this.doc.removeEventListener('touchstart', this.onTouchStartBound);
    this.doc.documentElement.removeEventListener('mouseenter', this.onMouseEnterBound);
    this.doc.documentElement.removeEventListener('mouseleave', this.onMouseLeaveBound);
    window.removeEventListener('resize', this.onResizeBound);
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.themeObserver?.disconnect();
    this.doc.documentElement.classList.remove('cursor-custom');
  }

  // ── Input handling ────────────────────────────────────────────────────────

  private onMouseMove(e: MouseEvent): void {
    // A real mousemove (not a touch-synthesised one) means a mouse is in use.
    // Re-engage the custom cursor if touch had previously suppressed it.
    if (this.isTouchActive) {
      this.isTouchActive = false;
      this.doc.documentElement.classList.add('cursor-custom');
    }

    // Skip the very first event to avoid a huge dx/dy from the off-screen
    // sentinel position (-300, -300) to wherever the cursor actually is.
    if (!this.hasFirstMove) {
      this.hasFirstMove = true;
      this.isVisible = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      // Snap the ring so it doesn't fly in from the off-screen sentinel.
      this.ringX = e.clientX;
      this.ringY = e.clientY;
      this.lastMoveTime = performance.now();
      return;
    }

    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }

  private emit(x: number, y: number, vx: number, vy: number, speed: number): void {
    // Faster cursor → shorter lifespan (trail feels snappy, energetic).
    // Slower cursor → longer lifespan (particles linger and drift away softly).
    const duration = Math.max(100, 480 - speed * 2.8);

    this.particles.push({ x, y, vx, vy, speed, birthTime: performance.now(), duration });

    // Trim oldest particles once the pool is full.
    if (this.particles.length > MAX_PARTICLES) {
      this.particles.splice(0, this.particles.length - MAX_PARTICLES);
    }
  }

  // ── Render loop ───────────────────────────────────────────────────────────

  private loop(now: number): void {
    // Cull dead particles before drawing.
    this.particles = this.particles.filter((p) => now - p.birthTime < p.duration);

    // Lerp the ring toward the real cursor position every frame.
    // This is what creates the intentional lag between dot and ring.
    this.ringX += (this.mouseX - this.ringX) * RING_LERP;
    this.ringY += (this.mouseY - this.ringY) * RING_LERP;

    this.render(now);
    this.rafId = requestAnimationFrame((t) => this.loop(t));
  }

  private render(now: number): void {
    const { width, height } = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, width, height);
    this.drawCursor();
  }

  // ── Drawing helpers ───────────────────────────────────────────────────────

  private drawParticle(p: Particle, life: number): void {
    // Quadratic ease-out: fades fast at first, lingers at the end.
    const eased = life * life;

    // Elongation: high speed → stretched ellipse along velocity direction.
    // As `life` drops toward 0 the particle compresses back to a dot.
    const radiusA = BASE_RADIUS + p.speed * ELONGATION_SCALE * eased;
    const radiusB = Math.max(MIN_RADIUS_B, BASE_RADIUS - p.speed * 0.18 * eased);
    const angle = p.speed > 0.5 ? Math.atan2(p.vy, p.vx) : 0;

    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(angle);
    ctx.globalAlpha = eased * PEAK_OPACITY;
    ctx.fillStyle = this.accentColor;
    ctx.beginPath();
    ctx.ellipse(0, 0, radiusA, radiusB, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  private drawCursor(): void {
    if (!this.isVisible) return;

    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = 1;

    // ── Outer ring (lagging) ──────────────────────────────────────────────
    // Thin dark halo just outside the ring so it stays visible over any
    // background that matches the accent colour (req. 2).
    ctx.beginPath();
    ctx.arc(this.ringX, this.ringY, CURSOR_RADIUS + 1, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Accent-coloured ring on top.
    ctx.beginPath();
    ctx.arc(this.ringX, this.ringY, CURSOR_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = this.accentColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // ── Inner dot (pinned to real cursor — this is the true click point) ──
    // Dark halo so the dot stays visible over same-colour backgrounds.
    ctx.beginPath();
    ctx.arc(this.mouseX, this.mouseY, DOT_RADIUS + 1, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.mouseX, this.mouseY, DOT_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = this.accentColor;
    ctx.fill();

    ctx.restore();
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    // Match canvas pixel dimensions to the viewport so no scaling occurs.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /**
   * Reads `--color-accent` from the active CSS theme once per theme change
   * (via MutationObserver).  Not called inside the hot render loop.
   */
  private readAccentColor(): void {
    const color = getComputedStyle(this.doc.documentElement)
      .getPropertyValue('--color-accent')
      .trim();
    if (color) this.accentColor = color;
  }
}
