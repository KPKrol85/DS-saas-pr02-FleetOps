# FleetOps

## PL

### Przegląd projektu

FleetOps to statyczny, frontend-only projekt demonstracyjny typu SaaS dla operacji transportowych i flotowych. Repozytorium zawiera publiczną stronę marketingową, statyczne podstrony informacyjne oraz hash-routowany panel demo działający na lokalnych danych przykładowych.

Projekt jest częścią portfolio KP_Code Digital Studio i nie zawiera backendu, bazy danych, realnej autoryzacji ani produkcyjnych integracji z systemami zewnętrznymi.

### Kluczowe funkcje

- Publiczne strony: landing page, produkt, funkcje, cennik, o nas, kontakt, bezpieczeństwo, kariera, polityka prywatności, regulamin, polityka cookies oraz strona 404.
- Panel demo pod trasami `#/app`, `#/app/orders`, `#/app/fleet`, `#/app/drivers`, `#/app/reports` i `#/app/settings`.
- Demo logowania zapisujące stan lokalnie w przeglądarce, z powrotem do żądanej trasy po zalogowaniu.
- Lokalne role demo: administrator, dyspozytor i kierowca, z ograniczeniami akcji w module uprawnień.
- Dane przykładowe dla zleceń, pojazdów, kierowców, aktywności, alertów i raportów.
- Lokalne operacje na zleceniach, flocie i kierowcach: dodawanie, edycja, usuwanie, filtrowanie, sortowanie, paginacja typu „załaduj więcej” i szczegóły rekordu.
- Ustawienia interfejsu: motyw jasny/ciemny, tryb kompaktowy, zakres dashboardu, preferencje list i reset danych demo.
- Eksport raportów do pliku JSON. Eksport CSV zleceń jest celowo wyłączony w wersji demo.
- Responsywna nawigacja, dropdowny, modale, drawer szczegółów rekordu, toasty i akordeony.
- Wskaźnik statusu online/offline oraz lokalna kolejka akcji wykonanych w trybie offline.
- Service worker dla nawigacji publicznych tras i assetów statycznych.

### Stack technologiczny

Runtime:

- HTML, CSS i Vanilla JavaScript bez frameworka i bez bundlera.
- Klasyczne skrypty ładowane przez `<script defer>`.
- Hash routing dla części aplikacyjnej.
- `localStorage` i `sessionStorage` dla lokalnego stanu demo.
- Service Worker API.
- Web App Manifest.

Tooling:

- Node.js / npm.
- `sharp` do generowania obrazów AVIF/WebP/JPG z plików źródłowych.
- PostCSS z `cssnano` do minifikacji CSS.
- `terser` do minifikacji aktywnych plików JavaScript w buildzie.
- Playwright do testów smoke.
- Python `http.server` używany przez skrypty preview.

### Architektura

- Publiczne podstrony są osobnymi dokumentami `index.html` w katalogach tras. Wspólny header i footer są renderowane w `scripts/ui/layoutLanding.js`, a treść podstron marketingowych w `scripts/ui/marketingPages.js`.
- Panel demo działa w `index.html`. `scripts/router.js` obsługuje hash routing, guard tras `#/app`, zapamiętanie żądanej trasy oraz reset scrolla i `aria-current`.
- `scripts/state/store.js` jest centralnym store stanu z subskrypcjami i zapisem do `localStorage`. `scripts/data/seed.js` dostarcza dane początkowe.
- Widoki aplikacji są w `scripts/ui/views/`, powłoka panelu w `scripts/ui/layoutApp.js`, a wspólne komponenty w `scripts/ui/components/`.
- Uprawnienia ról demo są zamknięte w `scripts/core/permissions.js`.
- CSS jest modułowy: `styles/main.css` importuje numerowane pliki z `styles/src/`. Build produkcyjny generuje z nich jeden plik `styles/main.min.css` w katalogu `dist/`.

### Struktura projektu

