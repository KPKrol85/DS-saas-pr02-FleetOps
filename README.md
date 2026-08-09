# FleetOps

## PL

### Przegląd projektu

FleetOps to statyczny, frontend-only projekt demonstracyjny typu SaaS dla operacji transportowych i flotowych. Repozytorium zawiera publiczną stronę marketingową, statyczne podstrony informacyjne oraz hash-routowany panel demo działający na lokalnych danych przykładowych.

Projekt jest częścią portfolio KP_Code Digital Studio i nie zawiera własnego backendu, bazy danych, realnej autoryzacji ani produkcyjnych integracji z systemami zewnętrznymi. Jedynym wyjściem poza przeglądarkę jest publiczny formularz kontaktowy, którego zgłoszenia przyjmuje Netlify Forms — usługa dostawcy hostingu, a nie backend napisany w tym projekcie.

### Kluczowe funkcje

- Publiczne strony: landing page, produkt, funkcje, cennik, o nas, kontakt, bezpieczeństwo, kariera, polityka prywatności, regulamin, polityka cookies oraz strona 404.
- Publiczny formularz kontaktowy obsługiwany przez Netlify Forms: wykrywanie formularza ze statycznego HTML, wysyłka AJAX na tym samym origin, honeypot antyspamowy, stan wysyłania oraz komunikat sukcesu wyłącznie po potwierdzonej odpowiedzi dostawcy.
- Panel demo pod trasami `#/app`, `#/app/orders`, `#/app/fleet`, `#/app/drivers`, `#/app/reports` i `#/app/settings`.
- Demo logowania zapisujące stan lokalnie w przeglądarce, z powrotem do żądanej trasy po zalogowaniu.
- Lokalne role demo: administrator, dyspozytor i kierowca, z ograniczeniami akcji w module uprawnień.
- Dane przykładowe dla zleceń, pojazdów, kierowców, aktywności, alertów i raportów.
- Lokalne operacje na zleceniach, flocie i kierowcach: dodawanie, edycja, usuwanie, filtrowanie, sortowanie, paginacja typu „załaduj więcej” i szczegóły rekordu.
- Ustawienia interfejsu: motyw jasny/ciemny, tryb kompaktowy, zakres dashboardu, preferencje list i reset danych demo.
- Eksport raportów do pliku JSON. Eksport CSV zleceń jest celowo wyłączony w wersji demo.
- Responsywna nawigacja, dropdowny, modale, drawer szczegółów rekordu, toasty i akordeony.
- Wskaźnik statusu online/offline; operacje na zleceniach, flocie i kierowcach są w trybie offline odrzucane z jasnym komunikatem, a nie kolejkowane.
- Service worker dla nawigacji publicznych tras i assetów statycznych.

### Stack technologiczny

Runtime:

- HTML, CSS i Vanilla JavaScript bez frameworka.
- Kod uruchomieniowy jest grafem modułów ES ładowanym przez pojedyncze wejście `<script type="module" src="/scripts/main.js">`.
- Hash routing dla części aplikacyjnej.
- `localStorage` i `sessionStorage` dla lokalnego stanu demo.
- Service Worker API.
- Web App Manifest.

Tooling:

- Node.js / npm.
- Vite jako główne narzędzie developmentu, budowania i podglądu produkcyjnego, skonfigurowane jako aplikacja wielostronicowa (MPA).
- `sharp` do generowania obrazów AVIF/WebP/JPG z plików źródłowych.
- Playwright do testów smoke.

### Architektura

