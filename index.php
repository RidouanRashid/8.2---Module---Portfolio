<?php
/* ═══════════════════════════════════════════════════════════════════════
   index.php — paginasjabloon
   Alle inhoud komt uit content.php. Normaal hoef je dit bestand niet aan te
   raken; pas tekst, links en kleuren aan in content.php.
   ═══════════════════════════════════════════════════════════════════════ */

$content = require __DIR__ . '/content.php';

// Korte helper om platte tekst veilig weg te schrijven.
function e(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

// Inline SVG-iconen op type. Komt terug als string zodat we 'm zo kunnen plaatsen.
function icon(string $name): string {
    $icons = [
        'github'   => '<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>',
        'linkedin' => '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.51C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.74C24 .78 23.2 0 22.22 0z"/>',
        'email'    => '<path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm10 7.5L3.5 6.3V18h17V6.3L12 11.5zM3.9 5l8.1 4.9L20.1 5H3.9z"/>',
        'arrow'    => '<path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>',
        'arrowUp'  => '<path fill-rule="evenodd" d="M4.293 13.707a1 1 0 010-1.414l8-8a1 1 0 011.414 0l8 8a1 1 0 01-1.414 1.414L13 7.414V20a1 1 0 11-2 0V7.414l-6.293 6.293a1 1 0 01-1.414 0z" clip-rule="evenodd" transform="rotate(45 12 12)"/>',
    ];
    return $icons[$name] ?? '';
}

$site = $content['site'];
?>
<!DOCTYPE html>
<html lang="<?= e($site['locale']) ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- ── SEO ── -->
    <title><?= e($site['seoTitle']) ?></title>
    <meta name="description" content="<?= e($site['seoDesc']) ?>">
    <meta name="author" content="<?= e($site['name']) ?>">
    <meta name="theme-color" content="#f7f7f5">
    <link rel="canonical" href="<?= e($site['url']) ?>">

    <!-- ── Open Graph / Twitter ── -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?= e($site['seoTitle']) ?>">
    <meta property="og:description" content="<?= e($site['seoDesc']) ?>">
    <meta property="og:url" content="<?= e($site['url']) ?>">
    <meta property="og:image" content="<?= e($site['url'] . $site['ogImage']) ?>">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= e($site['seoTitle']) ?>">
    <meta name="twitter:description" content="<?= e($site['seoDesc']) ?>">
    <meta name="twitter:image" content="<?= e($site['url'] . $site['ogImage']) ?>">

    <!-- ── Structured data: helpt zoekmachines de pagina begrijpen ── -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "<?= e($site['name']) ?>",
      "jobTitle": "<?= e($site['role']) ?>",
      "url": "<?= e($site['url']) ?>",
      "sameAs": [<?php
        $sa = array_map(fn($s) => '"' . e($s['url']) . '"', array_filter($content['socials'], fn($s) => $s['type'] !== 'email'));
        echo implode(',', $sa);
      ?>]
    }
    </script>

    <!-- ── Lettertypes (alleen de gewichten die we gebruiken, voor snelheid) ── -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="style.css">

    <!-- Accentkleur komt uit content.php (één bron van waarheid). -->
    <style>:root { --accent: <?= e($site['accent']) ?>; }</style>

    <!--
      Animaties alleen aanzetten als de bezoeker geen "reduced motion" wil.
      Draait vóór het tekenen, zodat elementen niet eerst zichtbaar zijn en
      dan weer verdwijnen. Zonder JS (of met reduced motion) blijft alles zichtbaar.
    -->
    <script>
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('motion');
      }
    </script>
