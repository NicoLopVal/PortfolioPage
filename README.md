# Portfolio — Angular Single Page

A single-page personal portfolio built with Angular 17, standalone components, and custom SCSS. The design follows a dark theme with a **cyan accent** (configurable to green).

## Quick start

```bash
cd portfolio
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200).

## Project structure

| Path | Purpose |
|------|---------|
| `src/app/core/data/portfolio.data.ts` | **All content** — edit this first for Phase 2 |
| `src/app/core/models/portfolio.models.ts` | TypeScript interfaces |
| `src/app/sections/` | One component per page section |
| `src/app/layout/` | Sidebar navigation, section headers, footer |
| `src/styles/_variables.scss` | Colors, fonts, spacing (CSS variables) |
| `src/assets/images/` | Photos and portfolio thumbnails |

## Phase 2 — Add your information

### 1. Edit content

Open [`src/app/core/data/portfolio.data.ts`](src/app/core/data/portfolio.data.ts) and update:

- `profile` — name, tagline, bio paragraphs, image paths
- `education`, `experience`, `skillsLeft`, `skillsRight`
- `services`, `portfolio`, `testimonials`
- `contact` — address, phone, email
- `socialLinks` — real URLs
- `footerCopyright`

### 2. Replace images

Place your files in `src/assets/images/`:

| File | Used in |
|------|---------|
| `hero.jpg` (or `.png`) | Hero banner |
| `about.jpg` | About + Contact avatar |
| `portfolio-*.jpg` | Portfolio grid |
| `avatar.jpg` | Reference testimonial |

Update paths in `portfolio.data.ts` to match your filenames.

### 3. Add your CV

1. Put your PDF in `src/assets/files/cv.pdf`
2. Set `cvUrl: 'assets/files/cv.pdf'` in `portfolio.data.ts`

### 4. Change accent color (cyan → green)

In [`src/styles/_variables.scss`](src/styles/_variables.scss):

```scss
--color-accent: #2ecc71;        /* green */
--color-accent-hover: #27ae60;
```

Default cyan: `#00bcd4`

### 5. Contact form (optional backends)

Phase 1 logs to the console and shows a success message. To go live:

- **mailto:** — build a `mailto:` link on submit
- **EmailJS** — add their SDK and API key
- **Custom API** — POST `form.value` to your endpoint

## Build for production

```bash
ng build
```

Output: `dist/portfolio/`

## Sections included

Hero, About, Education, Experience, Skills, Services, Portfolio, Reference, Contact

Excluded (can be added later): Pricing, Interests, Blog
