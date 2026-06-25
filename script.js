// Portfolio — Ridouan Rashid
// Alles met de hand, geen libraries. Dit script zet alleen classes aan/uit;
// de animaties zelf staan in style.css. Zonder JS of met "reduced motion"
// blijft de pagina gewoon zichtbaar en statisch.
// (Gecompileerd vanuit script.tsx)

(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Skill-balken hun eindbreedte meegeven (--lvl) ──
    document.querySelectorAll('.skill-fill').forEach(function (fill) {
        var level = fill.getAttribute('data-level');
        if (level) fill.style.setProperty('--lvl', level + '%');
    });

    // ── Navbar-achtergrond + voortgangsbalk ──
    var navbar   = document.getElementById('navbar');
    var progress = document.getElementById('scroll-progress');

    function onScroll() {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
        if (progress) {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            var pct = max > 0 ? window.scrollY / max : 0;
            progress.style.transform = 'scaleX(' + pct + ')';
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── Mobiel menu ──
    var hamburger = document.getElementById('hamburger');
    var navLinks  = document.getElementById('nav-links');

    function closeMenu() {
        if (!hamburger || !navLinks) return;
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            var open = hamburger.classList.toggle('open');
            navLinks.classList.toggle('open', open);
            hamburger.setAttribute('aria-expanded', String(open));
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        // Sluiten met Escape, handig voor toetsenbordgebruik.
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMenu();
        });
    }

    // ── Actieve nav-link op basis van de sectie in beeld ──
    var sections = document.querySelectorAll('main section[id]');

    function updateActiveLink() {
        var pos = window.scrollY + window.innerHeight * 0.35;
        sections.forEach(function (section) {
            var link = document.querySelector('.nav-link[href="#' + section.id + '"]');
            if (!link) return;
            var active = pos >= section.offsetTop && pos < section.offsetTop + section.offsetHeight;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
        });
    }
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // ── Animaties ──
    // Wil de bezoeker minder beweging? Dan stoppen we hier: de CSS laat alles
    // gewoon zien, dus er valt niets te onthullen.
    if (reduceMotion) return;

    // Telt een getal als "15+" of "137" omhoog vanaf 0 (slaat ∞ e.d. over).
    function countUp(el) {
        var match = el.textContent.trim().match(/^(\d+)(\D*)$/);
        if (!match) return;
        var target = parseInt(match[1], 10);
        var suffix = match[2] || '';
        var start  = null;

        function step(now) {
            if (start === null) start = now;
            var p     = Math.min((now - start) / 1100, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    // ── Elementen onthullen zodra ze in beeld scrollen ──
    var revealEls = document.querySelectorAll('[data-animate]');

    if (!('IntersectionObserver' in window)) {
        revealEls.forEach(function (el) { el.classList.add('in'); });   // oude browser: gewoon alles tonen
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        var delay = 0;
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            // Items die samen verschijnen net na elkaar laten "wegspurten".
            entry.target.style.transitionDelay = (delay * 0.08) + 's';
            entry.target.classList.add('in');
            delay++;

            var stat = entry.target.querySelector('.stat-number');
            if (stat) countUp(stat);

            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    revealEls.forEach(function (el) {
        // Hero staat bovenaan: die meteen tonen bij het laden.
        if (el.getAttribute('data-animate') === 'hero' || el.classList.contains('word')) {
            el.classList.add('in');
        } else {
            observer.observe(el);
        }
    });
})();
