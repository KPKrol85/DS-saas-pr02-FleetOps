# FleetOps

## PL

### Przegląd projektu

FleetOps to statyczny, frontend-only projekt demonstracyjny typu SaaS dla operacji transportowych i flotowych. Repozytorium zawiera publiczną stronę marketingową, statyczne podstrony informacyjne oraz hash-routowany panel demo z lokalnymi danymi.

Projekt jest częścią portfolio KP_Code Digital Studio i nie zawiera backendu, bazy danych, realnej autoryzacji ani produkcyjnych integracji z systemami zewnętrznymi.

### Kluczowe funkcje

- Publiczne strony: landing page, produkt, funkcje, cennik, o nas, kontakt, bezpieczeństwo, kariera, polityka prywatności, regulamin, polityka cookies oraz strona 404.
- Panel demo pod trasami `#/app`, `#/app/orders`, `#/app/fleet`, `#/app/drivers`, `#/app/reports` i `#/app/settings`.
- Demo logowania zapisujące stan lokalnie w przeglądarce.
- Lokalne role demo: administrator, dyspozytor i kierowca, z ograniczeniami akcji w module uprawnień.
- Dane przykładowe dla zleceń, pojazdów, kierowców, aktywności, alertów i raportów.
- Lokalne operacje na zleceniach, flocie i kierowcach: dodawanie, edycja, usuwanie, filtrowanie, sortowanie, paginacja typu "załaduj więcej" i szczegóły rekordu.
- Ustawienia interfejsu: motyw jasny/ciemny, tryb kompaktowy, zakres dashboardu, preferencje list i reset danych demo.
- Eksport raportów do pliku JSON. Eksport CSV zleceń jest celowo wyłączony w wersji demo.
- Responsywna nawigacja, dropdowny, modale, drawer szczegółów rekordu, toasty i akordeony.
- Service worker dla cache nawigacji publicznych tras i assetów statycznych.

### Stack technologiczny

Runtime:

