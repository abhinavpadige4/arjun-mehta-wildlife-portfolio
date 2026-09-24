/* js/gallery.js — Photo data loading, card rendering, habitat filtering, featured-only mode */
(function () {
  'use strict';

  let cache = null;

  async function loadPhotos() {
    if (cache) return cache;
    try {
      const res = await fetch('data/photos.json');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      cache = Array.isArray(data) ? data : [];
      return cache;
    } catch (err) {
      console.error('[gallery] failed to load photos:', err);
      return [];
    }
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function habitatLabel(h) {
    return String(h || '').replace(/\b\w/g, c => c.toUpperCase());
  }

  function cardHTML(photo) {
    const id = escapeHtml(photo.id);
    const title = escapeHtml(photo.title);
    const species = escapeHtml(photo.species);
    const habitat = escapeHtml(photo.habitat);
    const location = escapeHtml(photo.location);
    const year = escapeHtml(photo.year);
    const src = escapeHtml(photo.src);
    const thumb = escapeHtml(photo.thumb);
    const caption = escapeHtml(photo.caption);
    const featuredAttr = photo.featured ? ' data-featured="true"' : '';
    const featuredBadge = photo.featured
      ? '<span class="absolute right-3 top-3 rounded-full bg-[var(--accent)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-black">Featured</span>'
      : '';

    return '<article class="photo-card group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]" data-habitat="' + habitat + '" data-id="' + id + '"' + featuredAttr + '>' +
      '<a href="' + src + '" class="block w-full" data-lightbox="' + id + '" aria-label="' + title + ' — ' + species + '">' +
        '<div class="relative aspect-[8/5] overflow-hidden bg-[var(--surface_alt)]">' +
          '<img src="' + thumb + '" alt="' + title + ' — ' + species + '" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />' +
          '<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>' +
          '<span class="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] uppercase tracking-wider text-[var(--text)] backdrop-blur-sm">' + habitatLabel(habitat) + '</span>' +
          featuredBadge +
        '</div>' +
        '<div class="p-4">' +
          '<h3 class="font-display text-lg leading-tight text-[var(--text)]">' + title + '</h3>' +
          '<p class="mt-1 text-sm text-[var(--muted)]">' + species + '</p>' +
          '<div class="mt-2 flex items-center justify-between text-xs text-[var(--muted)]">' +
            '<span>' + location + '</span>' +
            '<span>' + year + '</span>' +
          '</div>' +
          (caption ? '<p class="mt-2 text-xs leading-relaxed text-[var(--muted)]">' + caption + '</p>' : '') +
        '</div>' +
      '</a>' +
    '</article>';
  }

  function emptyStateHTML() {
    return '<div class="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">' +
      '<div class="mb-3 text-3xl" aria-hidden="true">🦓</div>' +
      '<p class="font-display text-lg text-[var(--text)]">No photos in this habitat yet</p>' +
      '<p class="mt-1 text-sm text-[var(--muted)]">Try another filter or check back soon.</p>' +
    '</div>';
  }

  function gridClass(count) {
    if (count === 0) return 'grid grid-cols-1';
    return 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3';
  }

  async function renderPhotos(container, opts) {
    if (!container) return [];
    const options = opts || {};
    const filter = options.filter || 'all';
    const featuredOnly = !!options.featuredOnly;

    const all = await loadPhotos();
    let photos = all;
    if (featuredOnly) photos = photos.filter(p => p.featured);
    if (filter && filter !== 'all') {
      photos = photos.filter(p => String(p.habitat).toLowerCase() === String(filter).toLowerCase());
    }

    container.className = gridClass(photos.length);
    if (photos.length === 0) {
      container.innerHTML = emptyStateHTML();
      return [];
    }
    container.innerHTML = photos.map(cardHTML).join('');
    return photos;
  }

  function initFilterChips(root) {
    const scope = root || document;
    const chips = scope.querySelectorAll('[data-habitat-chip]');
    if (!chips.length) return;

    const target = scope.querySelector('[data-gallery-target]') || document.querySelector('[data-gallery-target]');
    if (!target) return;

    function setActive(chip) {
      chips.forEach(c => {
        c.classList.remove('bg-[var(--accent)]', 'text-black', 'border-[var(--accent)]');
        c.classList.add('bg-[var(--surface_alt)]', 'text-[var(--text)]', 'border-[var(--border)]');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('bg-[var(--accent)]', 'text-black', 'border-[var(--accent)]');
      chip.classList.remove('bg-[var(--surface_alt)]', 'text-[var(--text)]', 'border-[var(--border)]');
      chip.setAttribute('aria-pressed', 'true');
    }

    chips.forEach(chip => {
      chip.addEventListener('click', async () => {
        const habitat = chip.getAttribute('data-habitat') || 'all';
        setActive(chip);
        await renderPhotos(target, { filter: habitat });
      });
    });

    const initial = chips[0];
    if (initial) {
      setActive(initial);
      const habitat = initial.getAttribute('data-habitat') || 'all';
      renderPhotos(target, { filter: habitat });
    }
  }

  function initFeaturedGrid() {
    const target = document.querySelector('[data-featured-target]');
    if (!target) return;
    renderPhotos(target, { featuredOnly: true });
  }

  function initLightboxTriggers() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-lightbox]');
      if (!trigger) return;
      const id = trigger.getAttribute('data-lightbox');
      if (typeof window.openLightbox === 'function') {
        window.openLightbox(id);
      }
    });
  }

  window.Gallery = {
    renderPhotos: renderPhotos,
    loadPhotos: loadPhotos,
    initFilterChips: initFilterChips,
    initFeaturedGrid: initFeaturedGrid
  };

  document.addEventListener('DOMContentLoaded', () => {
    initFeaturedGrid();
    initFilterChips(document);
    initLightboxTriggers();
  });
})();
