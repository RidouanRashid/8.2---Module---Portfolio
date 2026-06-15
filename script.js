// Portfolio — Ridouan Rashid
// Gecompileerd vanuit script.tsx

// ── Navbar scroll effect ──
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile hamburger ──
var hamburger = document.getElementById('hamburger');
var navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// ── Active nav link on scroll ──
var sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    var scrollY = window.scrollY + 100;
    sections.forEach(function (section) {
        var top    = section.offsetTop;
        var height = section.offsetHeight;
        var id     = section.getAttribute('id');
        var link   = document.querySelector('.nav-link[href="#' + id + '"]');
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ── Scroll reveal ──
var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
            setTimeout(function () {
                entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
});

// ── Skill bar animation ──
var skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            var level = entry.target.dataset.level || '0';
            entry.target.style.width = level + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-fill').forEach(function (el) {
    skillObserver.observe(el);
});
