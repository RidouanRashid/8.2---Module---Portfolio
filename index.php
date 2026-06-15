<?php
// Portfolio — Ridouan Rashid
$skills = [
    ['name' => 'PHP',        'level' => 75, 'icon' => 'php'],
    ['name' => 'HTML',       'level' => 90, 'icon' => 'html'],
    ['name' => 'CSS',        'level' => 80, 'icon' => 'css'],
    ['name' => 'JavaScript', 'level' => 70, 'icon' => 'js'],
    ['name' => 'Vue.js',     'level' => 60, 'icon' => 'vue'],
    ['name' => 'TypeScript', 'level' => 55, 'icon' => 'ts'],
    ['name' => 'WordPress',  'level' => 65, 'icon' => 'wp'],
    ['name' => 'Git',        'level' => 72, 'icon' => 'git'],
];

$projects = [
    [
        'title' => 'U-Festival App',
        'desc'  => 'Een festival webapp gebouwd met Vue.js voor module 8.1. Gebruikers kunnen artiesten en evenementen bekijken.',
        'tech'  => ['Vue.js', 'JavaScript', 'CSS'],
        'url'   => 'https://github.com/RidouanRashid/8.1---Module---U-Festival-App---2026',
    ],
    [
        'title' => 'Remote Controller',
        'desc'  => 'Een JavaScript applicatie die dient als remote controller interface, gebouwd voor module 7.2.',
        'tech'  => ['JavaScript', 'HTML', 'CSS'],
        'url'   => 'https://github.com/RidouanRashid/7.2---Module---Remote-controller',
    ],
    [
        'title' => 'Kiosk Project',
        'desc'  => 'Een PHP-kiosksysteem gebouwd voor module 7.1, samen met Han &amp; Tianzi.',
        'tech'  => ['PHP', 'HTML', 'CSS'],
        'url'   => 'https://github.com/RidouanRashid/7.1-Module-Kiosk-2026-Han-Tianzi',
    ],
    [
        'title' => 'Retro Game',
        'desc'  => 'Een JavaScript retro game gemaakt voor module 6.2, samen met Jelle Romijn.',
        'tech'  => ['JavaScript', 'HTML5 Canvas'],
        'url'   => 'https://github.com/RidouanRashid/module-6-2-duo-javascript-retrogame',
    ],
    [
        'title' => 'Archivers',
        'desc'  => 'Een PHP webapplicatie voor Het Utrechts Archief, gebouwd voor module 6.1.',
        'tech'  => ['PHP', 'HTML', 'CSS'],
        'url'   => 'https://github.com/RidouanRashid/Archivers',
    ],
    [
        'title' => 'ScreenStream',
        'desc'  => 'Een streaming-interface voor de AnnexBios groepsopdracht, met focus op UI/UX.',
        'tech'  => ['HTML', 'CSS', 'JavaScript'],
        'url'   => 'https://github.com/RidouanRashid/ScreenStream',
    ],
];
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ridouan Rashid | Portfolio</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>

    <!-- ═══ NAVBAR ═══ -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="#home" class="nav-logo">RR<span class="dot">.</span></a>
            <ul class="nav-links" id="nav-links">
                <li><a href="#about"    class="nav-link">Over mij</a></li>
                <li><a href="#skills"   class="nav-link">Skills</a></li>
                <li><a href="#projects" class="nav-link">Projecten</a></li>
                <li><a href="#contact"  class="nav-link btn-nav">Contact</a></li>
            </ul>
            <button class="hamburger" id="hamburger" aria-label="Menu openen">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <!-- ═══ HERO ═══ -->
    <section id="home" class="hero">
        <div class="hero-content reveal">
            <p class="hero-greeting">Hoi, ik ben 👋</p>
            <h1 class="hero-name">Ridouan<br><span class="accent">Rashid</span></h1>
            <h2 class="hero-title">Full‑Stack Developer in opleiding</h2>
            <p class="hero-desc">
                Ik bouw moderne webapplicaties met <strong>PHP</strong>, <strong>JavaScript</strong> en <strong>Vue.js</strong>.<br>
                Altijd op zoek naar nieuwe uitdagingen en mooie code.
            </p>
            <div class="hero-buttons">
                <a href="#projects" class="btn btn-primary">Bekijk mijn werk</a>
                <a href="https://github.com/RidouanRashid" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                    <svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub
                </a>
            </div>
        </div>
        <div class="hero-visual reveal">
            <div class="avatar-ring">
                <img
                    src="https://avatars.githubusercontent.com/u/180383858?v=4"
                    alt="Foto van Ridouan Rashid"
                    class="avatar"
                >
            </div>
            <div class="floating-badge badge-1">PHP</div>
            <div class="floating-badge badge-2">Vue.js</div>
            <div class="floating-badge badge-3">JavaScript</div>
        </div>
    </section>

    <!-- ═══ ABOUT ═══ -->
    <section id="about" class="about section">
        <div class="container">
            <h2 class="section-title reveal">Over mij</h2>
            <div class="about-grid">
                <div class="about-text reveal">
                    <p>
                        Ik ben <strong>Ridouan Rashid</strong>, een enthousiaste ICT-student met een passie voor
                        webdevelopment. Ik werk graag aan projecten waarbij ik zowel de front-end als de back-end
                        mag bouwen.
                    </p>
                    <p>
                        Vanaf eenvoudige websites tot complexe PHP-applicaties en Vue.js apps — ik ben altijd
                        bezig met leren en groeien als developer.
                    </p>
                </div>
                <div class="about-stats reveal">
                    <div class="stat-card">
                        <span class="stat-number">15<span class="accent">+</span></span>
                        <span class="stat-label">Repositories</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">137</span>
                        <span class="stat-label">Contributions</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">8<span class="accent">+</span></span>
                        <span class="stat-label">Technologieën</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ SKILLS ═══ -->
    <section id="skills" class="skills section">
        <div class="container">
            <h2 class="section-title reveal">Skills</h2>
            <div class="skills-grid">
                <?php foreach ($skills as $skill): ?>
                <div class="skill-card reveal">
                    <div class="skill-header">
                        <span class="skill-name"><?= htmlspecialchars($skill['name']) ?></span>
                        <span class="skill-percent"><?= (int)$skill['level'] ?>%</span>
                    </div>
                    <div class="skill-bar" role="progressbar" aria-valuenow="<?= (int)$skill['level'] ?>" aria-valuemin="0" aria-valuemax="100">
                        <div class="skill-fill" data-level="<?= (int)$skill['level'] ?>"></div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- ═══ PROJECTS ═══ -->
    <section id="projects" class="projects section">
        <div class="container">
            <h2 class="section-title reveal">Projecten</h2>
            <div class="projects-grid">
                <?php foreach ($projects as $project): ?>
                <article class="project-card reveal">
                    <div class="project-body">
                        <h3 class="project-title"><?= htmlspecialchars($project['title']) ?></h3>
                        <p class="project-desc"><?= $project['desc'] ?></p>
                        <div class="project-tech">
                            <?php foreach ($project['tech'] as $tech): ?>
                            <span class="tech-tag"><?= htmlspecialchars($tech) ?></span>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <div class="project-footer">
                        <a href="<?= htmlspecialchars($project['url']) ?>" target="_blank" rel="noopener noreferrer" class="project-link">
                            Bekijk op GitHub
                            <svg class="icon-sm" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </a>
                    </div>
                </article>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- ═══ CONTACT ═══ -->
    <section id="contact" class="contact section">
        <div class="container">
            <div class="contact-box reveal">
                <h2 class="section-title">Neem contact op</h2>
                <p>Heb je een vraag, wil je samenwerken, of gewoon hallo zeggen? Vind me op GitHub!</p>
                <a href="https://github.com/RidouanRashid" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                    <svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    Bekijk mijn GitHub
                </a>
            </div>
        </div>
    </section>

    <!-- ═══ FOOTER ═══ -->
    <footer class="footer">
        <p>&copy; <?= date('Y') ?> Ridouan Rashid &mdash; Gebouwd met PHP &amp; liefde voor code</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
