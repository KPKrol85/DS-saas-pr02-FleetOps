function getLandingTheme() {
  const { preferences } = FleetStore.state;
  const theme = preferences.theme || "light";
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
}

function getLandingThemeAsset(theme = getLandingTheme()) {
  return (light, dark) => (theme === "dark" ? dark : light);
}

function renderLandingHeader(themeAsset = getLandingThemeAsset()) {
  const menuToggleIcon = `
            <span class="menu-toggle-icon" aria-hidden="true">
              <span class="menu-toggle-icon__line menu-toggle-icon__line--top"></span>
              <span class="menu-toggle-icon__line menu-toggle-icon__line--middle"></span>
              <span class="menu-toggle-icon__line menu-toggle-icon__line--bottom"></span>
            </span>`;

  return `
      <header class="container site-header" role="banner">
        <a class="site-header__brand logo" href="/" aria-label="FleetOps — Strona główna" data-scroll-top="home">

          <img class="site-header__logo logo__icon" src="${themeAsset("assets/logos/logo-black.svg", "assets/logos/logo-white.svg")}" data-theme-src-light="assets/logos/logo-black.svg" data-theme-src-dark="assets/logos/logo-white.svg" alt="FleetOps logo" width="44" height="44" />

          <span>FleetOps</span>
        </a>
        <nav class="site-header__nav" aria-label="Nawigacja główna">
          <button class="button button--ghost site-header__menu-button" id="navToggle" type="button" aria-expanded="false" aria-controls="mobileNav" aria-label="Przełącz nawigację">
${menuToggleIcon}
          </button>
          <div class="site-header__backdrop" data-nav-close></div>
          <div class="site-header__drawer" id="mobileNav" role="dialog" aria-modal="true" aria-label="Nawigacja mobilna" aria-hidden="true">
            <ul class="site-header__links">
              <li class="site-header__item"><a class="site-header__link" href="/product/">Produkt</a></li>
              <li class="site-header__item"><a class="site-header__link" href="/features/">Funkcje</a></li>
              <li class="site-header__item"><a class="site-header__link" href="/pricing/">Cennik</a></li>
              <li class="site-header__item"><a class="site-header__link" href="/about/">O nas</a></li>
              <li class="site-header__item"><a class="site-header__link" href="/contact/">Kontakt</a></li>
              <li class="site-header__item dropdown">
                <button class="site-header__link" id="resourcesToggle" type="button" aria-expanded="false" aria-controls="resourcesMenu">
                  Zasoby
                </button>
                <ul class="dropdown-menu" id="resourcesMenu" aria-label="Zasoby">
                  <li><a class="dropdown-item" href="/privacy/">Polityka prywatności</a></li>
                  <li><a class="dropdown-item" href="/terms/">Regulamin</a></li>
                  <li><a class="dropdown-item" href="/cookies/">Polityka cookies</a></li>
                </ul>
              </li>
            </ul>
            <div class="site-header__actions">
              <a class="button button--ghost site-header__action" href="/#/login">Zaloguj się</a>
              <button class="button button--ghost theme-toggle site-header__theme-toggle" id="themeToggleLanding" type="button" aria-label="Przełącz motyw">
                <svg class="theme-toggle__icon theme-toggle__icon--light" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <circle cx="12" cy="12" r="4" fill="currentColor"></circle>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                </svg>
                <svg class="theme-toggle__icon theme-toggle__icon--dark" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M20 12.5A7.5 7.5 0 1 1 11.5 4a6 6 0 0 0 8.5 8.5Z" fill="currentColor"></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>`;
}