```text
.
├── index.html                  # główna strona i wejście dla aplikacji demo
├── 404.html                    # statyczna strona błędu
├── product/ features/ pricing/ # publiczne podstrony marketingowe
├── about/ contact/ security/ careers/
├── privacy/ terms/ cookies/    # podstrony prawne i informacyjne
├── scripts/
│   ├── main.js                 # inicjalizacja, status online, service worker
│   ├── router.js               # hash routing, auth guard, aria-current, scroll reset
│   ├── core/                   # uprawnienia ról demo
│   ├── data/                   # dane seed demo
│   ├── state/                  # store i localStorage
│   ├── ui/                     # layouty, strony, komponenty i widoki aplikacji
│   ├── utils/                  # DOM, formatowanie, storage, cleanup
│   └── qa/                     # walidacja zmiennych CSS
├── styles/
│   ├── main.css                # importuje moduły CSS
│   └── src/                    # tokeny, layout, komponenty, widoki, strony
├── assets/                     # favicony, font, ikony, logo, obrazy, OG, screenshoty
├── tests/smoke.spec.js         # testy Playwright
├── build-dist.js               # build produkcyjny do dist/
├── optimize-images.js          # pipeline optymalizacji obrazów
├── playwright.config.js        # konfiguracja testów
├── sw.js                       # service worker
├── _headers                    # nagłówki dla statycznego hostingu
├── _redirects                  # przekierowania i fallback routingu
├── robots.txt
├── sitemap.xml
├── CHANGELOG.md
└── LICENSE
```

### Instalacja

Projekt ma zależności developerskie opisane w `package.json` i `package-lock.json`.

```bash
npm ci
```

### Development lokalny

Uruchomienie lokalnego serwera preview:

```bash
npm run preview
```

Domyślny adres preview to:

```text
http://127.0.0.1:8181
```

Alternatywnie dostępny jest plik `start-local-server.bat`, który uruchamia `python -m http.server 8181`.

Projekt należy uruchamiać przez serwer HTTP. Otwarcie plików bezpośrednio z dysku nie odzwierciedla działania ścieżek absolutnych, routingu ani service workera.

### Dostępne skrypty

- `npm run preview` — serwuje katalog projektu przez `python -m http.server 8181`.
- `npm run preview:dist` — serwuje katalog `dist/` na porcie 8182.
- `npm run optimize:images` — generuje warianty obrazów przez `optimize-images.js`.
- `npm run build` — uruchamia optymalizację obrazów, a następnie `build-dist.js`.
- `npm run test` — alias dla `npm run build`.
- `npm run test:smoke` — uruchamia testy Playwright.
- `npm run qa:css-vars` — sprawdza definicje i użycia zmiennych CSS w `styles/src/`.

### Build produkcyjny

Build produkcyjny uruchamia optymalizację obrazów, tworzy katalog `dist/` od zera, buduje `styles/main.min.css`, podmienia referencje do CSS w HTML, minifikuje aktywne skrypty i kopiuje assety oraz pliki `sw.js`, `_headers`, `_redirects`, `robots.txt` i `sitemap.xml`.

```bash
npm run build
```

Podgląd katalogu `dist/`:

```bash
npm run preview:dist
```

Katalog `dist/` jest wyjściem generowanym. Nie należy edytować go ręcznie — zmiany wprowadza się w plikach źródłowych i regeneruje build.

### Testy i walidacja

```bash
npm run test:smoke
npm run qa:css-vars
```

- Testy smoke są w `tests/smoke.spec.js` i uruchamiane przez Playwright.
- `playwright.config.js` używa projektu `Desktop Chrome`, `baseURL` `http://127.0.0.1:8181`, blokuje service workery w testach i startuje serwer komendą `npm run preview`.
- `scripts/qa/check-css-vars.js` analizuje statycznie pliki w `styles/src/` pod kątem zdefiniowanych i używanych zmiennych CSS.

Repozytorium nie zawiera zapisanych wyników przebiegów testów.

### Wdrożenie

Repozytorium zawiera konfigurację dla statycznego hostingu:

- `_headers` definiuje nagłówki bezpieczeństwa, CSP oraz cache dla `/assets/*` i plików HTML.
- `_redirects` obsługuje slash redirects dla publicznych podstron, ścieżki assetów oraz fallback `/* /index.html 200`.
- `robots.txt` i `sitemap.xml` wskazują kanoniczną domenę `https://saas-pr02-fleetops.netlify.app/`.

