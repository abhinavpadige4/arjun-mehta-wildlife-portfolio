# Arjun Mehta — Wildlife Photographer Portfolio

A static portfolio website for wildlife photographer Arjun Mehta. Built with plain HTML, CSS, and Tailwind CSS via CDN — no build step, no dependencies, deploy-ready.

## Overview

This project is a four-page static site showcasing Arjun Mehta's wildlife photography work. It features a full-bleed hero, a filterable masonry gallery with lightbox, a detailed about page with career timeline, and a contact/booking page with client-side form validation.

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, flexbox, grid, responsive design
- **Tailwind CSS** — via CDN (no build step)
- **Google Fonts** — Playfair Display (display), Inter (body)
- **Vanilla JavaScript** — navigation, gallery filtering, lightbox, form handling
- **JSON data** — photo metadata in `data/photos.json`

## File Structure

```
/
├── index.html          # Home page — hero, featured work, testimonials, awards
├── gallery.html        # Full gallery with habitat filters and lightbox
├── about.html          # Bio, timeline, awards, publications
├── contact.html        # Contact details and booking form
├── css/
│   ├── base.css        # Global styles, design tokens, typography, utilities
│   ├── nav.css         # Fixed navigation with backdrop blur
│   ├── hero.css        # Hero section styles
│   └── footer.css      # Footer styles
├── js/
│   ├── nav.js          # Mobile menu toggle, scroll behavior
│   ├── gallery.js      # Photo grid rendering, habitat filtering
│   ├── lightbox.js     # Lightbox modal for photo viewing
│   └── form.js         # Contact form validation and mailto submission
├── data/
│   └── photos.json     # Photo metadata (Photo[] array)
├── README.md           # This file
└── .vercel             # Vercel deployment config (optional)
```

## How to Run Locally

### Option 1: Open Directly

Simply open `index.html` in your browser. All assets are relative and the site works without a server.

### Option 2: Local Server

For a more accurate preview (especially for fetch-based JSON loading):

```bash
npx serve .
```

Or with Python:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## How to Deploy

### Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) and click **New Project**.
3. Import your repository.
4. Vercel auto-detects a static site — no build command needed.
5. Set the **Output Directory** to `/` (root).
6. Click **Deploy**.

For custom domains, add your domain in Vercel's project settings and update DNS records.

### GitHub Pages

1. Push to a GitHub repository.
2. Go to **Settings → Pages**.
3. Set **Source** to `Deploy from a branch`.
4. Select `main` branch and `/` (root) folder.
5. Click **Save**.
6. Your site will be available at `https://<username>.github.io/<repo>/`.

### Netlify

1. Drag and drop the project folder onto [netlify.com/drop](https://app.netlify.com/drop).
2. Or connect your Git repository for continuous deployment.

## Customization Guide

### Swap Photos

1. Edit `data/photos.json` — each entry has a `src` and `thumb` field.
2. Replace the `picsum.photos` URLs with your own image URLs.
3. Ensure images are at least 1600×1000 for full-size and 800×500 for thumbnails.
4. Update the `id` (slug), `title`, `species`, `habitat`, `location`, `year`, and `caption` fields.
5. Set `featured: true` for photos you want on the homepage.

### Edit Photo Data

The `data/photos.json` file follows this schema:

```json
{
  "id": "unique-slug",
  "title": "Photo Title",
  "species": "Animal Species",
  "habitat": "safari|tundra|rainforest|ocean|desert|wetland",
  "location": "Location Name",
  "year": 2024,
  "src": "https://example.com/full.jpg",
  "thumb": "https://example.com/thumb.jpg",
  "caption": "Descriptive caption",
  "featured": true
}
```

### Change Design Tokens

All colors, fonts, and spacing are defined as CSS custom properties in `css/base.css` under `:root`:

```css
:root {
  --color-bg: #0B0F0D;
  --color-surface: #141A17;
  --color-surface-alt: #1B2320;
  --color-border: #2A342F;
  --color-text: #F2EDE4;
  --color-muted: #9AA39C;
  --color-accent: #D4A24C;
  --color-accent-hover: #E8B968;
  --color-danger: #C0392B;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
}
```

Change these values to rebrand the entire site. The Tailwind config in each HTML file also references these tokens.

### Update Navigation Links

Navigation is defined in `js/nav.js`. Update the `navLinks` array to change routes or labels.

### Modify the Contact Form

The form in `contact.html` uses `js/form.js` for validation and mailto submission. To change the recipient email, update the `mailto:` action in `js/form.js`.

### Add Testimonials

Testimonials are rendered in `index.html`. Edit the testimonial cards directly in the HTML or extend `js/gallery.js` to load them from JSON.

### Change Fonts

Update the Google Fonts link in the `<head>` of each HTML file and the `--font-display` / `--font-body` variables in `css/base.css`.

## Credits

- **Photographer**: Arjun Mehta
- **Design & Development**: Built with Tailwind CSS, vanilla JS, and semantic HTML
- **Fonts**: Playfair Display and Inter by Google Fonts
- **Placeholder Images**: Lorem Picsum (replace with actual photography)
- **Icons**: Inline SVG (no icon library dependency)

## License

This project is provided as-is for portfolio use. Customize freely for your own photography business.