- Publiczne podstrony są osobnymi statycznymi dokumentami `index.html` w katalogach tras, a każdy dokument zawiera własny header, footer i treść strony. `scripts/main.js` inicjalizuje wspólne zachowanie stron publicznych na tym istniejącym markupie, a `scripts/ui/layoutLanding.js` odpowiada za wspólne interakcje warstwy publicznej (motyw, nawigacja mobilna, menu zasobów, stan scrolla headera, akordeony), a nie za renderowanie dokumentu.
- Panel demo działa w `index.html`. `scripts/router.js` obsługuje hash routing, guard tras `#/app`, zapamiętanie żądanej trasy oraz reset scrolla i `aria-current`.
- `scripts/state/store.js` jest centralnym store stanu z zapisem do `localStorage`. Udostępnia też API nasłuchu zmian (`FleetStore.onChange`), z którego obecnie nie korzysta żaden moduł uruchomieniowy. `scripts/data/seed.js` dostarcza dane początkowe.
- Widoki aplikacji są w `scripts/ui/views/`, powłoka panelu w `scripts/ui/layoutApp.js`, a wspólne komponenty w `scripts/ui/components/`.
- Uprawnienia ról demo są zamknięte w `scripts/core/permissions.js`.
- Zależności między modułami są jawne: każdy plik w `scripts/` eksportuje swoje API i importuje to, czego używa, zamiast polegać na kolejności skryptów. Moduły publikują swoje nazwy również na `window` (`FleetStore`, `FleetUI`, `Toast`, `FleetRouter` i pozostałe) — to celowo zachowany kontrakt wewnętrzny, a nie mechanizm ładowania.
- CSS jest modułowy: `styles/main.css` importuje numerowane pliki z `styles/src/`. Vite przetwarza to wejście przez znacznik `<link>` w HTML i emituje z niego jeden zbundlowany, zminifikowany arkusz z hashem w nazwie w `dist/assets/`.
- `public/` zawiera pliki statyczne produkcyjne (assety, `sw.js`, `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`). Vite kopiuje je do `dist/` bez zmiany nazw, więc ich adresy produkcyjne pozostają niezmienione.

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
├── public/                     # pliki statyczne kopiowane 1:1 do dist/
│   ├── assets/                 # favicony, font, ikony, logo, obrazy, OG, screenshoty
│   ├── sw.js                   # service worker
│   ├── _headers                # nagłówki dla statycznego hostingu
│   ├── _redirects              # przekierowania routingu
│   ├── robots.txt
│   └── sitemap.xml
├── assets/img-src/             # źródła obrazów (wejście builda obrazów, poza dist/)
├── tests/smoke.spec.js         # testy Playwright
├── vite.config.js              # konfiguracja Vite: wejścia MPA, porty, dist/
├── optimize-images.js          # pipeline optymalizacji obrazów
├── playwright.config.js        # konfiguracja testów
├── CHANGELOG.md
└── LICENSE
```

### Instalacja

Projekt ma zależności developerskie opisane w `package.json` i `package-lock.json`.

```bash
npm ci
```

### Development lokalny

Uruchomienie serwera developerskiego Vite na plikach źródłowych, bez minifikacji:

```bash
npm run dev
```

Adres serwera developerskiego:

```text
http://127.0.0.1:8181
```

Port jest ustawiony jako `strictPort` — jeśli jest zajęty, serwer kończy się czytelnym błędem zamiast po cichu wybierać inny port. Alternatywnie dostępny jest plik `start-local-server.bat`, który uruchamia `npm run dev`.

Service worker nie jest rejestrowany w trybie developerskim, a wcześniej zainstalowany worker jest wyrejestrowywany, żeby nie serwował nieaktualnych modułów. Rejestracja `/sw.js` działa bez zmian w buildzie produkcyjnym.

Projekt należy uruchamiać przez serwer HTTP. Otwarcie plików bezpośrednio z dysku nie odzwierciedla działania ścieżek absolutnych, routingu ani service workera.

### Dostępne skrypty

- `npm run dev` — serwer developerski Vite na `http://127.0.0.1:8181`.
- `npm run build` — build produkcyjny Vite do katalogu `dist/`.
- `npm run preview` — podgląd zbudowanego `dist/` na `http://127.0.0.1:8182`.
- `npm run preview:dist` — alias zgodności dla `npm run preview`.
- `npm run optimize:images` — generuje warianty obrazów przez `optimize-images.js`; jest to świadoma operacja utrzymaniowa, nieuruchamiana przez build ani testy.
- `npm run test` — weryfikacja bez zapisu do plików źródłowych: `qa:css-vars` i testy smoke.
- `npm run test:smoke` — uruchamia testy Playwright.
- `npm run qa:css-vars` — sprawdza definicje i użycia zmiennych CSS w `styles/src/`.

### Build produkcyjny

Build produkcyjny wykonuje Vite. Każdy utrzymywany dokument HTML jest osobnym wejściem builda, więc `dist/` odwzorowuje strukturę wdrożonych adresów (`index.html`, `404.html`, `product/index.html` i pozostałe podstrony). Vite tworzy `dist/` od zera, bunduje i minifikuje CSS oraz JavaScript do plików z hashem w nazwie w `dist/assets/`, a zawartość `public/` kopiuje bez zmiany nazw. Build nie regeneruje obrazów.