Publikowanym artefaktem builda jest katalog `dist/`. Repozytorium zawiera konfigurację wdrożenia, ale nie zawiera potwierdzenia aktywnego środowiska produkcyjnego.

### Dostępność

W kodzie zaimplementowano konkretne elementy dostępności:

- skip link do `#main-content`;
- ukryty region `role="status"` dla zmian tras;
- live regions dla toastów: `role="status"` z `aria-live="polite"` i `role="alert"` z `aria-live="assertive"`;
- obsługę `aria-current` dla aktywnej nawigacji;
- `aria-expanded`, `aria-controls`, `aria-modal` i `aria-labelledby` w interaktywnych komponentach;
- trap focus i przywracanie fokusu w modalach, drawerze aplikacji, nawigacji mobilnej i drawerze szczegółów;
- powiązanie pól formularzy z błędami przez `aria-describedby` i `aria-invalid`;
- uwzględnienie `prefers-reduced-motion` przy przewijaniu i wybranych animacjach.

Repozytorium nie deklaruje formalnej zgodności WCAG.

### SEO

Projekt zawiera:

- meta description na stronach HTML;
- canonical URL dla publicznych podstron;
- Open Graph i Twitter Card metadata;
- JSON-LD na stronie głównej;
- `robots.txt` z regułami `Disallow` dla tras panelu;
- `sitemap.xml`;
- `noindex, follow` dla strony `404.html`;
- favicony, Apple touch icon i manifest aplikacji.

### PWA i obsługa offline

- `assets/favicon/site.webmanifest` definiuje `name`, `short_name`, `start_url` `/`, `scope` `/`, `display` `standalone`, ikony 192/512 (w tym warianty maskable), screenshoty oraz skróty do dashboardu, floty i zleceń.
- `scripts/main.js` rejestruje `/sw.js` po zdarzeniu `load`, gdy przeglądarka wspiera Service Worker API.
- `sw.js` używa wersjonowanego cache (`fleetops-v1.10`), precache’uje powłokę aplikacji i publiczne trasy, a przy aktywacji usuwa starsze cache z prefiksem `fleetops-`.
- Nawigacje działają w strategii network-first z fallbackiem do cache, a assety statyczne w strategii stale-while-revalidate.
- Wersjonowanie cache w `sw.js` jest utrzymywane ręcznie.

### Wydajność

W projekcie widoczne są następujące mechanizmy wydajnościowe:

- lokalny font Inter w formacie WOFF2 z `font-display: swap`;
- preload fontu w HTML;
- obrazy hero w wariantach AVIF, WebP i JPG;
- jawne wymiary obrazu hero oraz `fetchpriority="high"` dla głównej grafiki;
- build CSS do jednego minifikowanego pliku `styles/main.min.css`;
- minifikacja aktywnych skryptów JavaScript w buildzie produkcyjnym;
- cache assetów statycznych przez service worker i nagłówki `_headers`;
- wykluczenie `assets/img-src/` z katalogu `dist/`.

Repozytorium nie zawiera zmierzonych wyników wydajności.

### Dane i trwałość stanu

- Dane początkowe są statyczne i pochodzą z `scripts/data/seed.js`.
- Stan demo jest zapisywany w `localStorage` pod kluczami `fleet-domain-v1`, `fleet-activity-v1`, `fleet-list-prefs-v1`, `fleet-current-user` i `fleet-offline-queue`, przez opakowanie w `scripts/utils/storage.js`.
- `sessionStorage` przechowuje wyłącznie żądaną trasę powrotu (`auth:returnTo`) używaną przez guard w `scripts/router.js`.
- Reset danych demo usuwa klucze domenowe, aktywność i preferencje list.
- Raporty można wyeksportować lokalnie do pliku `fleetops-reports.json`.
- Projekt nie ma kont użytkowników, backendu, bazy danych ani synchronizacji między urządzeniami. Dane istnieją tylko w przeglądarce.

### Utrzymanie projektu

