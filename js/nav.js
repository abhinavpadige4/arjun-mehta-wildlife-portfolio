/* js/nav.js — Navigation & Footer module for Arjun Mehta portfolio */
(function () {
  'use strict';

  const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/gallery.html', label: 'Gallery' },
    { href: '/about.html', label: 'About' },
    { href: '/contact.html', label: 'Contact' }
  ];

  const FOOTER_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/gallery.html', label: 'Gallery' },
    { href: '/about.html', label: 'About' },
    { href: '/contact.html', label: 'Contact' }
  ];

  const SOCIAL_LINKS = [
    { href: 'https://instagram.com/arjunmehta.photo', label: 'Instagram', icon: 'IG' },
    { href: 'https://twitter.com/arjunmehta', label: 'Twitter', icon: 'X' },
    { href: 'https://500px.com/arjunmehta', label: '500px', icon: '500' },
    { href: 'https://www.behance.net/arjunmehta', label: 'Behance', icon: 'Be' }
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getCurrentPath() {
    const path = window.location.pathname;
    if (path === '/' || path === '') return '/';
    return path;
  }

  function isActiveLink(link, currentPath) {
    if (link === '/') return currentPath === '/';
    return currentPath === link;
  }

  function buildNav() {
    const currentPath = getCurrentPath();
    const navLinks = NAV_LINKS.map(function (link) {
      const active = isActiveLink(link.href, currentPath);
      const activeClass = active ? ' active' : '';
      const ariaCurrent = active ? ' aria-current="page"' : '';
      return '<a href="' + link.href + '" class="nav-link' + activeClass + '"' + ariaCurrent + '>' + link.label + '</a>';
    }).join('');

    return '<nav id="main-nav" class="nav" role="navigation" aria-label="Main navigation">' +
      '<div class="nav-inner container">' +
        '<a href="/" class="nav-brand" aria-label="Arjun Mehta — Home">' +
          '<span class="nav-brand-name">Arjun Mehta</span>' +
          '<span class="nav-brand-sub">Wildlife Photography</span>' +
        '</a>' +
        '<button id="nav-toggle" class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Toggle navigation menu">' +
          '<span class="nav-toggle-bar"></span>' +
          '<span class="nav-toggle-bar"></span>' +
          '<span class="nav-toggle-bar"></span>' +
        '</button>' +
        '<div id="nav-menu" class="nav-menu" role="menu">' +
          '<div class="nav-links">' + navLinks + '</div>' +
          '<a href="/contact.html" class="btn btn-primary nav-cta">Book a Shoot</a>' +
        '</div>' +
      '</div>' +
    '</nav>';
  }

  function buildFooter() {
    const footerLinks = FOOTER_LINKS.map(function (link) {
      return '<a href="' + link.href + '" class="footer-link">' + link.label + '</a>';
    }).join('');

    const socialLinks = SOCIAL_LINKS.map(function (link) {
      return '<a href="' + link.href + '" class="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="' + link.label + '">' + link.icon + '</a>';
    }).join('');

    return '<footer id="main-footer" class="footer" role="contentinfo">' +
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-col footer-brand-col">' +
            '<div class="footer-brand">' +
              '<span class="footer-brand-name">Arjun Mehta</span>' +
              '<span class="footer-brand-sub">Wildlife Photography</span>' +
            '</div>' +
            '<p class="footer-tagline">Documenting the wild since 2012. Based in Mumbai, India. Available worldwide for editorial, commercial, and personal commissions.</p>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4 class="footer-heading">Navigate</h4>' +
            '<div class="footer-links">' + footerLinks + '</div>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4 class="footer-heading">Connect</h4>' +
            '<div class="footer-social">' + socialLinks + '</div>' +
            '<p class="footer-contact-info">hello@arjunmehta.photo</p>' +
            '<p class="footer-contact-info">+91 98765 43210</p>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4 class="footer-heading">Studio</h4>' +
            '<p class="footer-contact-info">Mumbai, Maharashtra, India</p>' +
            '<p class="footer-contact-info">Available worldwide</p>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<p class="footer-copy">&copy; ' + new Date().getFullYear() + ' Arjun Mehta. All rights reserved.</p>' +
          '<p class="footer-credits">Photography &amp; Design by Arjun Mehta</p>' +
        '</div>' +
      '</div>' +
    '</footer>';
  }

  function renderNav() {
    var navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
      navPlaceholder.innerHTML = buildNav();
    } else {
      var nav = document.createElement('div');
      nav.innerHTML = buildNav();
      document.body.insertBefore(nav.firstChild, document.body.firstChild);
    }
  }

  function renderFooter() {
    var footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = buildFooter();
    } else {
      var footer = document.createElement('div');
      footer.innerHTML = buildFooter();
      document.body.appendChild(footer.firstChild);
    }
  }

  function initMobileMenu() {
    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('nav-menu');
    var nav = document.getElementById('main-nav');
    if (!toggle || !menu) return;

    function openMenu() {
      menu.classList.add('open');
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      if (nav) nav.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      if (nav) nav.classList.remove('menu-open');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = menu.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on link click
    var navLinks = menu.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (menu.classList.contains('open') && !nav.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && menu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  function initScrollState() {
    var nav = document.getElementById('main-nav');
    if (!nav) return;

    var ticking = false;

    function updateScrollState() {
      var scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    }, { passive: true });

    // Initial check
    updateScrollState();
  }

  function initSmoothScroll() {
    if (prefersReducedMotion) return;

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var href = link.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      var navHeight = 80;
      var targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update URL hash without scrolling
      if (history.pushState) {
        history.pushState(null, '', href);
      }
    });
  }

  function init() {
    renderNav();
    renderFooter();
    initMobileMenu();
    initScrollState();
    initSmoothScroll();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
