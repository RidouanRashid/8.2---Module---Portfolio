<?php
/* ═══════════════════════════════════════════════════════════════════════
   athletics.php — de atletiekpagina
   Inhoud komt uit het 'athletics'-blok in content.php.
   ═══════════════════════════════════════════════════════════════════════ */

$content = require __DIR__ . '/content.php';
$site = $content['site'];
$ath  = $content['athletics'];

// Korte escape-helper (lokaal gehouden zodat deze pagina op zichzelf staat).
function e(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

// Alleen de iconen die deze pagina nodig heeft.
function icon(string $name): string {
    $icons = [
        'github'   => '<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>',
        'linkedin' => '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.51C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.74C24 .78 23.2 0 22.22 0z"/>',
        'email'    => '<path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm10 7.5L3.5 6.3V18h17V6.3L12 11.5zM3.9 5l8.1 4.9L20.1 5H3.9z"/>',
        'back'     => '<path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>',
    ];
    return $icons[$name] ?? '';
}
?>
<!DOCTYPE html>
<html lang="<?= e($site['locale']) ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Athletics — <?= e($site['name']) ?></title>
    <meta name="description" content="<?= e($site['name']) ?> — sprinter and 400 m hurdler for <?= e($ath['club']) ?>. Personal records (100m, 200m, 400m, 400m hurdles) and U18/U20 national championship results.">
    <meta name="theme-color" content="#f7f7f5">

    <meta property="og:type" content="website">
    <meta property="og:title" content="Athletics — <?= e($site['name']) ?>">
    <meta property="og:description" content="Sprinter and 400 m hurdler for <?= e($ath['club']) ?>. PRs and U18/U20 national championship results.">
    <meta property="og:image" content="<?= e($site['url'] . $site['ogImage']) ?>">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="style.css">
    <style>:root { --accent: <?= e($site['accent']) ?>; }</style>
    <script>
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('motion');
      }
    </script>
</head>
<body>
    <a href="#main" class="skip-link">Skip to content</a>
    <div class="scroll-progress" id="scroll-progress" aria-hidden="true"></div>

    <!-- ═══ NAVBAR (slim) ═══ -->
    <header class="navbar" id="navbar">
        <nav class="nav-container" aria-label="Primary">
            <a href="index.php" class="nav-logo">RR<span class="dot">.</span></a>
            <ul class="nav-links" id="nav-links">
                <li><a href="index.php" class="nav-link">Portfolio</a></li>
                <li><a href="index.php#contact" class="nav-link">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main id="main">

        <!-- ═══ HERO ═══ -->
        <section class="hero hero--sub">
            <div class="container">
                <a href="index.php" class="back-link" data-animate="hero">
                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><?= icon('back') ?></svg>
                    Back to portfolio
                </a>
                <p class="hero-greeting" data-animate="hero">
                    <span class="speed-line" aria-hidden="true"></span>Track &amp; Field
                </p>
                <h1 class="hero-name" data-animate="hero" style="display:block">Athletics<span class="accent">.</span></h1>
                <p class="hero-intro" data-animate="hero"><?= $ath['intro'] /* vertrouwde HTML uit content.php */ ?></p>
                <ul class="page-meta" data-animate="hero" aria-label="Athlete details">
                    <li><?= e($ath['club']) ?></li>
                    <li><?= e($ath['category']) ?></li>
                    <li><?= e($ath['location']) ?></li>
                </ul>
            </div>
        </section>

        <!-- ═══ PERSONAL RECORDS ═══ -->
        <section id="prs" class="section">
            <div class="container">
                <h2 class="section-title" data-animate="up">
                    <span class="section-index">01</span>Personal Records
                </h2>

                <div class="pr-grid">
                    <?php foreach ($ath['prs'] as $pr): ?>
                    <article class="pr-card" data-animate="up">
                        <p class="pr-event"><?= e($pr['event']) ?></p>
                        <p class="pr-time"><?= e($pr['time']) ?></p>
                        <?php if (!empty($pr['note'])): ?>
                        <p class="pr-note"><?= e($pr['note']) ?></p>
                        <?php endif; ?>
                        <p class="pr-meta"><?= e($pr['meta']) ?></p>
                    </article>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <!-- ═══ NATIONAL CHAMPIONSHIPS ═══ -->
        <section id="nationals" class="section">
            <div class="container">
                <h2 class="section-title" data-animate="up">
                    <span class="section-index">02</span>National Championships
                </h2>
                <p class="section-lead" data-animate="up">My U18 / U20 NK (Dutch national championship) appearances.</p>

                <ol class="timeline">
                    <?php foreach ($ath['competitions'] as $c): ?>
                    <li class="timeline-item" data-animate="up">
                        <span class="timeline-dot" aria-hidden="true"></span>
                        <p class="timeline-period"><?= e($c['period']) ?></p>
                        <h3 class="timeline-role">
                            <?= e($c['name']) ?> <span class="timeline-org">· <?= e($c['venue']) ?></span>
                        </h3>
                        <p class="timeline-desc"><?= e($c['desc']) ?></p>
                        <ul class="tag-row tag-row--mono">
                            <li class="tag tag--mono"><?= e($c['event']) ?></li>
                            <li class="tag tag--mono"><?= e($c['result']) ?></li>
                            <li class="tag"><?= e($c['time']) ?></li>
                        </ul>
                    </li>
                    <?php endforeach; ?>
                </ol>
            </div>
        </section>

        <!-- ═══ BACK / CONTACT ═══ -->
        <section class="section contact">
            <div class="container">
                <div class="contact-inner" data-animate="up">
                    <h2 class="contact-title">Same mindset, two tracks.</h2>
                    <p class="contact-text">The discipline on the track is the discipline in the code. See the engineering side too.</p>
                    <a href="index.php" class="btn btn-primary btn-lg">
                        Back to portfolio
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

    <script defer src="script.js"></script>
</body>
</html>