- Logika startowa i rejestracja service workera są w `scripts/main.js`.
- Routing, ochrona tras demo i reset scrolla są w `scripts/router.js`.
- Dane demo są w `scripts/data/seed.js`.
- Lokalny store, preferencje, dane domenowe i kolejka offline są w `scripts/state/store.js`.
- Uprawnienia ról demo są w `scripts/core/permissions.js`.
- Widoki aplikacji są w `scripts/ui/views/`, a wspólne komponenty UI w `scripts/ui/components/`.
- Style źródłowe są modułowe w `styles/src/`, a `styles/main.css` tylko je importuje.
- Pipeline obrazów jest zaimplementowany w `optimize-images.js`; pliki źródłowe leżą w `assets/img-src/`, a warianty wynikowe w `assets/img/`.
- Katalog `dist/`, `styles/main.min.css` i zminifikowane skrypty są generowane przez `build-dist.js` i nie powinny być edytowane ręcznie.
- Istotne zmiany projektu są opisywane w [`CHANGELOG.md`](CHANGELOG.md).

### Licencja

Projekt jest objęty Własnościową Licencją Projektu KP_CODE (wersja 1.0). Pełne i wiążące warunki znajdują się w pliku [`LICENSE`](LICENSE), do którego odsyła również pole `license` w `package.json`. Kod jest własnościowy, zastrzeżony dla Kamil Król — KP_Code, i udostępniony do celów portfolio, referencyjnych oraz code review. Licencja projektu nie zastępuje odrębnych licencji materiałów zewnętrznych (bibliotek, zależności, fontów, ikon, grafik).

## EN

### Project Overview

FleetOps is a static, frontend-only SaaS-style demo project for transport and fleet operations. The repository contains a public marketing site, static informational subpages, and a hash-routed demo dashboard running on local sample data.

The project is part of the KP_Code Digital Studio portfolio and does not include a backend, database, real authentication, or production integrations with external systems.

### Key Features

- Public pages: landing page, product, features, pricing, about, contact, security, careers, privacy policy, terms, cookies policy, and 404 page.
- Demo dashboard under `#/app`, `#/app/orders`, `#/app/fleet`, `#/app/drivers`, `#/app/reports`, and `#/app/settings`.
- Demo login that stores state locally in the browser and returns to the requested route after sign-in.
- Local demo roles: administrator, dispatcher, and driver, with action restrictions in the permissions module.
- Sample data for orders, vehicles, drivers, activity, alerts, and reports.
- Local operations for orders, fleet, and drivers: create, edit, delete, filter, sort, load-more pagination, and record details.
- Interface settings: light/dark theme, compact mode, dashboard range, list preferences, and demo data reset.
- JSON report export. Orders CSV export is intentionally disabled in the demo version.
- Responsive navigation, dropdowns, modals, record detail drawer, toasts, and accordions.
- Online/offline status indicator and a local queue of actions performed while offline.
- Service worker for public route navigation and static assets.

### Tech Stack

Runtime:

- HTML, CSS, and Vanilla JavaScript with no framework and no bundler.
- Classic scripts loaded through `<script defer>`.
- Hash routing for the application area.
- `localStorage` and `sessionStorage` for local demo state.
- Service Worker API.
- Web App Manifest.

Tooling:

- Node.js / npm.
- `sharp` for generating AVIF/WebP/JPG images from source files.
- PostCSS with `cssnano` for CSS minification.
- `terser` for minifying active JavaScript files during the build.
- Playwright for smoke tests.
- Python `http.server` used by preview scripts.

### Architecture

- Public subpages are separate `index.html` documents in route directories. The shared header and footer are rendered in `scripts/ui/layoutLanding.js`, and marketing subpage content in `scripts/ui/marketingPages.js`.
- The demo dashboard runs in `index.html`. `scripts/router.js` handles hash routing, the `#/app` route guard, storing the requested route, and scroll and `aria-current` updates.
- `scripts/state/store.js` is the central state store with subscriptions and `localStorage` persistence. `scripts/data/seed.js` provides the initial data.
- Application views live in `scripts/ui/views/`, the dashboard shell in `scripts/ui/layoutApp.js`, and shared components in `scripts/ui/components/`.
- Demo role permissions are contained in `scripts/core/permissions.js`.
- CSS is modular: `styles/main.css` imports the numbered files from `styles/src/`. The production build generates a single `styles/main.min.css` from them in the `dist/` directory.

