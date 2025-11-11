// ============================================
// VANTIXE ADVISORY - MAIN JAVASCRIPT
// Navigation, Interactions, and Animations
// ============================================

(function() {
  'use strict';

  // ============================================
  // NAVIGATION
  // ============================================

  // Sticky Navigation on Scroll
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');

      // Animate hamburger icon
      const spans = this.querySelectorAll('span');
      spans.forEach((span, index) => {
        span.style.transform = navMenu.classList.contains('active')
          ? index === 0 ? 'rotate(45deg) translateY(8px)'
          : index === 1 ? 'opacity: 0'
          : 'rotate(-45deg) translateY(-8px)'
          : 'none';
        span.style.opacity = navMenu.classList.contains('active') && index === 1 ? '0' : '1';
      });
    });

    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => {
          span.style.transform = 'none';
          span.style.opacity = '1';
        });
      });
    });
  }

  // ============================================
  // SMOOTH SCROLLING
  // ============================================

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Don't prevent default for empty # links
      if (href === '#' || href === '') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - navbarHeight;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // ACTIVE NAVIGATION HIGHLIGHTING
  // ============================================

  // Highlight active nav item based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  function highlightNavigation() {
    const scrollPosition = window.scrollY + navbarHeight + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);

  // ============================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ============================================

  // Fade in elements on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with animation class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  // Debounce function for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Optimize scroll events
  window.addEventListener('scroll', debounce(function() {
    // Additional scroll-based animations can go here
  }, 100));

  // ============================================
  // PAGE LOAD ANIMATIONS
  // ============================================

  window.addEventListener('load', function() {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');

    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = '0';
      heroContent.style.transform = 'translateY(30px)';

      setTimeout(() => {
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }, 100);
    }
  });

  // ============================================
  // EXTERNAL LINK HANDLING
  // ============================================

  // Open external links in new tab
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

})();