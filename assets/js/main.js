/* ==========================================================================
   PORTFOLIO JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. PRELOADER PERCENTAGE COUNTER
  const preloader = document.getElementById('preloader');
  const percentageElement = document.querySelector('.preloader-percentage');
  let width = 0;
  
  const loadingInterval = setInterval(() => {
    width += Math.floor(Math.random() * 8) + 4; // Increment randomly
    if (width >= 100) {
      width = 100;
      clearInterval(loadingInterval);
      
      // Delay preloader exit slightly for visual polish
      setTimeout(() => {
        preloader.classList.add('loaded');
        // Initial GSAP animation once loader finishes
        animateHeroEntrance();
      }, 400);
    }
    percentageElement.textContent = `${width}%`;
  }, 60);

  // 2. CUSTOM POINTER CURSOR TRACKING
  const cursor = document.querySelector('.custom-cursor');
  const cursorFollower = document.querySelector('.custom-cursor-follower');

  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      // Direct placement for inner pointer
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // Smooth delayed lag tracking for outer circle
      cursorFollower.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
      }, { duration: 500, fill: 'forwards' });
    });

    // Add scale-up classes when hovering over interactive tags
    const hoverElements = document.querySelectorAll('a, button, .filter-btn, .project-card, .service-card, .cert-card, .theme-toggle-btn');
    hoverElements.forEach(elem => {
      elem.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      elem.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // 3. DARK / LIGHT MODE STATE PERSISTENCE
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  // Apply default or stored theme on startup
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let targetTheme = (theme === 'dark') ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    
    // Dynamically update particles color scheme when changing theme
    updateParticlesTheme(targetTheme);
  });

  // 4. STICKY HEADER & SCROLL PROGRESS INDICATOR
  const header = document.querySelector('.navbar-custom');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;

    // Sticky Nav Class Toggle
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll to Top visibility threshold
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Smooth scroll back to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 5. INTERSECTION OBSERVER FOR ACTIVE MENU LINKS
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link-custom');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger activation near viewport center
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        // Sync desktop nav links
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
        // Sync mobile nav links
        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // 5b. MOBILE MENU TOGGLE LOGIC
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobilePanel = document.getElementById('mobile-nav-panel');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');

  // Helper: open / close mobile menu
  function openMobileMenu() {
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobilePanel.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.classList.add('mobile-menu-open');
  }

  function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobilePanel.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.classList.remove('mobile-menu-open');
  }

  // Toggle on hamburger click
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobilePanel.classList.contains('active');
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  // Close when clicking a mobile nav link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close when clicking the backdrop overlay
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
      closeMobileMenu();
    });
  }

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobilePanel && mobilePanel.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // Auto-close mobile menu on window resize above breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992 && mobilePanel && mobilePanel.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // 6. TYPED.JS TEXT HERO LOOP
  new Typed('#typed-element', {
    strings: [
      'Associate Full Stack Developer', 
      'Junior Web Developer', 
      'MERN Stack Developer'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    cursorChar: '|'
  });

  // 7. PARTICLES.JS SCI-FI NODE GRID CONFIG
  const particlesConfig = {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#06b6d4" // Default neon cyan
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.25,
        "random": false,
        "anim": {
          "enable": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#06b6d4",
        "opacity": 0.15,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 0.4
          }
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  };

  particlesJS('particles-js', particlesConfig);

  function updateParticlesTheme(theme) {
    const particleColor = theme === 'dark' ? '#06b6d4' : '#1d4ed8';
    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom[0].pJS.particles.color.value = particleColor;
      window.pJSDom[0].pJS.particles.line_linked.color = particleColor;
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }
  }

  // 8. INTERACTIVE STATS COUNTERS RUNNING ON SCROLL VIEW
  const counters = document.querySelectorAll('.stat-number');
  
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute('data-target'));
        let count = 0;
        const duration = 2000; // Counter takes 2s to complete
        const stepTime = Math.max(Math.floor(duration / targetValue), 15);
        
        const countUp = setInterval(() => {
          count += Math.ceil(targetValue / 100);
          if (count >= targetValue) {
            target.textContent = targetValue + (target.getAttribute('data-suffix') || '');
            clearInterval(countUp);
          } else {
            target.textContent = count + (target.getAttribute('data-suffix') || '');
          }
        }, stepTime);
        
        // Stop observing once counter animation starts
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    statsObserver.observe(counter);
  });

  // 9. CIRCULAR SVG SKILL LOADER ANIMATOR
  const circleProgresses = document.querySelectorAll('.circle-chart-fill');
  
  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ring = entry.target;
        const percent = ring.getAttribute('data-percent');
        const radius = 45; // Matches SVG structure r=45
        const circumference = 2 * Math.PI * radius; // 282.7
        const offset = circumference - (percent / 100) * circumference;
        
        ring.style.strokeDashoffset = offset;
        observer.unobserve(ring);
      }
    });
  }, { threshold: 0.5 });

  circleProgresses.forEach(circle => {
    skillsObserver.observe(circle);
  });

  // 10. PROJECTS GRID CATEGORY FILTER TOGGLER
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-grid-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons and add to clicked
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  // 11. ENTRANCE GSAP ANIMATIONS
  function animateHeroEntrance() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero content entrance
    gsap.from('.hero-greet', { opacity: 0, y: -20, duration: 0.8, ease: 'power2.out' });
    gsap.from('.hero-name', { opacity: 0, y: 30, duration: 1, delay: 0.2, ease: 'power3.out' });
    gsap.from('.hero-typing', { opacity: 0, duration: 0.8, delay: 0.4 });
    gsap.from('.hero-desc', { opacity: 0, y: 20, duration: 0.8, delay: 0.5 });
    gsap.from('.hero-buttons', { opacity: 0, y: 20, duration: 0.8, delay: 0.6 });
    gsap.from('.hero-socials', { opacity: 0, duration: 0.8, delay: 0.7 });
    
    // Floating avatar entrance
    gsap.from('.hero-avatar-frame', { scale: 0.8, opacity: 0, duration: 1.2, delay: 0.4, ease: 'back.out(1.2)' });
    gsap.from('.floating-tech-card.card-1', { x: -50, opacity: 0, duration: 0.8, delay: 0.8 });
    gsap.from('.floating-tech-card.card-2', { x: 50, opacity: 0, duration: 0.8, delay: 1 });
  }

  // Initialize Animate On Scroll (AOS)
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false,
    easing: 'ease-out-cubic'
  });

  // 12. CONTACT FORM FLOATING INPUTS FRONTEND VALIDATION
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = contactForm.querySelectorAll('.form-input-custom');
      
      inputs.forEach(input => {
        const value = input.value.trim();
        const feedback = input.nextElementSibling.nextElementSibling; // Get validation label
        
        // Clear previous state
        input.classList.remove('is-invalid');
        if (feedback) feedback.style.display = 'none';

        if (input.hasAttribute('required') && !value) {
          isValid = false;
          input.classList.add('is-invalid');
          if (feedback) {
            feedback.textContent = 'This field is required.';
            feedback.style.display = 'block';
          }
        } else if (input.getAttribute('type') === 'email' && value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            isValid = false;
            input.classList.add('is-invalid');
            if (feedback) {
              feedback.textContent = 'Please enter a valid email address.';
              feedback.style.display = 'block';
            }
          }
        }
      });

      if (isValid) {
        // Mock successful form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalHtml = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Securely...';
        
        setTimeout(() => {
          submitBtn.classList.remove('btn-primary-custom');
          submitBtn.classList.add('btn-success');
          submitBtn.style.background = 'var(--success)';
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Transmitted!';
          
          contactForm.reset();
          
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.classList.add('btn-primary-custom');
            submitBtn.classList.remove('btn-success');
            submitBtn.style.background = '';
            submitBtn.innerHTML = originalHtml;
          }, 3000);
        }, 1500);
      }
    });
  }

  // 13. NEWSLETTER MOCK SUBMISSION
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input.value) {
        const btn = newsletterForm.querySelector('button');
        btn.innerHTML = '<i class="fas fa-check"></i>';
        input.value = '';
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        }, 2000);
      }
    });
  }

  // 14. 3D TILT TACTILE INTERACTION FOR SERVICE CARDS
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate inside element
      const y = e.clientY - rect.top;  // y coordinate inside element
      
      const width = rect.width;
      const height = rect.height;
      
      // Calculate rotation angles based on mouse offset (limit to max 8deg)
      const rotateY = ((x / width) - 0.5) * 16;
      const rotateX = (((y / height) - 0.5) * -16);
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

});