```bash
npm run build
```

Podgląd zbudowanego katalogu `dist/`:

```bash
npm run preview
```

Podgląd produkcyjny działa pod `http://127.0.0.1:8182` i jest trybem osobnym od `npm run dev`.

Katalog `dist/` jest wyjściem generowanym. Nie należy edytować go ręcznie — zmiany wprowadza się w plikach źródłowych i regeneruje build.

### Testy i walidacja

```bash
npm run test:smoke
npm run qa:css-vars
```

- Testy smoke są w `tests/smoke.spec.js` i uruchamiane przez Playwright.
- `playwright.config.js` używa projektu `Desktop Chrome`, `baseURL` `http://127.0.0.1:8182`, domyślnie blokuje service workery w testach i startuje serwer komendą `npm run build && npm run preview`, więc testy smoke sprawdzają zbudowany artefakt produkcyjny.
- `scripts/qa/check-css-vars.js` analizuje statycznie pliki w `styles/src/` pod kątem zdefiniowanych i używanych zmiennych CSS.

Repozytorium nie zawiera zapisanych wyników przebiegów testów.

### Wdrożenie

Repozytorium zawiera konfigurację dla statycznego hostingu:

- `_headers` definiuje nagłówki bezpieczeństwa, CSP oraz cache dla `/assets/*` i plików HTML.
- `_redirects` obsługuje slash redirects dla publicznych podstron oraz ścieżki assetów. Nie zawiera fallbacku typu SPA: publiczne podstrony są realnymi dokumentami, a aplikacja demonstracyjna działa w hashu, więc nieznane adresy nie są przepisywane na `/index.html` i trafiają do obsługi strony błędu `404.html`.
- `robots.txt` i `sitemap.xml` wskazują kanoniczną domenę `https://saas-pr02-fleetops.netlify.app/`.
- Publiczny formularz kontaktowy w `contact/index.html` jest wykrywany przez Netlify Forms podczas wdrożenia na podstawie statycznego HTML: `name="fleetops-contact"`, `method="POST"`, `data-netlify="true"` oraz ukryte pole `form-name`. Włączenie wykrywania formularzy i konfiguracja powiadomień o zgłoszeniach należą do konta Netlify i nie są częścią repozytorium.

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

- `public/assets/favicon/site.webmanifest` definiuje `name`, `short_name`, `start_url` `/`, `scope` `/`, `display` `standalone`, ikony 192/512 (w tym warianty maskable), screenshoty oraz skróty do dashboardu, floty i zleceń.
- `scripts/main.js` rejestruje `/sw.js` po zdarzeniu `load`, gdy przeglądarka wspiera Service Worker API. Rejestracja jest pomijana w trybie developerskim Vite.
- `sw.js` używa wersjonowanego cache (`fleetops-v1.10`), precache’uje powłokę aplikacji i publiczne trasy, a przy aktywacji usuwa starsze cache z prefiksem `fleetops-`.
- Nawigacje działają w strategii network-first: spełniona odpowiedź HTTP jest zwracana do przeglądarki bez zmian, również gdy jest to odpowiedź błędu (np. `404`) lub przekierowanie, i taka odpowiedź nie trafia do cache. Fallback do cache uruchamia się dopiero wtedy, gdy samo żądanie sieciowe zostanie odrzucone; przy braku wpisu w cache zwracany jest błąd sieci. Assety statyczne działają w strategii stale-while-revalidate.
- Wersjonowanie cache w `sw.js` jest utrzymywane ręcznie.
- Poza cache'em tras i assetów, tryb offline nie jest w żaden sposób symulowany dla zapisu danych: próba dodania, edycji lub usunięcia zlecenia, pojazdu lub kierowcy w trybie offline jest odrzucana, a użytkownik widzi komunikat, że zmiana nie została zapisana i trzeba ją powtórzyć po przywróceniu połączenia (`scripts/state/store.js`).

### Wydajność

W projekcie widoczne są następujące mechanizmy wydajnościowe:

