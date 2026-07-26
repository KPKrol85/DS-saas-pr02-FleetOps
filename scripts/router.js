function renderInfoPage({ title, body }) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="landing">
      <header class="container site-header">
        <a class="site-header__brand logo" href="/" aria-label="FleetOps — Strona główna" data-scroll-top="home">
          <img class="site-header__logo logo__icon" src="assets/logos/logo-black.svg" alt="FleetOps logo" width="44" height="44" />
          <span>FleetOps</span>
        </a>
        <div class="site-header__actions">
          <a class="button button--ghost site-header__action" href="/#/login">Zaloguj się</a>
        </div>
      </header>
      <main class="container section" id="main-content">
        <div class="hero-card">
          <p class="tag">Informacja</p>
          <h1>${title}</h1>
          <div class="grid">${body}</div>
        </div>
      </main>
    </div>
  `;

  const cleanup = FleetUI.bindLogoScroll("home");
  CleanupRegistry.add(cleanup);
}

function renderLogin() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <main class="login-page" id="main-content">
      <div class="login-card">
        <div class="login-card__topbar">
          <div class="login-card__logo">
            <img class="login-card__logo-icon" src="${FleetStore.state.preferences.theme === "dark" ? "assets/logos/logo-white.svg" : "assets/logos/logo-black.svg"}" data-theme-src-light="assets/logos/logo-black.svg" data-theme-src-dark="assets/logos/logo-white.svg" alt="FleetOps logo" />
            <span class="login-card__brand">FleetOps</span>
          </div>
          <a class="button button--ghost login-card__back" href="/">Wróć</a>
        </div>
        <div class="login-card__header">
          <h1 class="login-card__title">Zaloguj się</h1>
          <p class="login-card__lead">Logowanie demo — dane są zapisywane lokalnie w przeglądarce.</p>
        </div>
        <form id="loginForm" class="login-form">
          <label class="form-control">
            <span class="label">E-mail</span>
            <input required type="email" name="email" class="input" placeholder="you@fleetops.app" />
          </label>
          <label class="form-control">
            <span class="label">Hasło</span>
            <input required minlength="4" type="password" name="password" class="input" placeholder="••••••" />
          </label>
          <div class="login-form__actions">
            <button class="button button--primary" type="submit">Zaloguj się</button>
            <button class="button button--secondary" type="button" id="demoLogin">Kontynuuj jako demo</button>
          </div>
        </form>
      </div>
    </main>
  `;

  const form = document.getElementById("loginForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    if (!email || password.length < 4) {
      Toast.show("Podaj email i hasło (min 4 znaki)", "warning", { assertive: true });
      return;
    }
    const name = email.split("@")[0];
    FleetStore.login({ email, name });
    Toast.show("Zalogowano", "success");
    const returnTo = sessionStorage.getItem("auth:returnTo");
    if (returnTo) sessionStorage.removeItem("auth:returnTo");
    window.location.hash = returnTo || "#/app";
  });

  document.getElementById("demoLogin").addEventListener("click", () => {
    FleetStore.login({ email: "demo@fleetops.app", name: "Demo User" });
    const returnTo = sessionStorage.getItem("auth:returnTo");
    if (returnTo) sessionStorage.removeItem("auth:returnTo");
    window.location.hash = returnTo || "#/app";
  });
}

// === Dynamic aria-current (global) ===
function applyAriaCurrent() {
  const currentHash = window.location.hash || "#/";
  const normalizedHash = currentHash === "#" ? "#/" : currentHash;

  const updateGroup = (groupLinks) => {
    let matched = false;
    groupLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isMatch = href === normalizedHash;
      if (isMatch) {
        link.setAttribute("aria-current", "page");
        matched = true;
      } else {
        link.removeAttribute("aria-current");
      }
    });
    return matched;
  };

  const navLinks = document.querySelectorAll(".site-header__links a");
  const hasNavMatch = updateGroup(navLinks);

  const homeLogo = document.querySelector('.site-header__brand[data-scroll-top="home"]');
  if (homeLogo) {
    if (!hasNavMatch && normalizedHash === "#/") {
      homeLogo.setAttribute("aria-current", "page");
    } else {
      homeLogo.removeAttribute("aria-current");
    }
  }

  updateGroup(document.querySelectorAll(".sidebar nav a"));
  updateGroup(document.querySelectorAll(".footer-links a"));
}

