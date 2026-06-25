// Portfolio — Ridouan Rashid
// TypeScript-bron. Compileren met:  tsc script.tsx --outFile script.js --target es5
// (De browser laadt script.js, niet dit bestand. Houd ze gelijk.)
//
// Alles met de hand, geen libraries. Dit script zet alleen classes aan/uit;
// de animaties zelf staan in style.css. Zonder JS of met "reduced motion"
// blijft de pagina gewoon zichtbaar en statisch.

(function (): void {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Skill-balken hun eindbreedte meegeven (--lvl) ──
    document.querySelectorAll<HTMLElement>('.skill-fill').forEach(function (fill) {
        const level = fill.getAttribute('data-level');
        if (level) fill.style.setProperty('--lvl', level + '%');
    });

    // ── Navbar-achtergrond + voortgangsbalk ──
    const navbar   = document.getElementById('navbar');
    const progress = document.getElementById('scroll-progress');

    function onScroll(): void {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
        if (progress) {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const pct = max > 0 ? window.scrollY / max : 0;
            progress.style.transform = 'scaleX(' + pct + ')';
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── Mobiel menu ──
    const hamburger = document.getElementById('hamburger') as HTMLButtonElement | null;
    const navLinks  = document.getElementById('nav-links');

    function closeMenu(): void {
        if (!hamburger || !navLinks) return;
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            const open = hamburger.classList.toggle('open');
            navLinks.classList.toggle('open', open);
            hamburger.setAttribute('aria-expanded', String(open));
        });

        navLinks.querySelectorAll('a').forEach(function (link: Element) {
            link.addEventListener('click', closeMenu);
        });

        // Sluiten met Escape, handig voor toetsenbordgebruik.
        document.addEventListener('keydown', function (e: KeyboardEvent) {
            if (e.key === 'Escape') closeMenu();
        });
    }

    // ── Actieve nav-link op basis van de sectie in beeld ──
    const sections = document.querySelectorAll<HTMLElement>('main section[id]');

    function updateActiveLink(): void {
        const pos = window.scrollY + window.innerHeight * 0.35;
        sections.forEach(function (section) {
            const link = document.querySelector<HTMLAnchorElement>('.nav-link[href="#' + section.id + '"]');
            if (!link) return;
            const active = pos >= section.offsetTop && pos < section.offsetTop + section.offsetHeight;
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
    function countUp(el: HTMLElement): void {
        const match = (el.textContent || '').trim().match(/^(\d+)(\D*)$/);
        if (!match) return;
        const target = parseInt(match[1], 10);
        const suffix = match[2] || '';
        let start: number | null = null;

        function step(now: number): void {
            if (start === null) start = now;
            const p     = Math.min((now - start) / 1100, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    // ── Elementen onthullen zodra ze in beeld scrollen ──
    const revealEls = document.querySelectorAll<HTMLElement>('[data-animate]');

    if (!('IntersectionObserver' in window)) {
        revealEls.forEach(function (el) { el.classList.add('in'); });   // oude browser: gewoon alles tonen
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        let delay = 0;
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            // Items die samen verschijnen net na elkaar laten "wegspurten".
            el.style.transitionDelay = (delay * 0.08) + 's';
            el.classList.add('in');
            delay++;

            const stat = el.querySelector<HTMLElement>('.stat-number');
            if (stat) countUp(stat);

            observer.unobserve(el);
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