</head>
<body>
    <!-- Sla-over-link voor toetsenbord- en schermlezergebruikers -->
    <a href="#main" class="skip-link">Skip to content</a>

    <!-- Dunne voortgangsbalk die meeloopt met scrollen (subtiel). -->
    <div class="scroll-progress" id="scroll-progress" aria-hidden="true"></div>

    <!-- ═══ NAVBAR ═══ -->
    <header class="navbar" id="navbar">
        <nav class="nav-container" aria-label="Primary">
            <a href="#home" class="nav-logo">RR<span class="dot">.</span></a>

            <ul class="nav-links" id="nav-links">
                <?php foreach ($content['nav'] as $i => $item): ?>
                <li>
                    <a href="<?= e($item['href']) ?>" class="nav-link">
                        <span class="nav-index"><?= sprintf('%02d', $i + 1) ?></span><?= e($item['label']) ?>
                    </a>
                </li>
                <?php endforeach; ?>
            </ul>

            <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">
                <span></span><span></span><span></span>
            </button>
        </nav>
    </header>

    <main id="main">

        <!-- ═══ HERO ═══ -->
        <section id="home" class="hero">
            <div class="container hero-inner">
                <p class="hero-greeting" data-animate="hero">
                    <span class="speed-line" aria-hidden="true"></span><?= e($content['hero']['greeting']) ?>
                </p>

                <h1 class="hero-name">
                    <?php foreach (explode(' ', $content['hero']['name']) as $word): ?>
                        <span class="word" data-animate="hero-name"><span><?= e($word) ?></span></span>
                    <?php endforeach; ?>
                </h1>

                <h2 class="hero-tagline" data-animate="hero"><?= e($content['hero']['tagline']) ?></h2>

                <p class="hero-intro" data-animate="hero"><?= $content['hero']['intro'] /* vertrouwde HTML uit content.php */ ?></p>

                <div class="hero-actions" data-animate="hero">
                    <a href="<?= e($content['hero']['ctaHref']) ?>" class="btn btn-primary">
                        <?= e($content['hero']['ctaLabel']) ?>
                        <svg class="icon-sm" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><?= icon('arrow') ?></svg>
                    </a>
                    <ul class="hero-socials">
                        <?php foreach ($content['socials'] as $s): ?>
                        <li>
                            <a href="<?= e($s['url']) ?>" class="social-link"
                               <?= strpos($s['url'], 'http') === 0 ? 'target="_blank" rel="noopener noreferrer"' : '' ?>
                               aria-label="<?= e($s['label']) ?>">
                                <svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><?= icon($s['type']) ?></svg>
                            </a>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>

            <a href="#about" class="scroll-cue" aria-label="Scroll to about section">
                <span class="scroll-cue-text">Scroll</span>
                <span class="scroll-cue-line" aria-hidden="true"></span>
            </a>
        </section>

        <!-- ═══ ABOUT ═══ -->
        <section id="about" class="section about">
            <div class="container">
                <h2 class="section-title" data-animate="up">
                    <span class="section-index">01</span><?= e($content['about']['heading']) ?>
                </h2>

                <div class="about-grid">
                    <div class="about-text">
                        <?php foreach ($content['about']['paragraphs'] as $p): ?>
                        <p data-animate="up"><?= $p /* vertrouwde HTML */ ?></p>
                        <?php endforeach; ?>

                        <ul class="stack-list" data-animate="up" aria-label="Technologies I work with">
                            <?php foreach ($content['about']['stack'] as $tech): ?>
                            <li><?= e($tech) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>

                    <ul class="about-stats">
                        <?php foreach ($content['about']['stats'] as $stat): ?>
                        <li class="stat-card" data-animate="up">
                            <span class="stat-number"><?= e($stat['number']) ?></span>
                            <span class="stat-label"><?= e($stat['label']) ?></span>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>
        </section>

        <!-- ═══ SKILLS ═══ -->
        <section id="skills" class="section skills">
            <div class="container">
                <h2 class="section-title" data-animate="up">
                    <span class="section-index">02</span><?= e($content['skills']['heading']) ?>
                </h2>
                <p class="section-lead" data-animate="up"><?= e($content['skills']['intro']) ?></p>

                <ul class="skills-grid">
                    <?php foreach ($content['skills']['items'] as $skill): $lvl = max(0, min(100, (int)$skill['level'])); ?>
                    <li class="skill" data-animate="up">
                        <div class="skill-head">
                            <span class="skill-name"><?= e($skill['name']) ?></span>
                            <span class="skill-pct"><?= $lvl ?>%</span>
                        </div>
                        <div class="skill-track" role="progressbar" aria-label="<?= e($skill['name']) ?> proficiency"
                             aria-valuenow="<?= $lvl ?>" aria-valuemin="0" aria-valuemax="100">
                            <span class="skill-fill" data-level="<?= $lvl ?>"></span>
                        </div>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </section>

        <!-- ═══ EXPERIENCE ═══ -->
        <section id="experience" class="section experience">
            <div class="container">
                <h2 class="section-title" data-animate="up">
                    <span class="section-index">03</span><?= e($content['experience']['heading']) ?>
                </h2>

                <ol class="timeline">
                    <?php foreach ($content['experience']['items'] as $job): ?>
                    <li class="timeline-item" data-animate="up">
                        <span class="timeline-dot" aria-hidden="true"></span>
                        <p class="timeline-period"><?= e($job['period']) ?></p>
                        <h3 class="timeline-role">
                            <?= e($job['role']) ?> <span class="timeline-org">· <?= e($job['org']) ?></span>
                        </h3>
                        <p class="timeline-desc"><?= e($job['desc']) ?></p>
                        <ul class="tag-row">
                            <?php foreach ($job['tags'] as $t): ?>
                            <li class="tag"><?= e($t) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </li>
                    <?php endforeach; ?>
                </ol>
            </div>
        </section>

        <!-- ═══ WORK / PROJECTS ═══ -->
        <section id="work" class="section work">
            <div class="container">
                <h2 class="section-title" data-animate="up">
                    <span class="section-index">04</span><?= e($content['work']['heading']) ?>
                </h2>

                <div class="work-grid">
                    <?php foreach ($content['work']['items'] as $proj): ?>
                    <article class="project-card" data-animate="up">
                        <div class="project-body">
                            <div class="project-top">
                                <svg class="project-folder icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>
                                </svg>
                                <div class="project-links">
                                    <?php if (!empty($proj['live'])): ?>
                                    <a href="<?= e($proj['live']) ?>" target="_blank" rel="noopener noreferrer" aria-label="<?= e($proj['title']) ?> — live site">
                                        <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 3h7v7M21 3l-9 9M5 5h5v2H7v10h10v-3h2v5H5z"/></svg>
                                    </a>
                                    <?php endif; ?>
                                    <a href="<?= e($proj['repo']) ?>" target="_blank" rel="noopener noreferrer" aria-label="<?= e($proj['title']) ?> — source code">
                                        <svg class="icon-sm" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><?= icon('github') ?></svg>
                                    </a>
                                </div>
                            </div>
                            <h3 class="project-title">
                                <a href="<?= e($proj['repo']) ?>" target="_blank" rel="noopener noreferrer"><?= e($proj['title']) ?></a>
                            </h3>
                            <p class="project-desc"><?= e($proj['desc']) ?></p>
                        </div>
                        <ul class="tag-row tag-row--mono">
                            <?php foreach ($proj['tech'] as $tech): ?>
                            <li class="tag tag--mono"><?= e($tech) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </article>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <!-- ═══ CONTACT ═══ -->
        <section id="contact" class="section contact">
            <div class="container">
                <div class="contact-inner" data-animate="up">
                    <span class="section-index section-index--center">05</span>
                    <h2 class="contact-title"><?= e($content['contact']['heading']) ?></h2>
                    <p class="contact-text"><?= e($content['contact']['text']) ?></p>
                    <a href="mailto:<?= e($content['contact']['email']) ?>" class="btn btn-primary btn-lg">
                        <?= e($content['contact']['ctaLabel']) ?>
                        <svg class="icon-sm" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><?= icon('arrow') ?></svg>
                    </a>
                </div>
            </div>
        </section>
    </main>

    <!-- ═══ FOOTER ═══ -->
    <footer class="footer">
        <ul class="footer-socials">
            <?php foreach ($content['socials'] as $s): ?>
            <li>
                <a href="<?= e($s['url']) ?>" class="social-link"
                   <?= strpos($s['url'], 'http') === 0 ? 'target="_blank" rel="noopener noreferrer"' : '' ?>
                   aria-label="<?= e($s['label']) ?>">
                    <svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><?= icon($s['type']) ?></svg>
                </a>
            </li>
            <?php endforeach; ?>
        </ul>
        <p class="footer-note">
            Designed &amp; built by <?= e($site['name']) ?> · <?= date('Y') ?>
        </p>
    </footer>

    <!-- Alle beweging zijn gewone CSS-transitions, aangestuurd door dit kleine script. -->
    <script defer src="script.js"></script>
</body>
</html>
