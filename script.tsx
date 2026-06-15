// ══════════════════════════════════════════
// Portfolio — Ridouan Rashid
// TypeScript source — compile with: tsc script.tsx --outFile script.js
// ══════════════════════════════════════════

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar') as HTMLElement;
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile hamburger ──
const hamburger = document.getElementById('hamburger') as HTMLButtonElement;
const navLinks  = document.getElementById('nav-links')  as HTMLUListElement;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link: Element) => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll<HTMLElement>('section[id]');

function updateActiveLink(): void {
    const scrollY = window.scrollY + 100;
    sections.forEach((section) => {
        const top    = section.offsetTop;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id')!;
        const link   = document.querySelector<HTMLAnchorElement>(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    (entry.target as HTMLElement).classList.add('visible');
                }, i * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
    revealObserver.observe(el);
});

// ── Skill bar animation ──
const skillObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const fill  = entry.target as HTMLElement;
                const level = fill.dataset.level ?? '0';
                fill.style.width = `${level}%`;
                skillObserver.unobserve(fill);
            }
        });
    },
    { threshold: 0.3 }
);

document.querySelectorAll<HTMLElement>('.skill-fill').forEach((el) => {
    skillObserver.observe(el);
});