- HTML, CSS i Vanilla JavaScript.
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
│   └── utils/                  # DOM, formatowanie, storage, cleanup
├── styles/
│   ├── main.css                # importuje moduły CSS
│   └── src/                    # tokeny, layout, komponenty, widoki, strony
├── assets/                     # favicony, font, ikony, logo, obrazy, OG, screenshoty
├── tests/smoke.spec.js         # testy Playwright
├── build-dist.js               # build produkcyjny do dist/
├── optimize-images.js          # pipeline optymalizacji obrazów
├── _headers                    # nagłówki dla statycznego hostingu
├── _redirects                  # przekierowania i fallback routingu
├── robots.txt
├── sitemap.xml
└── LICENSE
```

### Instalacja i konfiguracja

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

Testy smoke:

```bash
npm run test:smoke
```

Kontrola użycia zmiennych CSS:

```bash
npm run qa:css-vars
```

### Build produkcyjny

Build produkcyjny uruchamia optymalizację obrazów, generuje katalog `dist/`, buduje `styles/main.min.css`, podmienia referencje do CSS w HTML, minifikuje aktywne skrypty i kopiuje assety oraz pliki metadata.

```bash
npm run build
```

Podgląd katalogu `dist/`:

```bash
npm run preview:dist
```

Skrypt `npm run test` jest aliasem dla `npm run build`.

### Deployment

Repozytorium zawiera konfigurację dla statycznego hostingu:

- `_headers` definiuje nagłówki bezpieczeństwa, CSP oraz cache dla `/assets/*` i plików HTML.
- `_redirects` obsługuje slash redirects dla publicznych podstron, ścieżki assetów oraz fallback `/* /index.html 200`.
- `robots.txt` i `sitemap.xml` wskazują kanoniczną domenę `https://saas-pr02-fleetops.netlify.app/`.

Publikowanym artefaktem builda jest katalog `dist/`.

### Dostępność

W kodzie zaimplementowano konkretne elementy dostępności:

- skip link do `#main-content`;
- ukryty region `role="status"` dla zmian tras;
- live regions dla toastów: `role="status"` i `role="alert"`;
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
- `robots.txt`;
- `sitemap.xml`;
- `noindex, follow` dla strony `404.html`;
- favicony, Apple touch icon i manifest aplikacji.

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

### Utrzymanie projektu

- Logika startowa i rejestracja service workera są w `scripts/main.js`.
- Routing, ochrona tras demo i reset scrolla są w `scripts/router.js`.
- Dane demo są w `scripts/data/seed.js`.
- Lokalny store, preferencje, dane domenowe i kolejka offline są w `scripts/state/store.js`.
- Uprawnienia ról demo są w `scripts/core/permissions.js`.
- Widoki aplikacji są w `scripts/ui/views/`.
- Wspólne komponenty UI są w `scripts/ui/components/`.
- Style źródłowe są modułowe w `styles/src/`, a `styles/main.css` tylko je importuje.
- Pipeline obrazów jest opisany w `IMAGE-ASSET-PIPELINE-MAP.md` i zaimplementowany w `optimize-images.js`.
- Notatki audytowe są w `AUDIT.md`, `audit-resolved.md` i `improvements.md`.

### Licencja

Projekt jest oznaczony jako `UNLICENSED` w `package.json` i `LICENSE`. Kod jest własnościowy, zastrzeżony dla Kamil Król / KP_Code Digital Studio i udostępniony do celów portfolio, referencyjnych oraz code review.

## EN

### Project Overview

FleetOps is a static, frontend-only SaaS-style demo project for transport and fleet operations. The repository contains a public marketing site, static informational subpages, and a hash-routed demo dashboard with local data.

The project is part of the KP_Code Digital Studio portfolio and does not include a backend, database, real authentication, or production integrations with external systems.

### Key Features

- Public pages: landing page, product, features, pricing, about, contact, security, careers, privacy policy, terms, cookies policy, and 404 page.
- Demo dashboard under `#/app`, `#/app/orders`, `#/app/fleet`, `#/app/drivers`, `#/app/reports`, and `#/app/settings`.
- Demo login that stores state locally in the browser.
- Local demo roles: administrator, dispatcher, and driver, with action restrictions in the permissions module.
- Sample data for orders, vehicles, drivers, activity, alerts, and reports.
- Local operations for orders, fleet, and drivers: create, edit, delete, filter, sort, load-more pagination, and record details.
- Interface settings: light/dark theme, compact mode, dashboard range, list preferences, and demo data reset.
- JSON report export. Orders CSV export is intentionally disabled in the demo version.
- Responsive navigation, dropdowns, modals, record detail drawer, toasts, and accordions.
- Service worker for caching public navigation routes and static assets.

### Tech Stack

Runtime:

- HTML, CSS, and Vanilla JavaScript.
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
│   └── utils/                  # DOM, formatting, storage, cleanup
├── styles/
│   ├── main.css                # imports CSS modules
│   └── src/                    # tokens, layout, components, views, pages
├── assets/                     # favicons, font, icons, logos, images, OG, screenshots
├── tests/smoke.spec.js         # Playwright tests
├── build-dist.js               # production build into dist/
├── optimize-images.js          # image optimization pipeline
├── _headers                    # static hosting headers
├── _redirects                  # redirects and routing fallback
├── robots.txt
├── sitemap.xml
└── LICENSE
```

### Setup and Installation

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

Smoke tests:

```bash
npm run test:smoke
```

CSS custom property usage check:

```bash
npm run qa:css-vars
```

### Production Build

The production build runs image optimization, generates the `dist/` directory, builds `styles/main.min.css`, rewrites CSS references in HTML, minifies active scripts, and copies assets plus metadata files.

```bash
npm run build
```

Preview the `dist/` directory:

```bash
npm run preview:dist
```

The `npm run test` script is an alias for `npm run build`.

### Deployment

The repository contains static hosting configuration:

- `_headers` defines security headers, CSP, and cache rules for `/assets/*` and HTML files.
- `_redirects` handles slash redirects for public subpages, asset paths, and the `/* /index.html 200` fallback.
- `robots.txt` and `sitemap.xml` point to the canonical domain `https://saas-pr02-fleetops.netlify.app/`.

The publishable build artifact is the `dist/` directory.

### Accessibility

The code implements specific accessibility elements:

- skip link to `#main-content`;
- hidden `role="status"` region for route changes;
- toast live regions: `role="status"` and `role="alert"`;
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
- `robots.txt`;
- `sitemap.xml`;
- `noindex, follow` for `404.html`;
- favicons, Apple touch icon, and app manifest.

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

### Project Maintenance

- Startup logic and service worker registration live in `scripts/main.js`.
- Routing, demo route protection, and scroll reset live in `scripts/router.js`.
- Demo data lives in `scripts/data/seed.js`.
- Local store, preferences, domain data, and offline queue live in `scripts/state/store.js`.
- Demo role permissions live in `scripts/core/permissions.js`.
- Application views live in `scripts/ui/views/`.
- Shared UI components live in `scripts/ui/components/`.
- Source styles are modular in `styles/src/`, while `styles/main.css` only imports them.
- The image pipeline is documented in `IMAGE-ASSET-PIPELINE-MAP.md` and implemented in `optimize-images.js`.
- Audit notes live in `AUDIT.md`, `audit-resolved.md`, and `improvements.md`.

### License

The project is marked as `UNLICENSED` in `package.json` and `LICENSE`. The code is proprietary, reserved for Kamil Król / KP_Code Digital Studio, and provided for portfolio, reference, and code review purposes.