- lokalny font Inter w formacie WOFF2 z `font-display: swap`;
- preload fontu w HTML;
- obrazy hero w wariantach AVIF, WebP i JPG;
- jawne wymiary obrazu hero oraz `fetchpriority="high"` dla głównej grafiki;
- build CSS do jednego zbundlowanego, zminifikowanego arkusza z hashem w nazwie;
- bundling i minifikacja JavaScriptu przez Vite w buildzie produkcyjnym;
- cache assetów statycznych przez service worker i nagłówki `_headers`;
- wykluczenie źródeł obrazów `assets/img-src/` z katalogu `dist/`.

Repozytorium nie zawiera zmierzonych wyników wydajności.

### Dane i trwałość stanu

- Dane początkowe są statyczne i pochodzą z `scripts/data/seed.js`.
- Stan demo jest zapisywany w `localStorage` przez opakowanie w `scripts/utils/storage.js`. Implementacja zapisuje dziesięć kluczy: dziewięć z nich zapisuje `Store.persist()` w `scripts/state/store.js`, dziesiąty zapisuje `scripts/router.js`.
- Preferencje interfejsu: `fleet-theme`, `fleet-compact`, `fleet-dashboard-range`, `fleet-filters`, `fleet-list-prefs-v1`.
- Lokalny stan tożsamości demo: `fleet-auth`, `fleet-current-user`.
- Dane demo: `fleet-domain-v1`, `fleet-activity-v1`.
- Routing: `fleet-last-route` — zapisywany przez `scripts/router.js` przy każdym wejściu na trasę `/app*` i usuwany przy wylogowaniu; żaden moduł uruchomieniowy obecnie go nie odczytuje.
- `sessionStorage` przechowuje wyłącznie żądaną trasę powrotu (`auth:returnTo`) używaną przez guard w `scripts/router.js`; wpis jest tymczasowy i jest usuwany zaraz po zalogowaniu.
- Reset danych demo (`FleetStore.resetDemo()`) przywraca dane domenowe i historię aktywności do stanu z `scripts/data/seed.js` oraz ustawia preferencje na wartości domyślne: motyw jasny, tryb kompaktowy wyłączony, zakres dashboardu 30 dni, domyślne filtry i preferencje list. Stan logowania demo i aktualny użytkownik są zachowywane, a `fleet-last-route` pozostaje poza zakresem resetu.
- Klucze `fleet-offline-queue` i `fleet-intended-route` nie są przez implementację zapisywane — występują wyłącznie w kodzie usuwającym nieaktualne dane z przeglądarki.
- Raporty można wyeksportować lokalnie do pliku `fleetops-reports.json`.
- Projekt nie ma kont użytkowników, własnego backendu, bazy danych ani synchronizacji między urządzeniami. Dane demo istnieją wyłącznie w przeglądarce; poza nimi opuszczają ją tylko zgłoszenia z publicznego formularza kontaktowego, przekazywane do Netlify Forms.

### Utrzymanie projektu

- Logika startowa i rejestracja service workera są w `scripts/main.js`.
- Routing, ochrona tras demo i reset scrolla są w `scripts/router.js`.
- Dane demo są w `scripts/data/seed.js`.
- Lokalny store, preferencje, dane domenowe i status online/offline są w `scripts/state/store.js`.
- Uprawnienia ról demo są w `scripts/core/permissions.js`.
- Widoki aplikacji są w `scripts/ui/views/`, a wspólne komponenty UI w `scripts/ui/components/`.
- Style źródłowe są modułowe w `styles/src/`, a `styles/main.css` tylko je importuje.
- Pipeline obrazów jest zaimplementowany w `optimize-images.js`; pliki źródłowe leżą w `assets/img-src/`, a warianty wynikowe w `public/assets/img/`. Uruchamia się go świadomie przez `npm run optimize:images`.
- Konfiguracja builda — wejścia MPA, porty developmentu i podglądu, katalog wyjściowy — jest w `vite.config.js`.
- Katalog `dist/` jest generowany przez Vite i nie powinien być edytowany ręcznie.
- Istotne zmiany projektu są opisywane w [`CHANGELOG.md`](CHANGELOG.md).

### Licencja