const routeLabels = {
  "/": "Strona główna",
  "/login": "Logowanie",
  "/about": "O nas",
  "/contact": "Kontakt",
  "/product": "Produkt FleetOps",
  "/features": "Funkcje FleetOps",
  "/pricing": "Cennik FleetOps",
  "/security": "Bezpieczeństwo",
  "/careers": "Kariera",
  "/privacy": "Polityka prywatności",
  "/terms": "Regulamin",
  "/cookies": "Polityka cookies",
  "/app": "Przegląd",
  "/app/orders": "Zlecenia",
  "/app/fleet": "Flota",
  "/app/drivers": "Kierowcy",
  "/app/reports": "Raporty",
  "/app/settings": "Ustawienia",
};

let lastAnnouncedPath = "";
let routeAnnounceTimer = null;
let lastScrolledPath = "";

function announceRouteChange(path, label) {
  if (!label || path === lastAnnouncedPath) return;

  const region = document.getElementById("fleetops-route-status");
  if (!region) return;

  lastAnnouncedPath = path;
  if (routeAnnounceTimer) window.clearTimeout(routeAnnounceTimer);
  region.textContent = "";
  routeAnnounceTimer = window.setTimeout(() => {
    region.textContent = `Widok: ${label}`;
  }, 0);
}

function scrollRouteToTop(path) {
  if (!path || path === lastScrolledPath) return;

  lastScrolledPath = path;
  const resetElementScroll = (element) => {
    if (!element) return;

    if (typeof element.scrollTo === "function") {
      try {
        element.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return;
      } catch (e) {
        element.scrollTo(0, 0);
        return;
      }
    }

    if ("scrollTop" in element) element.scrollTop = 0;
    if ("scrollLeft" in element) element.scrollLeft = 0;
  };

  const run = () => {
    if (typeof window.scrollTo === "function") {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      } catch (e) {
        window.scrollTo(0, 0);
      }
    }

    const scrollTargets = [
      document.scrollingElement,
      document.documentElement,
      document.body,
      document.getElementById("app"),
      document.querySelector("main"),
      document.querySelector(".app-main"),
    ];

    scrollTargets.forEach(resetElementScroll);
  };

  run();

  if (typeof window.requestAnimationFrame === "function") {
    window.requestAnimationFrame(run);
  } else {
    window.setTimeout(run, 0);
  }
}

function routeTo(hash) {
  const returnToKey = "auth:returnTo";
  const path = hash.replace("#", "") || "/";
  const requiresAuth = path.startsWith("/app");
  let renderedPath = path;
  let renderedLabel = routeLabels[path];

  if (window.CleanupRegistry) CleanupRegistry.runAll();

  if (requiresAuth && !FleetStore.state.auth.isAuthenticated) {
    const targetHash = hash || window.location.hash || "#/app";
    try {
      sessionStorage.setItem(returnToKey, targetHash);
    } catch (e) {
      console.warn("ReturnTo storage error", e);
    }
    window.location.hash = "#/login";
    return;
  }

  if (path.startsWith("/app")) {
    FleetStorage.set("fleet-last-route", path);
  }

  switch (path) {
    case "/":
      renderLanding();
      break;
    case "/login":
      renderLogin();
      break;
    case "/about":
      renderAboutPage();
      break;
    case "/contact":
      renderContactPage();
      break;
    case "/product":
      renderProductPage();
      break;
    case "/features":
      renderFeaturesPage();
      break;
    case "/pricing":
      renderPricingPage();
      break;
    case "/security":
      renderSecurityPage();
      break;
    case "/careers":
      renderCareersPage();
      break;
    case "/privacy":
      renderPrivacyPage();
      break;
    case "/terms":
      renderTermsPage();
      break;
    case "/cookies":
      renderCookiesPage();
      break;
    case "/app":
      renderAppShell("Przegląd", dashboardView());
      break;
    case "/app/orders":
      renderAppShell("Zlecenia", ordersView());
      break;
    case "/app/fleet":
      renderAppShell("Flota", fleetView());
      break;
    case "/app/drivers":
      renderAppShell("Kierowcy", driversView());
      break;
    case "/app/reports":
      renderAppShell("Raporty", reportsView());
      break;
    case "/app/settings":
      renderAppShell("Ustawienia", settingsView());
      break;
    default:
      if (path.startsWith("/app")) {
        renderedLabel = "Nie znaleziono";
        renderAppShell("Nie znaleziono", notFoundView());
      } else {
        window.location.hash = "#/";
        renderedPath = "/";
        renderedLabel = routeLabels["/"];
        renderLanding();
      }
  }

  // <<< TO JEST JEDYNE MIEJSCE, GDZIE USTAWIAMY aria-current >>>
  applyAriaCurrent();
  announceRouteChange(renderedPath, renderedLabel);
  scrollRouteToTop(renderedPath);
}

window.FleetRouter = { routeTo };
