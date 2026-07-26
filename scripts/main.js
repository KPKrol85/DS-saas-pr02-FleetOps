(function init() {
  const publicHashRedirects = {
    "#/": "/",
    "#/product": "/product/",
    "#/features": "/features/",
    "#/pricing": "/pricing/",
    "#/about": "/about/",
    "#/contact": "/contact/",
    "#/security": "/security/",
    "#/careers": "/careers/",
    "#/privacy": "/privacy/",
    "#/terms": "/terms/",
    "#/cookies": "/cookies/",
  };

  const normalizeHash = () => {
    const hash = window.location.hash || "";
    return hash === "#" ? "" : hash;
  };

  const isDynamicHash = (hash) => hash === "#/login" || hash === "#/app" || hash.startsWith("#/app/");

  const redirectLegacyPublicHash = (hash) => {
    if (!hash) return false;

    const target = publicHashRedirects[hash];
    if (target) {
      window.location.replace(target);
      return true;
    }

    if (hash.startsWith("#/") && !isDynamicHash(hash)) {
      window.location.replace("/");
      return true;
    }

    return false;
  };

  const normalizePath = (path) => {
    if (!path || path === "/") return "/";
    return path.endsWith("/") ? path : `${path}/`;
  };

  const applyStaticAriaCurrent = () => {
    const currentPath = normalizePath(window.location.pathname);
    const links = document.querySelectorAll(".site-header__brand, .site-header__links a, .footer__logo, .footer__list a, .footer__legal-list a");

    links.forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (!href || href.includes("#/")) {
        link.removeAttribute("aria-current");
        return;
      }

      const url = new URL(href, window.location.origin);
      if (url.origin === window.location.origin && normalizePath(url.pathname) === currentPath) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const bindStaticContactForm = () => {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        Toast.show("Uzupełnij wymagane pola.", "warning", { assertive: true });
        return;
      }
      form.reset();
      Toast.show("Dziękujemy! Wkrótce się odezwiemy.", "success");
    });
  };

  const bindStaticLegalNav = () => {
    document.querySelectorAll(".legal-nav__link").forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href") || "";
        if (!href.startsWith("#")) return;

        const target = document.getElementById(href.slice(1));
        if (!target) return;

        event.preventDefault();
        const behavior = window.FleetUI?.getMotionSafeScrollBehavior
          ? FleetUI.getMotionSafeScrollBehavior()
          : "smooth";

        target.scrollIntoView({ behavior, block: "start" });
        target.focus({ preventScroll: true });
      });
    });
  };

  const initStaticPublicPage = () => {
    if (window.FleetUI?.initLandingShell) {
      FleetUI.initLandingShell();
    }
    applyStaticAriaCurrent();
    bindStaticContactForm();
    bindStaticLegalNav();
  };

  const handleHashRoute = () => {
    const hash = normalizeHash();
    if (redirectLegacyPublicHash(hash)) return true;
    if (isDynamicHash(hash)) {
      FleetRouter.routeTo(hash);
      return true;
    }
    return false;
  };

  if (window.FleetStore?.initDomain) {
    FleetStore.initDomain();
  }
  if (window.FleetStore?.initActivity) {
    FleetStore.initActivity();
  }

  const savedTheme = FleetStore.state.preferences.theme;
  if (!savedTheme) {
    FleetStore.setTheme("light");
  } else {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
  if (FleetStore.state.preferences.compact) {
    document.body.dataset.compact = "true";
  }

  const syncOnlineStatus = () => {
    if (window.FleetStore?.setOnlineStatus) {
      const isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
      FleetStore.setOnlineStatus(isOnline);
    }
  };

  const registerServiceWorker = () => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.warn("[FleetOps] Service worker registration failed", error);
      });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }
  };

  window.addEventListener("online", syncOnlineStatus);
  window.addEventListener("offline", syncOnlineStatus);
  syncOnlineStatus();

  window.addEventListener("hashchange", handleHashRoute);

  const initialHash = normalizeHash();
  if (!initialHash || !handleHashRoute()) initStaticPublicPage();

  registerServiceWorker();
})();