Projekt jest objęty Własnościową Licencją Projektu KP_CODE (wersja 1.0). Pełne i wiążące warunki znajdują się w pliku [`LICENSE`](LICENSE), do którego odsyła również pole `license` w `package.json`. Kod jest własnościowy, zastrzeżony dla Kamil Król — KP_Code, i udostępniony do celów portfolio, referencyjnych oraz code review. Licencja projektu nie zastępuje odrębnych licencji materiałów zewnętrznych (bibliotek, zależności, fontów, ikon, grafik).

## EN

### Project Overview

FleetOps is a static, frontend-only SaaS-style demo project for transport and fleet operations. The repository contains a public marketing site, static informational subpages, and a hash-routed demo dashboard running on local sample data.

The project is part of the KP_Code Digital Studio portfolio and does not include a backend of its own, a database, real authentication, or production integrations with external systems. The one path that leaves the browser is the public contact form, whose submissions are received by Netlify Forms — a hosting provider service, not a backend written in this project.

### Key Features

- Public pages: landing page, product, features, pricing, about, contact, security, careers, privacy policy, terms, cookies policy, and 404 page.
- Public contact form handled by Netlify Forms: form detection from the static HTML, same-origin AJAX submission, an anti-spam honeypot, a submitting state, and a success message only after a confirmed provider response.
- Demo dashboard under `#/app`, `#/app/orders`, `#/app/fleet`, `#/app/drivers`, `#/app/reports`, and `#/app/settings`.
- Demo login that stores state locally in the browser and returns to the requested route after sign-in.
- Local demo roles: administrator, dispatcher, and driver, with action restrictions in the permissions module.
- Sample data for orders, vehicles, drivers, activity, alerts, and reports.
- Local operations for orders, fleet, and drivers: create, edit, delete, filter, sort, load-more pagination, and record details.
- Interface settings: light/dark theme, compact mode, dashboard range, list preferences, and demo data reset.
- JSON report export. Orders CSV export is intentionally disabled in the demo version.
- Responsive navigation, dropdowns, modals, record detail drawer, toasts, and accordions.
- Online/offline status indicator; mutations on orders, fleet, and drivers are rejected with a clear message while offline instead of being queued.
- Service worker for public route navigation and static assets.

### Tech Stack

Runtime:

- HTML, CSS, and Vanilla JavaScript with no framework.
- Runtime code is an ES module graph loaded from a single `<script type="module" src="/scripts/main.js">` entry.
- Hash routing for the application area.
- `localStorage` and `sessionStorage` for local demo state.
- Service Worker API.
- Web App Manifest.

Tooling:

- Node.js / npm.
- Vite as the primary development, build, and production preview tool, configured as a multi-page application (MPA).
- `sharp` for generating AVIF/WebP/JPG images from source files.
- Playwright for smoke tests.

### Architecture