### Project Structure

```text
.
├── index.html                  # main page and demo app entry
├── 404.html                    # static error page
├── product/ features/ pricing/ # public marketing subpages
├── about/ contact/ security/ careers/
├── privacy/ terms/ cookies/    # legal and informational subpages
├── scripts/
│   ├── main.js                 # initialization, online status, service worker
│   ├── router.js               # hash routing, auth guard, aria-current, scroll reset
│   ├── core/                   # demo role permissions
│   ├── data/                   # demo seed data
│   ├── state/                  # store and localStorage
│   ├── ui/                     # layouts, pages, components, and app views
│   ├── utils/                  # DOM, formatting, storage, cleanup
│   └── qa/                     # CSS custom property validation
├── styles/
│   ├── main.css                # imports CSS modules
│   └── src/                    # tokens, layout, components, views, pages
├── assets/                     # favicons, font, icons, logos, images, OG, screenshots
├── tests/smoke.spec.js         # Playwright tests
├── build-dist.js               # production build into dist/
├── optimize-images.js          # image optimization pipeline
├── playwright.config.js        # test configuration
├── sw.js                       # service worker
├── _headers                    # static hosting headers
├── _redirects                  # redirects and routing fallback
├── robots.txt
├── sitemap.xml
├── CHANGELOG.md
└── LICENSE
```

### Installation

The project has development dependencies defined in `package.json` and `package-lock.json`.

```bash
npm ci
```

### Local Development

Run the local preview server:

```bash
npm run preview
```

The default preview URL is:

```text
http://127.0.0.1:8181
```

Alternatively, `start-local-server.bat` starts `python -m http.server 8181`.

The project must be served over HTTP. Opening files directly from disk does not reflect absolute paths, routing, or service worker behavior.

### Available Scripts

- `npm run preview` — serves the project directory through `python -m http.server 8181`.
- `npm run preview:dist` — serves the `dist/` directory on port 8182.
- `npm run optimize:images` — generates image variants through `optimize-images.js`.
- `npm run build` — runs image optimization and then `build-dist.js`.
- `npm run test` — alias for `npm run build`.
- `npm run test:smoke` — runs the Playwright tests.
- `npm run qa:css-vars` — checks CSS custom property definitions and usages in `styles/src/`.

### Production Build

The production build runs image optimization, recreates the `dist/` directory from scratch, builds `styles/main.min.css`, rewrites CSS references in HTML, minifies active scripts, and copies assets plus `sw.js`, `_headers`, `_redirects`, `robots.txt`, and `sitemap.xml`.

```bash
npm run build
```

Preview the `dist/` directory:

```bash
npm run preview:dist
```

The `dist/` directory is generated output. It should not be edited manually — changes are made in the source files and the build is regenerated.

### Testing and Validation

```bash
npm run test:smoke
npm run qa:css-vars
```

- Smoke tests live in `tests/smoke.spec.js` and run through Playwright.
- `playwright.config.js` uses the `Desktop Chrome` project, `baseURL` `http://127.0.0.1:8181`, blocks service workers during tests, and starts the server with `npm run preview`.
- `scripts/qa/check-css-vars.js` statically analyzes the files in `styles/src/` for defined and used CSS custom properties.

The repository does not contain recorded test run results.

### Deployment

The repository contains static hosting configuration:

- `_headers` defines security headers, CSP, and cache rules for `/assets/*` and HTML files.
- `_redirects` handles slash redirects for public subpages, asset paths, and the `/* /index.html 200` fallback.
- `robots.txt` and `sitemap.xml` point to the canonical domain `https://saas-pr02-fleetops.netlify.app/`.

The publishable build artifact is the `dist/` directory. The repository contains deployment configuration but no confirmation of an active production environment.

### Accessibility

The code implements specific accessibility elements:

