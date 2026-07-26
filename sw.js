const CACHE_NAME = "fleetops-v1.10";

const APP_SHELL_URLS = ["/", "/index.html"];
const PUBLIC_ROUTE_URLS = [
  "/product/",
  "/features/",
  "/pricing/",
  "/about/",
  "/contact/",
  "/security/",
  "/careers/",
  "/privacy/",
  "/terms/",
  "/cookies/",
];
const PRECACHE_URLS = Array.from(new Set([...APP_SHELL_URLS, ...PUBLIC_ROUTE_URLS]));

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("fleetops-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.headers.has("range")) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (isStaticAsset(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }
});

function isStaticAsset(pathname) {
  if (pathname.startsWith("/assets/")) return true;

  const lower = pathname.toLowerCase();
  return lower.endsWith(".css") || lower.endsWith(".js") || lower.endsWith(".png") || lower.endsWith(".svg") || lower.endsWith(".ico") || lower.endsWith(".webp") || lower.endsWith(".woff2");
}

function normalizePublicPath(pathname) {
  if (pathname === "/index.html") return "/";
  if (PUBLIC_ROUTE_URLS.includes(pathname)) return pathname;

  const trailingSlashPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (PUBLIC_ROUTE_URLS.includes(trailingSlashPath)) return trailingSlashPath;

  return pathname;
}

function isAppShellPath(pathname) {
  return pathname === "/" || pathname === "/index.html";
}

function isKnownPublicRoute(pathname) {
  return isAppShellPath(pathname) || PUBLIC_ROUTE_URLS.includes(normalizePublicPath(pathname));
}

function cacheNavigationResponse(cache, request, response) {
  const url = new URL(request.url);

  if (!response || !response.ok || !isKnownPublicRoute(url.pathname)) {
    return Promise.resolve();
  }

  const cachePath = normalizePublicPath(url.pathname);
  const writes = [cache.put(cachePath, response.clone())];

  if (isAppShellPath(url.pathname) && cachePath !== "/index.html") {
    writes.push(cache.put("/index.html", response.clone()));
  }

  return Promise.all(writes);
}

function matchNavigationCache(cache, request) {
  const url = new URL(request.url);
  const cachePath = normalizePublicPath(url.pathname);

  return cache
    .match(request)
    .then((cached) => cached || cache.match(cachePath))
    .then((cached) => {
      if (cached || !isAppShellPath(url.pathname)) return cached;
      return cache.match("/").then((cachedShell) => cachedShell || cache.match("/index.html"));
    });
}

function networkFirstNavigation(request) {
  return caches.open(CACHE_NAME).then((cache) =>
    fetch(request)
      .then((response) => {
        if (!response || !response.ok) {
          throw new Error("Network error");
        }

        return cacheNavigationResponse(cache, request, response).then(() => response);
      })
      .catch(() => matchNavigationCache(cache, request).then((cached) => cached || Response.error()))
  );
}

function staleWhileRevalidate(request) {
  return caches.match(request).then((cached) => {
    const fetchPromise = fetch(request)
      .then((response) => {
        if (response && response.ok) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone());
          });
          return response;
        }
        return cached || response;
      })
      .catch(() => cached);

    return cached || fetchPromise;
  });
}