function renderLandingFooter(themeAsset = getLandingThemeAsset()) {
  return `
      <footer class="footer" aria-label="Stopka FleetOps">
        <div class="container footer__inner">
          <div class="footer__grid">
            <div class="footer__brand">
              <a class="footer__logo" href="/" aria-label="FleetOps - strona główna" data-scroll-top="home">
                <img class="logo__icon" src="${themeAsset("assets/logos/logo-black.svg", "assets/logos/logo-white.svg")}" data-theme-src-light="assets/logos/logo-black.svg" data-theme-src-dark="assets/logos/logo-white.svg" alt="FleetOps logo" width="52" height="52" />
                <span class="footer__name">FleetOps</span>
              </a>
              <p class="footer__desc">Jeden przejrzysty panel do kontroli floty, zleceń i alertów SLA — zaprojektowany dla szybkiej pracy zespołów operacyjnych.</p>
            </div>

            <div class="footer__col">
              <h3 class="footer__title">Produkt</h3>
              <ul class="footer__list">
                <li><a href="/#/app">Panel</a></li>
                <li><a href="/#/app/fleet">Flota</a></li>
                <li><a href="/#/app/orders">Dyspozytornia</a></li>
                <li><a href="/#/app/reports">Analityka</a></li>
                <li><a href="/#/app/settings">Ustawienia</a></li>
              </ul>
            </div>

            <div class="footer__col">
              <h3 class="footer__title">Firma</h3>
              <ul class="footer__list">
                <li><a href="/about/">O nas</a></li>
                <li><a href="/pricing/">Cennik</a></li>
                <li><a href="/security/">Bezpieczeństwo</a></li>
                <li><a href="/contact/">Kontakt</a></li>
                <li><a href="/careers/">Kariera</a></li>
              </ul>
            </div>

            <div class="footer__col footer__col--contact">
              <h3 class="footer__title">Kontakt</h3>

              <address class="footer__address">
                <ul class="footer__list footer__contact-list">
                  <li>
                    <span class="footer__contact-text">
                      ul. Marynarki Wojennej 12<br>
                      33-100 Tarnów, Polska
                    </span>
                  </li>
                  <li>
                    <a href="tel:+48533537091" aria-label="Zadzwoń pod numer +48 533 537 091">
                      <svg class="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                      <span class="footer__contact-label">+48 533 537 091</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:kontakt@kp-code.pl" aria-label="Napisz email na kontakt@kp-code.pl">
                      <svg class="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                      <span class="footer__contact-label">kontakt@kp-code.pl</span>
                    </a>
                  </li>
                </ul>
              </address>

              <div class="footer__social-block">
                <h3 class="footer__title">Media społecznościowe</h3>

                <div class="footer__social" aria-label="Linki społecznościowe FleetOps">
                  <a class="footer__social-link" href="https://github.com/KPKrol85" aria-label="Profil KP_Code Digital Studio na GitHub">
                    <img src="assets/icons/github.svg" alt="" aria-hidden="true" width="18" height="18" />
                  </a>
                  <a class="footer__social-link" href="https://www.facebook.com/kpkrol85" aria-label="Profil KP_Code Digital Studio na Facebooku">
                    <img src="assets/icons/facebook.svg" alt="" aria-hidden="true" width="18" height="18" />
                  </a>
                  <a class="footer__social-link" href="https://www.instagram.com/kp_code_dv/" aria-label="Profil KP_Code Digital Studio na Instagramie">
                    <img src="assets/icons/instagram.svg" alt="" aria-hidden="true" width="18" height="18" />
                  </a>
                  <a class="footer__social-link" href="https://www.linkedin.com/in/kp-code" aria-label="Profil KP_Code Digital Studio na LinkedIn">
                    <img src="assets/icons/linkedin.svg" alt="" aria-hidden="true" width="18" height="18" />
                  </a>
                  <a class="footer__social-link" href="https://x.com/KP_Code_85" aria-label="Profil KP_Code Digital Studio na X">
                    <img src="assets/icons/X.svg" alt="" aria-hidden="true" width="18" height="18" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <nav class="footer__legal" aria-label="Informacje prawne">
            <span class="footer__legal-label">Informacje prawne</span>
            <ul class="footer__legal-list">
              <li><a href="/terms/">Regulamin</a></li>
              <li><a href="/privacy/">Polityka prywatności</a></li>
              <li><a href="/cookies/">Polityka cookies</a></li>
            </ul>
          </nav>

          <div class="footer__bottom">
            <span>© 2026 KP_Code Digital Studio | Wszelkie prawa zastrzeżone.</span>
          </div>
        </div>
      </footer>`;
}

