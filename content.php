<?php
/* ═══════════════════════════════════════════════════════════════════════
   content.php — HIER PAS JE ALLES AAN
   ───────────────────────────────────────────────────────────────────────
   Dit is het enige bestand dat je hoeft aan te raken om de tekst, links,
   projecten en kleuren van je portfolio bij te werken. index.php en
   athletics.php lezen deze array uit en tonen 'm.

   Tips:
   • Accentkleur aanpassen in 'site' => 'accent'.
   • Projecten of ervaring toevoegen/weghalen door array-items erbij te
     zetten of te wissen.
   ═══════════════════════════════════════════════════════════════════════ */

return [

    /* ── Algemene site- / SEO-instellingen ──────────────────────────── */
    'site' => [
        'name'        => 'Ridouan Rashid',
        'role'        => 'Software Developer',
        // De enige opvallende accentkleur, op de hele site gebruikt.
        // Probeer '#2347ff' (kobaltblauw), '#e8442a' (vermiljoen) of '#16a34a' (groen).
        'accent'      => '#2347ff',
        'locale'      => 'en',
        // Gebruikt voor <title>, meta-omschrijving en Open Graph-tags.
        'seoTitle'    => 'Ridouan Rashid — Software Developer',
        'seoDesc'     => 'Software developer and sprinter. I build fast, iterate relentlessly and chase marginal gains — in code and on the track.',
        // Volledige URL van de live site (voor Open Graph). Pas aan bij publiceren.
        'url'         => 'http://localhost/8.2%20-%20Module%20-%20Portfolio/',
        'ogImage'     => 'og-image.svg',
    ],

    /* ── Navigatie (ankers moeten matchen met de sectie-id's hieronder) ── */
    'nav' => [
        ['label' => 'About',      'href' => '#about'],
        ['label' => 'Skills',     'href' => '#skills'],
        ['label' => 'Experience', 'href' => '#experience'],
        ['label' => 'Work',       'href' => '#work'],
        ['label' => 'Contact',    'href' => '#contact'],
        ['label' => 'Athletics',  'href' => 'athletics.php'],
    ],

    /* ── Hero ───────────────────────────────────────────────────────── */
    'hero' => [
        'greeting' => 'Hi, my name is',
        'name'     => 'Ridouan Rashid',
        // Korte, pittige tagline die hint naar de developer/atleet-dualiteit.
        'tagline'  => 'I build fast — in both senses.',
        // 1–2 zinnen. <strong> wordt in de accentkleur weergegeven.
        'intro'    => 'I\'m a <strong>software developer</strong> and a competitive <strong>sprinter</strong>. I bring the same discipline to both: relentless iteration, clean execution and a hunt for marginal gains.',
        'ctaLabel' => 'See my work',
        'ctaHref'  => '#work',
    ],

    /* ── Over mij ───────────────────────────────────────────────────── */
    'about' => [
        'heading'    => 'About',
        // Elke string is een eigen alinea. <strong> wordt benadrukt weergegeven.
        'paragraphs' => [
            'I started building for the web because I liked the feeling of an idea becoming something real and fast. Today I work across the stack — <strong>PHP</strong>, <strong>JavaScript</strong> and <strong>Vue.js</strong> — and I care about code that is readable, tested and quick.',
            'That mindset comes from the track. Sprinting is a sport of <strong>marginal gains</strong>: tiny refinements, repeated thousands of times, compound into real speed. I write software the same way — measure, iterate, and shave milliseconds wherever they hide.',
        ],
        // Kleine statistiekkaartjes. Houd ze eerlijk en makkelijk bij te werken.
        'stats' => [
            ['number' => '15+', 'label' => 'Repositories'],
            ['number' => '8+',  'label' => 'Technologies'],
            ['number' => '∞',   'label' => 'Marginal gains'],
        ],
        // Een compacte, scanbare techlijst onder het verhaal.
        'stack' => ['PHP', 'JavaScript', 'TypeScript', 'Vue.js', 'HTML', 'CSS', 'WordPress', 'Git'],
    ],

    /* ── Skills ("wegspurtende" balken) ─────────────────────────────── */
    /* level = 0–100. De balken spurten bij het scrollen vol, als een sprint. */
    'skills' => [
        'heading' => 'Skills',
        'intro'   => 'The tools I reach for most — and roughly how confident I am with each.',
        'items'   => [
            ['name' => 'HTML',       'level' => 90],
            ['name' => 'CSS',        'level' => 80],
            ['name' => 'PHP',        'level' => 75],
            ['name' => 'Git',        'level' => 72],
            ['name' => 'JavaScript', 'level' => 70],
            ['name' => 'WordPress',  'level' => 65],
            ['name' => 'Vue.js',     'level' => 60],
            ['name' => 'TypeScript', 'level' => 55],
        ],
    ],

    /* ── Ervaring (tijdlijn) ────────────────────────────────────────── */
    /* Tijdlijn op basis van je echte GitHub-activiteit (feb 2025 – jun 2026).
       Nieuwste eerst. Pas tekst/organisatie aan naar smaak. */
    'experience' => [
        'heading' => 'Experience',
        'items'   => [
            [
                'period' => 'Mar – Jun 2026',
                'role'   => 'Modules 7 & 8 — Full-Stack Web Development',
                'org'    => 'ICT / Software Development', // ← je school of opleiding
                'desc'   => 'Shipped a team-built PHP kiosk system, a JavaScript remote-controller interface, the U-Festival app in Vue.js, and this motion-driven portfolio — moving into reactive, component-driven front-ends.',
                'tags'   => ['Vue.js', 'PHP', 'JavaScript', 'TypeScript'],
            ],
            [
                'period' => 'Dec 2025 – Jan 2026',
                'role'   => 'Module 6 — Web Applications & Games',
                'org'    => 'ICT / Software Development',
                'desc'   => 'Built Archivers, a PHP web application for Het Utrechts Archief, and a canvas-based retro game as a duo — owning back-end logic and game mechanics from scratch.',
                'tags'   => ['PHP', 'JavaScript', 'HTML5 Canvas'],
            ],
            [
                'period' => '2025',
                'role'   => 'Foundations & Group Projects',
                'org'    => 'ICT / Software Development',
                'desc'   => 'Earlier coursework and team deliveries — the ScreenStream streaming interface, a WordPress build, and group projects — establishing solid HTML, CSS, JavaScript and PHP fundamentals.',
                'tags'   => ['WordPress', 'PHP', 'HTML', 'CSS'],
            ],
            [
                'period' => 'Ongoing',
                'role'   => 'Competitive Sprinter',
                'org'    => 'Athletics',
                'desc'   => 'Training and competing in the sprints — the discipline, structure and obsession with marginal gains that shape how I approach engineering.',
                'tags'   => ['Discipline', 'Iteration', 'Speed'],
            ],
        ],
    ],

    /* ── Projecten / Werk ───────────────────────────────────────────── */
    /* 'live' is optioneel — laat '' staan om de live-link te verbergen.  */
    'work' => [
        'heading' => 'Selected Work',
        'items'   => [
            [
                'title' => 'U-Festival App',
                'desc'  => 'A festival web app built with Vue.js where users browse artists and events. Component-driven and reactive.',
                'tech'  => ['Vue.js', 'JavaScript', 'CSS'],
                'repo'  => 'https://github.com/RidouanRashid/8.1---Module---U-Festival-App---2026',
                'live'  => '',
            ],
            [
                'title' => 'Archivers',
                'desc'  => 'A PHP web application built for Het Utrechts Archief — server-rendered, data-driven and content-focused.',
                'tech'  => ['PHP', 'HTML', 'CSS'],
                'repo'  => 'https://github.com/RidouanRashid/Archivers',
                'live'  => '',
            ],
            [
                'title' => 'Kiosk Project',
                'desc'  => 'A PHP kiosk system built as a team — handling structured data and a clean, touch-friendly interface.',
                'tech'  => ['PHP', 'HTML', 'CSS'],
                'repo'  => 'https://github.com/RidouanRashid/7.1-Module-Kiosk-2026-Han-Tianzi',
                'live'  => '',
            ],
            [
                'title' => 'Remote Controller',
                'desc'  => 'A JavaScript remote-controller interface focused on responsive, real-time interaction.',
                'tech'  => ['JavaScript', 'HTML', 'CSS'],
                'repo'  => 'https://github.com/RidouanRashid/7.2---Module---Remote-controller',
                'live'  => '',
            ],
            [
                'title' => 'Retro Game',
                'desc'  => 'A canvas-based retro game built as a duo project — game loop, collision and input handling from scratch.',
                'tech'  => ['JavaScript', 'HTML5 Canvas'],
                'repo'  => 'https://github.com/RidouanRashid/module-6-2-duo-javascript-retrogame',
                'live'  => '',
            ],
            [
                'title' => 'ScreenStream',
                'desc'  => 'A streaming interface for a group assignment, with a strong focus on UI/UX and front-end polish.',
                'tech'  => ['HTML', 'CSS', 'JavaScript'],
                'repo'  => 'https://github.com/RidouanRashid/ScreenStream',
                'live'  => '',
            ],
        ],
    ],

    /* ── Atletiek (de pagina athletics.php) ─────────────────────────────
       Echte data van atletiek.nu / AAV'36. Tijden in mm:ss of seconden.
       'note' toont wind (+0.7) of "indoor"; laat '' staan om 'm te verbergen. */
    'athletics' => [
        'club'     => "AAV'36",
        'category' => 'Men U20',
        'location' => 'Alphen aan den Rijn, Netherlands',
        'intro'    => 'Athletics is the other half of how I think. I sprint and run the 400 m hurdles for <strong>AAV\'36</strong> — and it runs on the same loop as my engineering: measure, refine, repeat, and chase the marginal gains that eventually add up to whole seconds.',

        // Persoonlijke records — alleen de vier onderdelen die je wilde.
        'prs' => [
            ['event' => '100 m',          'time' => '11.79', 'note' => '+0.7',   'meta' => 'Den Haag · Jul 2025'],
            ['event' => '200 m',          'time' => '24.06', 'note' => 'indoor', 'meta' => 'Apeldoorn · Dec 2025'],
            ['event' => '400 m',          'time' => '52.00', 'note' => '',       'meta' => 'Alphen a/d Rijn · Jun 2026'],
            ['event' => '400 m hurdles',  'time' => '56.12', 'note' => '',       'meta' => 'Hilversum · Jun 2025'],
        ],

        // NK's bij U18 / U20 en hoe het ging.
        'competitions' => [
            [
                'period' => '2026',
                'name'   => 'NK Indoor U20',
                'venue'  => 'Apeldoorn',
                'event'  => '400 m',
                'result' => '8th',
                'time'   => '52.51',
                'desc'   => 'Reached the national U20 indoor final over 400 m and finished 8th in a fast race.',
            ],
            [
                'period' => '2025',
                'name'   => 'NK U18',
                'venue'  => 'Hilversum',
                'event'  => '400 m hurdles',
                'result' => 'PR 56.12',
                'time'   => '56.12',
                'desc'   => 'Set a 400 m hurdles personal record of 56.12 in the heats at the national U18 championships.',
            ],
        ],
    ],

    /* ── Contact ────────────────────────────────────────────────────── */
    'contact' => [
        'heading' => 'Get in touch',
        'text'    => 'Looking for a developer who treats speed as a feature? My inbox is open — for opportunities, collaboration, or just to say hi.',
        'email'   => 'ridouanrashid@gmail.com',
        'ctaLabel'=> 'Say hello',
    ],

    /* ── Sociale links (in hero, contact en footer) ─────────────────── */
    /* type bepaalt welk icoon getoond wordt: github | linkedin | email  */
    'socials' => [
        ['type' => 'github',   'label' => 'GitHub',   'url' => 'https://github.com/RidouanRashid'],
        ['type' => 'linkedin', 'label' => 'LinkedIn', 'url' => 'https://www.linkedin.com/'], // ← vul je LinkedIn-URL in
        ['type' => 'email',    'label' => 'Email',    'url' => 'mailto:ridouanrashid@gmail.com'],
    ],
];