- Public subpages are separate static `index.html` documents in route directories, and each document owns its own header, footer, and page content. `scripts/main.js` initializes the shared public-page behavior on that existing markup, and `scripts/ui/layoutLanding.js` owns the shared public-layer interactions (theme, mobile navigation, resources menu, header scroll state, accordions) rather than rendering the document.
- The demo dashboard runs in `index.html`. `scripts/router.js` handles hash routing, the `#/app` route guard, storing the requested route, and scroll and `aria-current` updates.
- `scripts/state/store.js` is the central state store with `localStorage` persistence. It also exposes a change-listener API (`FleetStore.onChange`) that currently has no runtime subscriber. `scripts/data/seed.js` provides the initial data.
- Application views live in `scripts/ui/views/`, the dashboard shell in `scripts/ui/layoutApp.js`, and shared components in `scripts/ui/components/`.
- Demo role permissions are contained in `scripts/core/permissions.js`.
- Module dependencies are explicit: every file in `scripts/` exports its API and imports what it uses, instead of relying on script order. Modules also publish their names on `window` (`FleetStore`, `FleetUI`, `Toast`, `FleetRouter`, and the rest) — a deliberately preserved internal contract, not a loading mechanism.
- CSS is modular: `styles/main.css` imports the numbered files from `styles/src/`. Vite processes that entry through the HTML `<link>` tag and emits a single bundled, minified, content-hashed stylesheet into `dist/assets/`.
- `public/` holds the production-static files (assets, `sw.js`, `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`). Vite copies them into `dist/` verbatim, so their production URLs are unchanged.

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
├── public/                     # static files copied verbatim into dist/
│   ├── assets/                 # favicons, font, icons, logos, images, OG, screenshots
│   ├── sw.js                   # service worker
│   ├── _headers                # static hosting headers
│   ├── _redirects              # routing redirects
│   ├── robots.txt
│   └── sitemap.xml
├── assets/img-src/             # image sources (build input, excluded from dist/)
├── tests/smoke.spec.js         # Playwright tests
├── vite.config.js              # Vite configuration: MPA entries, ports, dist/
├── optimize-images.js          # image optimization pipeline
├── playwright.config.js        # test configuration
├── CHANGELOG.md
└── LICENSE
```

### Installation

The project has development dependencies defined in `package.json` and `package-lock.json`.

```bash
npm ci
```

### Local Development

Run the Vite development server against the unminified source files:

```bash
npm run dev
```

The development server URL is:

```text
http://127.0.0.1:8181
```

The port is configured with `strictPort`, so an occupied port fails with a clear error instead of silently selecting another one. Alternatively, `start-local-server.bat` starts `npm run dev`.

The service worker is not registered during development, and any previously installed worker is unregistered so it cannot serve stale modules. Production registration of `/sw.js` is unchanged.

The project must be served over HTTP. Opening files directly from disk does not reflect absolute paths, routing, or service worker behavior.

### Available Scripts

- `npm run dev` — Vite development server on `http://127.0.0.1:8181`.
- `npm run build` — Vite production build into `dist/`.
- `npm run preview` — serves the built `dist/` on `http://127.0.0.1:8182`.
- `npm run preview:dist` — compatibility alias for `npm run preview`.
- `npm run optimize:images` — generates image variants through `optimize-images.js`; a deliberate maintenance operation that is never triggered by the build or the tests.
- `npm run test` — verification that does not rewrite source files: `qa:css-vars` plus the smoke tests.
- `npm run test:smoke` — runs the Playwright tests.
- `npm run qa:css-vars` — checks CSS custom property definitions and usages in `styles/src/`.

### Production Build

The production build is performed by Vite. Every maintained HTML document is its own build entry, so `dist/` mirrors the deployed URL structure (`index.html`, `404.html`, `product/index.html`, and the remaining subpages). Vite recreates `dist/` from scratch, bundles and minifies CSS and JavaScript into content-hashed files under `dist/assets/`, and copies the contents of `public/` verbatim. The build does not regenerate images.

```bash
npm run build
```

Preview the built `dist/` directory:

```bash
npm run preview
```

The production preview runs on `http://127.0.0.1:8182` and is a separate workflow from `npm run dev`.

The `dist/` directory is generated output. It should not be edited manually — changes are made in the source files and the build is regenerated.

### Testing and Validation

```bash
npm run test:smoke
npm run qa:css-vars
```

- Smoke tests live in `tests/smoke.spec.js` and run through Playwright.
- `playwright.config.js` uses the `Desktop Chrome` project, `baseURL` `http://127.0.0.1:8182`, blocks service workers during tests by default, and starts the server with `npm run build && npm run preview`, so the smoke suite exercises the built production artifact.
- `scripts/qa/check-css-vars.js` statically analyzes the files in `styles/src/` for defined and used CSS custom properties.

The repository does not contain recorded test run results.

### Deployment

The repository contains static hosting configuration:

- `_headers` defines security headers, CSP, and cache rules for `/assets/*` and HTML files.
- `_redirects` handles slash redirects for public subpages and asset paths. It contains no SPA-style fallback: the public subpages are real documents and the demo application runs in the hash, so unknown addresses are not rewritten to `/index.html` and are left to the `404.html` error-page handling.
- `robots.txt` and `sitemap.xml` point to the canonical domain `https://saas-pr02-fleetops.netlify.app/`.
- The public contact form in `contact/index.html` is detected by Netlify Forms at deploy time from the static HTML: `name="fleetops-contact"`, `method="POST"`, `data-netlify="true"`, and the hidden `form-name` field. Enabling form detection and configuring submission notifications belong to the Netlify account and are not part of the repository.

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

