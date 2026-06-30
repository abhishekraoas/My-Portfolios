/* ============================================================
   Abhishek Kumar — Premium Portfolio · Interactions
   ============================================================ */
(function () {
    'use strict';

    /* ---------- Theme Toggle ---------- */
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const root = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
        } else {
            root.removeAttribute('data-theme');
            if (themeIcon) themeIcon.className = 'fas fa-moon';
        }
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const isLight = root.getAttribute('data-theme') === 'light';
            const next = isLight ? 'dark' : 'light';
            applyTheme(next);
            localStorage.setItem('theme', next);
        });
    }

    /* ---------- Mobile Nav ---------- */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    function closeMenu() {
        if (navToggle) navToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
        document.addEventListener('click', function (e) {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                closeMenu();
            }
        });
    }

    /* ---------- Navbar scroll state + progress + scroll-to-top ---------- */
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTopBtn = document.getElementById('scrollTop');

    function onScroll() {
        const y = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;

        if (navbar) navbar.classList.toggle('scrolled', y > 30);
        if (scrollProgress) scrollProgress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';
        if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', y > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- Active nav link on scroll (scrollspy) ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(function (link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });

    /* ---------- Reveal on scroll ---------- */
    const revealTargets = document.querySelectorAll(
        '.about-content, .info-card, .timeline-item, .project-card, .skill-category, .detail-card, .contact-info, .contact-form, .stats-grid'
    );
    revealTargets.forEach(function (el, i) {
        el.classList.add('reveal');
        el.style.transitionDelay = (Math.min(i % 4, 3) * 0.08) + 's';
    });

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { revealObserver.observe(el); });

    /* ---------- Animated counters ---------- */
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'), 10) || 0;
            const duration = 1500;
            const start = performance.now();

            function tick(now) {
                const p = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.floor(eased * target);
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            }
            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { counterObserver.observe(c); });

    /* ---------- Typed subtitle ---------- */
    const typedEl = document.getElementById('typed');
    if (typedEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const roles = [
            'Product Engineer',
            'Full-Stack Developer',
            'Backend Engineer · Java & Spring Boot',
            'Accessibility (a11y) Specialist'
        ];
        let roleIdx = 0, charIdx = 0, deleting = false;

        function type() {
            const current = roles[roleIdx];
            typedEl.textContent = current.substring(0, charIdx);

            if (!deleting && charIdx < current.length) {
                charIdx++;
                setTimeout(type, 70);
            } else if (deleting && charIdx > 0) {
                charIdx--;
                setTimeout(type, 35);
            } else if (!deleting && charIdx === current.length) {
                deleting = true;
                setTimeout(type, 1800);
            } else {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                setTimeout(type, 300);
            }
        }
        type();
    } else if (typedEl) {
        typedEl.textContent = 'Product Engineer & Full-Stack Developer';
    }

    /* ---------- Contact form ---------- */
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();
            const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !message) {
                showStatus('Please fill in all required fields.', 'error');
                return;
            }
            if (!emailRe.test(email)) {
                showStatus('Please enter a valid email address.', 'error');
                return;
            }

            // No backend wired up — open the user's mail client as a graceful fallback.
            const subject = encodeURIComponent(form.subject.value.trim() || 'Portfolio inquiry');
            const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
            window.location.href =
                'mailto:abhishekkumaroff.dev@gmail.com?subject=' + subject + '&body=' + body;

            showStatus("Thanks, " + name + "! Opening your email app…", 'success');
            form.reset();
        });
    }

    function showStatus(msg, type) {
        if (!status) return;
        status.textContent = msg;
        status.className = 'form-status ' + type;
        setTimeout(function () {
            status.textContent = '';
            status.className = 'form-status';
        }, 6000);
    }

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