function initResourcesMenu() {
  const toggle = document.getElementById("resourcesToggle");
  const menu = document.getElementById("resourcesMenu");
  if (!toggle || !menu) return;

  let isOpen = false;

  const closeMenu = (returnFocus = false) => {
    if (!isOpen) return;
    isOpen = false;
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    if (returnFocus) toggle.focus();
  };

  const openMenu = () => {
    if (isOpen) return;
    isOpen = true;
    menu.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  };

  toggle.setAttribute("aria-expanded", "false");

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    if (isOpen) {
      closeMenu(true);
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu(true));
  });

  const handleDocClick = (event) => {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu(true);
    }
  };

  const handleDocKeydown = (event) => {
    if (event.key === "Escape" && isOpen) {
      closeMenu(true);
    }
  };

  document.addEventListener("click", handleDocClick);

  document.addEventListener("keydown", handleDocKeydown);

  CleanupRegistry.add(() => {
    document.removeEventListener("click", handleDocClick);
    document.removeEventListener("keydown", handleDocKeydown);
  });
}

function initLandingShell() {
  const logoCleanup = FleetUI.bindLogoScroll("home");
  CleanupRegistry.add(logoCleanup);

  const tBtn = document.getElementById("themeToggleLanding");
  if (tBtn) {
    tBtn.addEventListener("click", () => {
      FleetStore.toggleTheme();
      getLandingTheme();
    });
  }

  const navToggle = document.getElementById("navToggle");
  const navDrawer = document.getElementById("mobileNav");
  const navBackdrop = document.querySelector("[data-nav-close]");
  let navOpen = false;

  const getDrawerFocusables = () => {
    if (!navDrawer) return [];
    return Array.from(navDrawer.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
  };

  const trapDrawerFocus = (event) => {
    if (!navOpen || event.key !== "Tab") return;
    const focusables = getDrawerFocusables();
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey) {
      if (active === first || !navDrawer.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else if (active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const openNav = () => {
    if (!navToggle || !navDrawer) return;
    document.documentElement.classList.add("is-nav-open");
    navToggle.setAttribute("aria-expanded", "true");
    navDrawer.setAttribute("aria-hidden", "false");
    navOpen = true;
    window.requestAnimationFrame(() => {
      const focusables = getDrawerFocusables();
      const firstItem = focusables[0];
      if (firstItem) firstItem.focus();
    });
  };

  const closeNav = () => {
    if (!navToggle) return;
    document.documentElement.classList.remove("is-nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    if (navDrawer) navDrawer.setAttribute("aria-hidden", "true");
    navOpen = false;
    navToggle.focus();
  };

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      if (navOpen) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener("click", () => {
      if (navOpen) closeNav();
    });
  }

  if (navDrawer) {
    navDrawer.addEventListener("click", (event) => {
      if (event.target && event.target.closest("a")) {
        closeNav();
      }
    });
  }

  initResourcesMenu();

  const handleKeydown = (event) => {
    if (event.key === "Escape" && navOpen) {
      closeNav();
      return;
    }
    trapDrawerFocus(event);
  };
  document.addEventListener("keydown", handleKeydown);

  CleanupRegistry.add(() => {
    document.removeEventListener("keydown", handleKeydown);
  });

  const siteHeader = document.querySelector(".landing .site-header");
  if (siteHeader) {
    let lastY = 0;
    let ticking = false;
    let isScrolled = siteHeader.classList.contains("is-scrolled");
    const SHRINK_ADD_Y = 72;
    const SHRINK_REMOVE_Y = 24;
    const scrollOptions = { passive: true };

    const setScrolled = (next) => {
      if (next === isScrolled) return;
      isScrolled = next;
      siteHeader.classList.toggle("is-scrolled", next);
    };

    const onScroll = () => {
      lastY = window.scrollY || 0;
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        if (lastY > SHRINK_ADD_Y) {
          setScrolled(true);
        } else if (lastY < SHRINK_REMOVE_Y) {
          setScrolled(false);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, scrollOptions);
    onScroll();

    CleanupRegistry.add(() => {
      window.removeEventListener("scroll", onScroll, scrollOptions);
    });
  }

  document.querySelectorAll(".accordion").forEach((el) => Accordion.init(el));
}

function renderLanding() {
  const app = document.getElementById("app");
  if (!app) return;

  const theme = getLandingTheme();
  const themeAsset = getLandingThemeAsset(theme);

  app.innerHTML = `
    <div class="landing landing-home">
${renderLandingHeader(themeAsset)}

      <main id="main-content">
        <section class="container section hero">
          <div class="hero__content">
            <div class="tag">Centrum operacji floty i transportu</div>
            <h1 class="hero__title">
              <span class="hero__title-brand">FleetOps</span>
              <span class="hero__title-main">- panel operacyjny dla transportu i floty.</span>
            </h1>
            <p class="hero__subtitle">Monitoruj zlecenia, pojazdy i kierowców w jednym widoku. Alerty SLA, realtime ETA i szybkie decyzje wspierane przez przejrzysty interfejs.</p>
            <div class="hero-cta">
              <a class="button button--primary" href="/#/login">Zacznij</a>
              <a class="button button--secondary" href="/#/app">Zobacz demo</a>
              <span class="hero-cta__note">Bez instalacji. Dane demo.</span>
            </div>
          </div>

          <div class="hero-visual">
            <div class="hero-image">
              <picture class="img-swap">
                <source srcset="${themeAsset("assets/img/hero/hero-light.avif", "assets/img/hero/hero-dark.avif")}" data-theme-srcset-light="assets/img/hero/hero-light.avif" data-theme-srcset-dark="assets/img/hero/hero-dark.avif" type="image/avif">
                <source srcset="${themeAsset("assets/img/hero/hero-light.webp", "assets/img/hero/hero-dark.webp")}" data-theme-srcset-light="assets/img/hero/hero-light.webp" data-theme-srcset-dark="assets/img/hero/hero-dark.webp" type="image/webp">
                <img
                  src="${themeAsset("assets/img/hero/hero-light.jpg", "assets/img/hero/hero-dark.jpg")}"
                  data-theme-src-light="assets/img/hero/hero-light.jpg"
                  data-theme-src-dark="assets/img/hero/hero-dark.jpg"
                  alt="FleetOps Panel"
                  loading="eager"
                  fetchpriority="high"
                  width="1200"
                  height="750"
                  decoding="async">
              </picture>
            </div>
          </div>
        </section>

        <section class="container section">
          <div class="section-header">
            <p class="tag">Funkcje</p>
            <h2 class="section-header__title">Usprawnij dyspozycje, kondycje floty i SLA.</h2>
            <p class="section-header__lead">Pracuj szybciej dzięki jasnym statusom, filtrom i alertom prosto z panelu.</p>
          </div>
          <div class="grid">
            <div class="card card--feature">
              <h3 class="card__title">Rozwój dyspozycji</h3>
              <p class="card__text">Przydzielaj kursy, śledź postęp i reaguj na zakłócenia z jednego widoku.</p>
            </div>
            <div class="card card--feature">
              <h3 class="card__title">Kondycja floty</h3>
              <p class="card__text">Przeglądy, serwisy i awarie pod kontrolą dzięki checklistom i timeline.</p>
            </div>
            <div class="card card--feature">
              <h3 class="card__title">Alerty SLA</h3>
              <p class="card__text">Alerty o opóźnieniach i KPI, zanim klient to zauważy.</p>
            </div>
            <div class="card card--feature">
              <h3 class="card__title">Raporty</h3>
              <p class="card__text">Wydajność, wykorzystanie floty i emisje w lekkich raportach eksportowalnych.</p>
            </div>
          </div>
        </section>

        <section class="container section">
          <div class="section-header">
            <p class="tag">Jak to działa</p>
            <h2 class="section-header__title">3 kroki do kontroli nad transportem</h2>
            <p class="section-header__lead">
              Zacznij od danych, ustaw zasady pracy i zarządzaj operacjami z jednego panelu.
            </p>
          </div>
          <div class="grid">
            <div class="card card--step">
            <span class="card__step-number" aria-hidden="true">1</span>
              <h3 class="card__title">Podłącz dane</h3>
              <p class="card__text">Dodaj zlecenia i flotę lub rozpocznij pracę na danych demo.</p>
            </div>
            <div class="card card--step">
            <span class="card__step-number" aria-hidden="true">2</span>
              <h3 class="card__title">Ustaw reguły</h3>
              <p class="card__text">Zdefiniuj SLA, alerty i filtry priorytetów dla codziennej pracy.</p>
            </div>
            <div class="card card--step">
            <span class="card__step-number" aria-hidden="true">3</span>
              <h3 class="card__title">Zarządzaj</h3>
              <p class="card__text">Monitoruj statusy, reaguj na ryzyka i eksportuj raporty z jednego panelu.</p>
            </div>
          </div>
        </section>

        <section class="container section">
          <div class="section-header">
            <p class="tag">Cennik</p>
            <h2 class="section-header__title">Lekki cennik na start</h2>
            <p class="section-header__lead">Przejrzyste progi cenowe pomagają szybko ocenić, który zakres panelu najlepiej pasuje do codziennej obsługi transportu.</p>
          </div>
          <div class="grid grid--pricing">
            <div class="card card--pricing">
              <div class="badge">Start</div>
              <h3 class="card__title">Podstawowa kontrola operacji</h3>
              <div class="card__price">199 PLN</div>
              <p class="card__text">dla małych flot do 15 pojazdów</p>
              <ul class="card__list">
                <li>kontrola zleceń i statusów</li>
                <li>podgląd pojazdów w jednym panelu</li>
                <li>dobry start dla małego zespołu</li>
              </ul>
              <a class="button button--secondary" href="/#/login">Przetestuj panel</a>
            </div>
            <div class="card card--pricing">
              <div class="badge">Rozwój</div>
              <h3 class="card__title">Rozszerzona kontrola operacji</h3>
              <div class="card__price">499 PLN</div>
              <p class="card__text">dla zespołów obsługujących do 60 pojazdów</p>
              <ul class="card__list">
                <li>szersza obsługa zleceń i floty</li>
                <li>raporty operacyjne dla zespołu</li>
                <li>więcej kontroli nad codzienną pracą</li>
              </ul>
              <a class="button button--secondary" href="/contact/">Umów demo</a>
            </div>
            <div class="card card--pricing">
              <div class="badge">Korporacyjny</div>
              <h3 class="card__title">Kontrola operacji w większej skali</h3>
              <div class="card__price">Indywidualnie</div>
              <p class="card__text">dla flot powyżej 60 pojazdów</p>
              <ul class="card__list">
                <li>zakres dopasowany do większej skali</li>
                <li>wsparcie dla procesów i zespołów</li>
                <li>elastyczne podejście do wdrożenia</li>
              </ul>
              <a class="button button--secondary" href="/contact/">Porozmawiajmy</a>
            </div>
          </div>
        </section>

        <section class="container section">
          <div class="section-header">
            <p class="tag">Opinie</p>
            <h2 class="section-header__title">Operatorzy o FleetOps</h2>
            <p class="section-header__lead">Zobacz, jak FleetOps porządkuje codzienną pracę zespołów odpowiedzialnych za trasy, kierowców i statusy zleceń.</p>
          </div>
          <div class="grid grid--testimonials">
            <figure class="card card--testimonial">
              <h3 class="card__title">Mniej ręcznego sprawdzania statusów</h3>
              <blockquote class="card__quote">
                <p>Szybciej widzimy status tras, opóźnienia i priorytety. Zespół operacyjny ma mniej ręcznego sprawdzania danych.</p>
              </blockquote>
              <figcaption class="card__author">
                <span class="card__author-role">COO</span>
                <span class="card__author-company">CargoNord</span>
              </figcaption>
            </figure>
            <figure class="card card--testimonial">
              <h3 class="card__title">Sprawniejsza komunikacja operacyjna</h3>
              <blockquote class="card__quote">
                <p>FleetOps uporządkował codzienną komunikację między dyspozytorami, kierowcami i obsługą klienta.</p>
              </blockquote>
              <figcaption class="card__author">
                <span class="card__author-role">Lider operacji</span>
                <span class="card__author-company">FreshLine</span>
              </figcaption>
            </figure>
            <figure class="card card--testimonial">
              <h3 class="card__title">Jedno miejsce do kontroli floty</h3>
              <blockquote class="card__quote">
                <p>Największa różnica to jedno miejsce do kontroli floty, zleceń i raportów. Łatwiej podejmujemy decyzje operacyjne.</p>
              </blockquote>
              <figcaption class="card__author">
                <span class="card__author-role">Fleet Manager</span>
                <span class="card__author-company">AeroParts</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section class="container section section-faq">
          <div class="section-header">
            <p class="tag">Pytania</p>
            <h2 class="section-header__title">Najczęstsze pytania</h2>
            <p class="section-header__lead">
            Krótkie odpowiedzi na najważniejsze pytania dotyczące działania panelu demonstracyjnego FleetOps.
            </p>
          </div>
          <div class="accordion" id="faq">
            <div class="accordion-item">
              <button class="accordion-header">Czy FleetOps działa bez instalacji?<span aria-hidden="true">▾</span></button>
              <div class="accordion-content">
                <p class="accordion-text">Tak. FleetOps działa w przeglądarce i pozwala szybko przejść do panelu demonstracyjnego bez konfiguracji.</p>
              </div>
            </div>
            <div class="accordion-item">
              <button class="accordion-header">Czy dane w panelu są prawdziwe?<span aria-hidden="true">▾</span></button>
              <div class="accordion-content">
                <p class="accordion-text">Nie. Panel korzysta z bezpiecznych danych przykładowych, przygotowanych do prezentacji przepływów, widoków i funkcji aplikacji.</p>
              </div>
            </div>
            <div class="accordion-item">
              <button class="accordion-header">Czy mogę zmienić motyw interfejsu?<span aria-hidden="true">▾</span></button>
              <div class="accordion-content">
                <p class="accordion-text">Tak. Aplikacja ma przełącznik jasnego i ciemnego motywu, a wybrana opcja zostaje zapamiętana w przeglądarce.</p>
              </div>
            </div>
            <div class="accordion-item">
              <button class="accordion-header">Co mogę sprawdzić w wersji demo?<span aria-hidden="true">▾</span></button>
              <div class="accordion-content">
                <p class="accordion-text">Możesz przejrzeć dashboard, zlecenia, flotę, kierowców, raporty oraz przykładowe interakcje typowe dla panelu operacyjnego.</p>
              </div>
            </div>
            <div class="accordion-item">
              <button class="accordion-header">Jak rozpocząć testowanie panelu?<span aria-hidden="true">▾</span></button>
              <div class="accordion-content">
                <p class="accordion-text">Wybierz „Zobacz demo” lub „Zacznij”, aby przejść do panelu i sprawdzić przykładowy przepływ pracy.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

${renderLandingFooter(themeAsset)}
    </div>
  `;

  initLandingShell();
}

window.FleetUI = window.FleetUI || {};
window.FleetUI.getLandingTheme = getLandingTheme;
window.FleetUI.getLandingThemeAsset = getLandingThemeAsset;
window.FleetUI.renderLandingHeader = renderLandingHeader;
window.FleetUI.renderLandingFooter = renderLandingFooter;
window.FleetUI.initResourcesMenu = initResourcesMenu;
window.FleetUI.initLandingShell = initLandingShell;
window.renderLanding = renderLanding;