- `public/assets/favicon/site.webmanifest` defines `name`, `short_name`, `start_url` `/`, `scope` `/`, `display` `standalone`, 192/512 icons (including maskable variants), screenshots, and shortcuts to the dashboard, fleet, and orders.
- `scripts/main.js` registers `/sw.js` after the `load` event when the browser supports the Service Worker API. Registration is skipped in the Vite development mode.
- `sw.js` uses a versioned cache (`fleetops-v1.10`), precaches the app shell and public routes, and deletes older `fleetops-` caches on activation.
- Navigations use a network-first strategy: a fulfilled HTTP response is returned to the browser unchanged, including error responses such as `404` and redirects, and such responses are not cached. The cache fallback runs only when the network request itself fails; a cache miss then returns a network error. Static assets use stale-while-revalidate.
- Cache versioning in `sw.js` is maintained manually.
- Beyond route and asset caching, offline mode is not simulated for data writes in any way: attempting to create, edit, or delete an order, vehicle, or driver while offline is rejected, and the user sees a message that the change was not saved and must be repeated after connectivity returns (`scripts/state/store.js`).

### Performance

The project contains the following performance-related mechanisms:

- local Inter font in WOFF2 format with `font-display: swap`;
- font preload in HTML;
- hero images in AVIF, WebP, and JPG variants;
- explicit hero image dimensions and `fetchpriority="high"` for the primary image;
- CSS built into a single bundled, minified, content-hashed stylesheet;
- JavaScript bundling and minification through Vite in the production build;
- static asset caching through the service worker and `_headers`;
- exclusion of the `assets/img-src/` image sources from the `dist/` directory.

The repository does not contain measured performance scores.

### Data and State Persistence

- Initial data is static and comes from `scripts/data/seed.js`.
- Demo state is persisted in `localStorage` through the wrapper in `scripts/utils/storage.js`. The implementation writes ten keys: nine of them from `Store.persist()` in `scripts/state/store.js`, and the tenth from `scripts/router.js`.
- Interface preferences: `fleet-theme`, `fleet-compact`, `fleet-dashboard-range`, `fleet-filters`, `fleet-list-prefs-v1`.
- Local demo identity state: `fleet-auth`, `fleet-current-user`.
- Demo data: `fleet-domain-v1`, `fleet-activity-v1`.
- Routing: `fleet-last-route` — written by `scripts/router.js` on every entry into an `/app*` route and removed on logout; no runtime module currently reads it back.
- `sessionStorage` only holds the requested return route (`auth:returnTo`) used by the guard in `scripts/router.js`; the entry is temporary and is removed immediately after login.
- The demo data reset (`FleetStore.resetDemo()`) restores the domain data and the activity history to the state from `scripts/data/seed.js` and returns preferences to their defaults: light theme, compact mode off, a 30-day dashboard range, default filters and list preferences. The demo login state and the current demo user are preserved, and `fleet-last-route` stays outside the reset scope.
- The keys `fleet-offline-queue` and `fleet-intended-route` are not written by the implementation — they appear only in code that removes stale data from the browser.
- Reports can be exported locally to a `fleetops-reports.json` file.
- The project has no user accounts, backend of its own, database, or cross-device synchronization. Demo data exists only in the browser; the only thing that leaves it is a public contact form submission, which is passed to Netlify Forms.

### Project Maintenance

- Startup logic and service worker registration live in `scripts/main.js`.
- Routing, demo route protection, and scroll reset live in `scripts/router.js`.
- Demo data lives in `scripts/data/seed.js`.
- Local store, preferences, domain data, and online/offline status live in `scripts/state/store.js`.
- Demo role permissions live in `scripts/core/permissions.js`.
- Application views live in `scripts/ui/views/`, and shared UI components in `scripts/ui/components/`.
- Source styles are modular in `styles/src/`, while `styles/main.css` only imports them.
- The image pipeline is implemented in `optimize-images.js`; source files live in `assets/img-src/`, and the resulting variants in `public/assets/img/`. It is run deliberately through `npm run optimize:images`.
- Build configuration — MPA entries, development and preview ports, output directory — lives in `vite.config.js`.
- The `dist/` directory is generated by Vite and should not be edited manually.
- Significant project changes are recorded in [`CHANGELOG.md`](CHANGELOG.md).

### License

The project is covered by the KP_CODE Proprietary Project License (version 1.0). The full and binding terms are in the [`LICENSE`](LICENSE) file, which the `license` field in `package.json` also points to. The code is proprietary, reserved for Kamil Król — KP_Code, and provided for portfolio, reference, and code review purposes. The project license does not replace the separate licenses of third-party materials (libraries, dependencies, fonts, icons, graphics).