- skip link to `#main-content`;
- hidden `role="status"` region for route changes;
- toast live regions: `role="status"` with `aria-live="polite"` and `role="alert"` with `aria-live="assertive"`;
- `aria-current` handling for active navigation;
- `aria-expanded`, `aria-controls`, `aria-modal`, and `aria-labelledby` in interactive components;
- focus trapping and focus restoration in modals, the app drawer, mobile navigation, and the record detail drawer;
- form fields associated with errors through `aria-describedby` and `aria-invalid`;
- `prefers-reduced-motion` support for scrolling and selected animations.

The repository does not declare formal WCAG compliance.

### SEO

The project includes:

- meta descriptions in HTML pages;
- canonical URLs for public subpages;
- Open Graph and Twitter Card metadata;
- JSON-LD on the homepage;
- `robots.txt` with `Disallow` rules for dashboard routes;
- `sitemap.xml`;
- `noindex, follow` for `404.html`;
- favicons, Apple touch icon, and app manifest.

### PWA and Offline Support

- `assets/favicon/site.webmanifest` defines `name`, `short_name`, `start_url` `/`, `scope` `/`, `display` `standalone`, 192/512 icons (including maskable variants), screenshots, and shortcuts to the dashboard, fleet, and orders.
- `scripts/main.js` registers `/sw.js` after the `load` event when the browser supports the Service Worker API.
- `sw.js` uses a versioned cache (`fleetops-v1.10`), precaches the app shell and public routes, and deletes older `fleetops-` caches on activation.
- Navigations use a network-first strategy with a cache fallback, and static assets use stale-while-revalidate.
- Cache versioning in `sw.js` is maintained manually.

### Performance

The project contains the following performance-related mechanisms:

- local Inter font in WOFF2 format with `font-display: swap`;
- font preload in HTML;
- hero images in AVIF, WebP, and JPG variants;
- explicit hero image dimensions and `fetchpriority="high"` for the primary image;
- CSS build into one minified `styles/main.min.css` file;
- minification of active JavaScript files in the production build;
- static asset caching through the service worker and `_headers`;
- exclusion of `assets/img-src/` from the `dist/` directory.

The repository does not contain measured performance scores.

### Data and State Persistence

- Initial data is static and comes from `scripts/data/seed.js`.
- Demo state is persisted in `localStorage` under the keys `fleet-domain-v1`, `fleet-activity-v1`, `fleet-list-prefs-v1`, `fleet-current-user`, and `fleet-offline-queue`, through the wrapper in `scripts/utils/storage.js`.
- `sessionStorage` only holds the requested return route (`auth:returnTo`) used by the guard in `scripts/router.js`.
- The demo data reset removes the domain, activity, and list preference keys.
- Reports can be exported locally to a `fleetops-reports.json` file.
- The project has no user accounts, backend, database, or cross-device synchronization. Data exists only in the browser.

### Project Maintenance

- Startup logic and service worker registration live in `scripts/main.js`.
- Routing, demo route protection, and scroll reset live in `scripts/router.js`.
- Demo data lives in `scripts/data/seed.js`.
- Local store, preferences, domain data, and the offline queue live in `scripts/state/store.js`.
- Demo role permissions live in `scripts/core/permissions.js`.
- Application views live in `scripts/ui/views/`, and shared UI components in `scripts/ui/components/`.
- Source styles are modular in `styles/src/`, while `styles/main.css` only imports them.
- The image pipeline is implemented in `optimize-images.js`; source files live in `assets/img-src/` and generated variants in `assets/img/`.
- The `dist/` directory, `styles/main.min.css`, and the minified scripts are generated by `build-dist.js` and should not be edited manually.
- Significant project changes are recorded in [`CHANGELOG.md`](CHANGELOG.md).

### License

The project is covered by the KP_CODE Proprietary Project License (version 1.0). The full and binding terms are in the [`LICENSE`](LICENSE) file, which the `license` field in `package.json` also points to. The code is proprietary, reserved for Kamil Król — KP_Code, and provided for portfolio, reference, and code review purposes. The project license does not replace the separate licenses of third-party materials (libraries, dependencies, fonts, icons, graphics).
