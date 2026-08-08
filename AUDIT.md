# FleetOps — Final Technical Front-End Audit

**Audit date:** 2026-08-08
**Project type:** Static multi-page front-end site with a hash-routed browser-local demo application (vanilla HTML/CSS/JS, no framework, no bundler)
**Audit mode:** Final repository and implementation review
**Current readiness:** Needs important fixes

## 1. Executive assessment

FleetOps is a coherent, self-consistent static project. The layering is deliberate: eleven public documents plus `404.html`, a hash-routed demo area rendered into `#app`, a single owner for domain state (`scripts/state/store.js`), a permission module isolated from the views, a numbered CSS source set with one canonical entry point, a deterministic `dist/` build, and a substantial Playwright smoke suite. User-entered text is escaped consistently through one helper, storage access is wrapped in `try/catch`, and route changes drain a cleanup registry. Documentation is unusually evidence-based and correctly declines to claim an active deployment.

The project's main weakness is not architecture but residue and honesty of the surface. An earlier hash-routed page model was never removed: `scripts/ui/marketingPages.js` and `renderLanding()` still duplicate all eleven public pages, but `scripts/main.js` redirects those hashes before the router can reach them, so roughly 104 KB of unreachable JavaScript ships on every page and already disagrees with the live markup it duplicates. The README still describes those unreachable renderers as the source of truth for the header, footer and marketing content.

Three defect groups are worth fixing before this is presented as finished work: accessibility (the primary navigation carries mobile-drawer ARIA state at desktop widths on both the site and the app shell, and the app shell has no `<main>` landmark, so the skip link resolves to nothing on every `#/app` route); content integrity (the contact form confirms a reply that no code path can deliver, contradicting the project's own privacy page, and the public pages carry attributed testimonials and precise trust metrics that nothing supports); and correctness details (the project's own `qa:css-vars` gate currently fails, queued offline actions are discarded on reconnect, `_redirects` makes `404.html` unreachable, and a one-pixel breakpoint gap at exactly 1024 px leaves the app with no navigation).

No blocker prevents the project from building or running. Core flows — routing, guard, CRUD, permissions, persistence, theming — are implemented consistently and are covered by the smoke suite. With the P1 items resolved this is a credible portfolio piece; as it stands it should not be presented as final.

## 2. Audit scope and verification

### Areas inspected

- All twelve HTML documents: `index.html`, `404.html`, and the ten route directories (`product`, `features`, `pricing`, `about`, `contact`, `security`, `careers`, `privacy`, `terms`, `cookies`)
- All 26 files under `scripts/` — entry, router, store, seed, permissions, utilities, six shared components, seven views, two layouts, marketing renderers, QA script
- All eleven CSS sources under `styles/src/` plus the `styles/main.css` entry point
- Build and asset pipeline: `build-dist.js`, `optimize-images.js`, `postcss.config.js`, `package.json` scripts, `package-lock.json`
- Service worker and PWA contract: `sw.js`, `assets/favicon/site.webmanifest`, registration in `scripts/main.js`
- Deployment and SEO configuration: `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, canonical and social metadata across all documents
- Testing: `playwright.config.js`, `tests/smoke.spec.js`, `test-results/`
- Documentation and licensing: `README.md`, `CHANGELOG.md`, `LICENSE`, `package.json` metadata
- Repository state: tracked file set, working tree, commit history

### Verification performed

- `node scripts/qa/check-css-vars.js` (`npm run qa:css-vars`) — executed and failed; exit code 1, two unresolved custom-property usages reported
- `node --check` across all 29 JavaScript files (`scripts/**`, `sw.js`, `build-dist.js`, `optimize-images.js`) — executed and passed; syntax only, no behavioural verification
- `git status --short`, `git diff --stat`, `git log --oneline`, `git ls-files` — executed; working tree carries three modified files, `dist/` is untracked, `test-results/.last-run.json` is tracked
- Static inspection of every file listed above, including cross-referencing of every `render*` entry point against its call sites and of every documented claim against its implementation
- Static reachability analysis of `scripts/main.js` → `scripts/router.js` route dispatch

### Verification limitations

- `node_modules/` is absent, so `npm run test:smoke` was **not executed**. No statement in this audit asserts that any Playwright test passes.
- `npm run build` was **not executed**. It invokes `optimize:images`, which overwrites tracked files in `assets/img/`, and the audit is read-only outside `AUDIT.md`. The build was inspected statically only; this audit does not claim the build succeeds.
- No browser or assistive-technology environment was available. Responsive behaviour, focus order, live-region announcement, service-worker runtime behaviour and offline navigation were **not executed**. Findings derived from CSS and DOM structure alone are labelled as source-visible risks unless the outcome is deterministic from the code.
- Contrast compliance was not fully verified because reliable computed-style analysis was not available.
- No live URL was supplied and no deployment was inspected. Statements about `_redirects` and `_headers` describe the committed configuration, not observed production behaviour.

## 3. Verified strengths

- Single escaping helper applied consistently wherever record data reaches the DOM — `scripts/utils/dom.js:22-32` defines `escapeHtml`, and every data-rendering view uses it (for example `scripts/ui/views/driversView.js:455-473`, `scripts/ui/views/ordersView.js`, `scripts/ui/layoutApp.js:12-19`); `tests/smoke.spec.js:594-640` asserts that HTML-like input stays inert.
- Keyboard-complete dialog patterns implemented once and reused: focus trap, `Escape`, focus restoration and `aria-labelledby` in `scripts/ui/components/modal.js:18-112`; `aria-expanded` synchronisation, outside-click close, `Escape` and focus return in `scripts/ui/components/dropdown.js:5-67`.
- Defensive initialisation throughout: optional-chaining guards before every cross-module call in `scripts/main.js:101-169`, a `try/catch` storage wrapper in `scripts/utils/storage.js:1-25`, and a cleanup registry drained on every route change (`scripts/utils/cleanup.js:9-19`, invoked at `scripts/router.js:220`).
- Clear domain-state ownership with seed-versus-persisted separation, shape validation before adopting stored data, and ID normalisation — `scripts/state/store.js:27-44,110-127`.
- Role logic isolated from presentation, with denial messages and an activity trail rather than silent no-ops — `scripts/core/permissions.js:54-119`.
- Honest demo boundaries stated in the interface: CSV export is disabled with an explanatory `title` rather than failing silently (`scripts/ui/views/ordersView.js:603-607`), and the login card states that data stays in the browser (`scripts/router.js:42`).
- Build script fails loudly rather than emitting a partial artifact — missing sources, missing HTML entries, unreplaceable stylesheet links and empty Terser output all throw, and `ensureInsideRoot` guards the destructive `dist/` reset (`build-dist.js:48-61,67-69,125-127,160-168,192-194`).
- A project-specific validation script exists and demonstrably catches real defects rather than being decorative — `scripts/qa/check-css-vars.js`.
- Security-relevant hosting configuration is present and specific: frame denial, nosniff, referrer policy, permissions policy, HSTS and a self-only CSP (`_headers:1-7`). No `.env`, credential, token or key material is tracked, and runtime code contains no `console.log`, `debugger`, `TODO` or `FIXME` (logging appears only in build tooling).
- Motion and focus preferences are treated as first-class: 31 `:focus-visible` rules and 13 `prefers-reduced-motion` blocks across `styles/src/`, plus a motion-safe scroll helper used by navigation (`scripts/utils/dom.js:34-39`).
- The Playwright suite present in the repository is broad for a project of this size — per-route metadata, legacy hash redirects, console-error assertions, live-region roles, scroll reset, drawer geometry on mobile, CRUD error association and export behaviour (`tests/smoke.spec.js`). Present and configured; not executed during this audit.
- Documentation avoids unsupported claims: `README.md` explicitly states that the repository contains deployment configuration but no confirmation of an active production environment, declares no WCAG conformance, and records no measured performance results.

## 4. P0 — Critical risks

None detected.

## 5. P1 — Important issues worth fixing next

### [P1-01] Primary navigation keeps mobile-drawer ARIA state at desktop widths

- **Classification:** Defect
- **Affected area:** Accessibility, navigation (public site and demo application)
- **Evidence:** `index.html:108`; `scripts/ui/layoutLanding.js:33,278,291`; `scripts/ui/layoutApp.js:56-59,245`; `styles/src/08-header.css:232,247-249`; `styles/src/06-app.css:457-470`
- **Current behavior:** Both navigation containers are authored as mobile drawers with `role="dialog"`, `aria-modal="true"` and `aria-hidden="true"`, and the JavaScript only flips `aria-hidden` on drawer open/close. At `min-width: 1025px` the CSS makes both permanently visible — `.site-header__drawer` becomes `position: static` and `.sidebar` becomes `position: sticky; visibility: visible` — while the drawer state remains closed, so `aria-hidden="true"` stays applied. `renderAppShell` re-applies `aria-hidden="true"` on every route render.
- **Impact:** On desktop the site's main navigation and the application sidebar are visible and keyboard-focusable but excluded from the accessibility tree, and are additionally announced as a modal dialog. On the public pages the footer still offers an equivalent route set, so the loss is partial; inside `#/app` the sidebar is the only navigation, so screen-reader users have no route between application views. Focusable content inside an `aria-hidden` subtree is also an internally inconsistent state for keyboard users.
- **Recommended direction:** Make the drawer semantics viewport-conditional: apply `role="dialog"`, `aria-modal` and `aria-hidden` only while the container is actually operating as an overlay, and remove them (or never apply them) at the width where the same element renders as static navigation.
- **Verification criteria:** At a viewport of 1280 px, `#mobileNav` and `#appDrawer` expose no `aria-hidden="true"` and no modal dialog semantics, and every navigation link is reachable in the accessibility tree; at 390 px the closed drawer is still hidden from it.

### [P1-02] Application shell has no `main` landmark, so the skip link has no target on every `#/app` route

- **Classification:** Defect
- **Affected area:** Accessibility, document structure
- **Evidence:** `index.html:86,88`; `scripts/ui/layoutApp.js:87,192-200`
- **Current behavior:** The skip link `<a class="skip-link" href="#main-content">` lives outside `#app` and therefore persists across all routes. `renderAppShell` replaces the contents of `#app` with a structure built entirely from `div` elements (`.app-shell`, `.app-main`, `.app-content`); no element carries `id="main-content"` and no `<main>` element is emitted. The static public documents and `renderLogin` do provide `#main-content`, so the gap is specific to the six `#/app` routes and the in-app not-found view.
- **Impact:** On every application route the first focusable control is a skip link that navigates nowhere and moves focus nowhere, and the application content is not exposed as a main landmark, removing the primary landmark-navigation shortcut for screen-reader users.
- **Recommended direction:** Emit the application content region as a `main` element carrying `id="main-content"` inside the app shell, matching the contract the static pages and the login view already satisfy.
- **Verification criteria:** On `#/app`, `#/app/orders` and the in-app not-found route, a single `main` landmark with `id="main-content"` exists and activating the skip link moves focus into it.

### [P1-03] Unreachable duplicate page renderers still ship and have already drifted from the live markup

- **Classification:** Maintenance risk
- **Affected area:** Architecture, source-of-truth ownership, page weight
- **Evidence:** `scripts/main.js:2-38,110-118`; `scripts/router.js:1-26,237-302`; `scripts/ui/marketingPages.js:46,207,312,405,428,451,542,702,898,1125,1356-1365`; `scripts/ui/layoutLanding.js:375-619`
- **Current behavior:** `redirectLegacyPublicHash` rewrites every public hash to its static URL and `isDynamicHash` admits only `#/login`, `#/app` and `#/app/*`, so `FleetRouter.routeTo` can never receive a public path. Consequently the router cases for `/`, `/about`, `/contact`, `/product`, `/features`, `/pricing`, `/security`, `/careers`, `/privacy`, `/terms` and `/cookies`, the `renderLanding()` fallback, and `renderInfoPage()` (defined but never called anywhere) are unreachable. The functions they call — the whole of `scripts/ui/marketingPages.js` (76 KB) and `renderLanding`/`renderLandingHeader`/`renderLandingFooter` in `scripts/ui/layoutLanding.js` (28 KB) — duplicate the markup of the eleven static documents. The copies have already diverged: the static pages use root-relative asset paths (`index.html:94`) while the renderers emit relative ones (`scripts/ui/layoutLanding.js:24`). `applyAriaCurrent` also still queries `.footer-links a` (`scripts/router.js:120`), a class that exists nowhere in the project. All twelve documents load all 25 scripts, so roughly 104 KB of the ~270 KB unminified script payload is unreachable on every page, and `build-dist.js` minifies it into `dist/` as well.
- **Impact:** Two parallel definitions of every public page must be kept in step by hand with no mechanism enforcing it, and the reachable one is not the obvious one — a maintainer editing `marketingPages.js` would see no effect on the site. Every visitor downloads and parses code that can never run.
- **Recommended direction:** Decide which page model is canonical. Given that `main.js` already redirects all public hashes to static URLs, remove the unreachable renderers and their router cases, keep only what the static pages actually call (`initLandingShell`, the theme helpers, `bindLogoScroll`), and drop the dead `.footer-links` selector.
- **Verification criteria:** No `render*Page`, `renderLanding` or `renderInfoPage` definition remains without a reachable call site; the public pages render unchanged; the per-page script payload drops by the removed amount.

### [P1-04] README describes the unreachable renderers as the source of truth for shared layout and marketing content

- **Classification:** Documentation mismatch
- **Affected area:** Documentation, maintenance
- **Evidence:** `README.md:47,49` and `README.md:285,287`; `index.html:91-140,362-462`; `product/index.html:52-101,270-370`
- **Current behavior:** The Architecture section states that the shared header and footer are rendered in `scripts/ui/layoutLanding.js` and marketing subpage content in `scripts/ui/marketingPages.js`, and that the store is a central state store "with subscriptions". In the current implementation each static document contains its own inline header, footer and page content, the named renderers are unreachable (see P1-03), and `FleetStore.onChange` has no subscriber anywhere in the repository.
- **Impact:** The single document intended to orient a maintainer or reviewer points them at files that have no runtime effect, which is the most likely route to editing the wrong source and to misjudging the project's architecture during review.
- **Recommended direction:** Rewrite the Architecture bullets to describe the model the code actually executes — per-route static documents owning their own shell markup, with JavaScript limited to shell behaviour and the demo application — and drop or qualify the subscription claim.
- **Verification criteria:** Every file named in the Architecture section has a reachable runtime role matching the description, and no described mechanism lacks an implementation.

### [P1-05] Contact form confirms a reply that no code path can deliver, contradicting the project's own privacy page

- **Classification:** Content integrity risk
- **Affected area:** Public content, forms, privacy disclosure
- **Evidence:** `scripts/main.js:65-79`; `contact/index.html:120,147,150`; `privacy/index.html:193`
- **Current behavior:** `bindStaticContactForm` calls `preventDefault`, resets the form and shows the toast "Dziękujemy! Wkrótce się odezwiemy." The form has no `action`, no submission target and no delivery mechanism; the entered name, business e-mail, fleet size and message are discarded. The page states "Zostaw dane, a odezwiemy się w ciągu 1 dnia roboczego", and the FAQ repeats the one-working-day commitment. The consent line discloses that the form is part of a portfolio demo but not that nothing is transmitted. The privacy page states the opposite of the interface: the form "nie wysyła danych do produkcyjnego backendu FleetOps", while also describing the message data as processed in order to reply.
- **Impact:** A visitor is given an explicit success confirmation and a response deadline for a message that was never delivered, and the two public documents contradict each other on whether the data is transmitted and processed. This is the project's only personal-data collection point, so the mismatch carries trust and disclosure risk disproportionate to its size.
- **Recommended direction:** Align the three surfaces on one truth. Either give the form a real destination, or state on the form itself that the submission is not delivered, replace the success wording with a demo-accurate confirmation, remove the response-time commitments, and reconcile the privacy-page description with the chosen behaviour.
- **Verification criteria:** The contact page, the success message and the privacy page make the same statement about whether a submission is transmitted, and no response-time commitment remains that the implementation cannot honour.

### [P1-06] Actions performed offline are queued in name only and are discarded on reconnect

- **Classification:** Defect
- **Affected area:** Demo application, state handling, offline behaviour
- **Evidence:** `scripts/state/store.js:347-357,359-369,377-386`
- **Current behavior:** Every mutating store method opens with `ensureOnline`, which, while `navigator.onLine` is `false`, calls `enqueueOfflineAction`, shows "Tryb offline - akcja dodana do kolejki" and returns `false`, so the create, edit or delete never runs. `enqueueOfflineAction` stores only an action label, an ID and a timestamp — never the payload — so the operation cannot be replayed. On reconnect, `setOnlineStatus` calls `clearOfflineQueue()` and shows "Połączenie przywrócone"; the queued entries are deleted and no action is ever applied.
- **Impact:** A user who fills in and submits a record while offline is told the action was queued, sees the queue cleared with a positive confirmation on reconnect, and never learns the work was lost. The message promises deferred processing the data model cannot support.
- **Recommended direction:** Either persist enough of each action to replay it and apply the queue on reconnect, or change the offline messaging to state plainly that the action was rejected and must be repeated once the connection returns, and stop presenting the reconnect as a completed sync.
- **Verification criteria:** After creating a record offline and returning online, either the record exists or the user has been told explicitly that it was not saved; no message implies deferred processing that does not occur.

### [P1-07] Undefined `--surface-muted` token breaks two settings controls and fails the project's own CSS gate

- **Classification:** Defect
- **Affected area:** Design tokens, settings view, project validation
- **Evidence:** `styles/src/06-app-components.css:317,386`; `styles/src/00-settings.css:18-19,123-124`; `npm run qa:css-vars` output
- **Current behavior:** `.setting-card__toggle-control` and `.setting-card__check-control` set `background: var(--surface-muted)`. No `--surface-muted` is defined in any theme block; the token set defines `--surface` and `--surface-2` only. With an invalid `var()` and no fallback, the `background` declaration is invalid at computed-value time and the controls fall back to a transparent background in both themes. `node scripts/qa/check-css-vars.js` reports both usages and exits 1 — the failure is present in `HEAD` as well as in the working tree.
- **Impact:** The compact-mode toggle track and the settings checkbox render without their intended fill, weakening the visual affordance of two interactive controls, and the repository's only automated CSS validation currently fails, so the check cannot serve as a gate until it is resolved.
- **Recommended direction:** Either define `--surface-muted` in both theme blocks alongside the existing surface tokens, or point the two declarations at an existing token.
- **Verification criteria:** `npm run qa:css-vars` exits 0, and both settings controls render with a visible surface fill in light and dark themes.

### [P1-08] Catch-all redirect makes `404.html` unreachable and turns every unknown URL into a soft 404

- **Classification:** Contract mismatch
- **Affected area:** Deployment routing, SEO, error handling
- **Evidence:** `_redirects:16`; `404.html:9,13,34-38,55`; `build-dist.js:24,26-27`
- **Current behavior:** `_redirects` ends with `/* /index.html 200`. Under that rule any path that is not an existing file or an earlier rule is served the landing document with HTTP 200, so the static error document is never reached even though it is authored, maintained, carries `noindex, follow` and a canonical URL, and is copied into `dist/` by the build. `404.html` also diverges from every other document in using relative `./assets/...` references for icons and the manifest and `href="./"` for its home link, which resolve incorrectly for any nested request path.
- **Impact:** Unknown URLs return a 200 landing page rather than an error, which is a soft 404 for crawlers and gives users no signal that the address was wrong; the maintained error page is dead weight in the repository and the build. The relative references mean the page would also render incorrectly at nested paths if it were reached.
- **Recommended direction:** Decide whether the catch-all fallback is required. The public routes are real directories and the demo application lives entirely in the hash, so a fallback is not needed for routing; scope or remove it so unmatched paths reach the error document, and switch the `404.html` asset and home references to root-relative paths.
- **Verification criteria:** A request to a non-existent path returns the error document with a 404 status, and that document loads its icons, manifest and home link correctly regardless of the requested path depth.

### [P1-09] At a viewport width of exactly 1024 px the application has no navigation and its content is confined to the sidebar column

- **Classification:** Defect
- **Affected area:** Responsive layout, application navigation
- **Evidence:** `styles/src/06-app.css:25-30,145-148,350-367,457-470`
- **Current behavior:** The breakpoints for the application shell are inconsistent. At `min-width: 1024px` the mobile top bar — the only host of `#drawerToggle` — is set to `display: none`, and `.app-shell` becomes a two-column grid (`240px 1fr`). The desktop sidebar rules are gated at `min-width: 1025px`, so at exactly 1024 px `.sidebar` retains its base state (`position: fixed; transform: translateX(-100%); visibility: hidden`). Being out of flow, it is not a grid item, so `.app-main` occupies the 240 px first column instead of the second. The landing header uses a single consistent 1025 px boundary and is unaffected.
- **Impact:** At exactly 1024 CSS pixels — a common tablet-landscape and windowed-desktop width — the demo application presents no route navigation at all (drawer toggle hidden, sidebar hidden) and renders its content into a 240 px column. The outcome is deterministic from the CSS; the visual severity was not confirmed in a browser.
- **Recommended direction:** Use one boundary for the whole application shell so that the sidebar becomes static at exactly the width where the mobile top bar is withdrawn.
- **Verification criteria:** At viewport widths of 1023 px, 1024 px and 1025 px the application always exposes exactly one usable navigation affordance, and `.app-main` occupies the content column at every width where the grid is active.

### [P1-10] Public pages present attributed testimonials and precise trust metrics that nothing in the project supports

- **Classification:** Content integrity risk
- **Affected area:** Public marketing content
- **Evidence:** `index.html:283-314` (`grid--testimonials`, company attributions at lines 291, 301, 311); `product/index.html:127-141` (`marketing-hero__stats`)
- **Current behavior:** The landing page carries three testimonials presented as quotations from named roles at named companies (CargoNord, FreshLine, AeroParts). The product page presents a "Wskaźniki zaufania" panel with specific figures — 96.8 % ETA accuracy, 99.6 % SLA availability, 12-minute alert response. The project has no backend, no customers and no measurement capability; the FAQ elsewhere states that panel data is sample data, and the README describes the project as a demonstration.
- **Impact:** Fabricated social proof and quantified performance claims on a public page create a trust problem the rest of the project carefully avoids, and they sit inconsistently beside the demo disclaimers on the same site. In portfolio review this reads as either careless placeholder content or misleading commercial claiming.
- **Recommended direction:** Either mark these sections unambiguously as illustrative sample content in the visible copy, or replace them with statements the project can support — for example, what the demo actually demonstrates instead of attributed quotations and measured percentages.
- **Verification criteria:** No public page presents a quotation attributed to a named organisation or a numeric performance figure without a visible indication that the content is illustrative.

## 6. P2 — Minor refinements

### [P2-04] Collapsed accordion panels remain exposed to assistive technology

- **Classification:** Source-visible risk
- **Affected area:** Accessibility, FAQ sections
- **Evidence:** `styles/src/03-components.css:444-452`; `scripts/ui/components/accordion.js:45-49`
- **Current behavior:** `syncState` sets `aria-expanded` correctly on the header and toggles an `open` class, but the collapsed state is expressed only as `max-height: 0` with `overflow: hidden`. The panel content is not hidden from the accessibility tree.
- **Impact:** A screen reader can encounter and read the answers of every FAQ item while its control reports `aria-expanded="false"`, so the collapsed state is announced but not honoured. Affected content is text-only, so no focusable element is stranded. Runtime announcement behaviour was not verified.
- **Recommended direction:** Make the collapsed state authoritative — for example by applying `hidden`, `display: none` or `visibility: hidden` in the closed state in addition to the height transition.
- **Verification criteria:** With an accordion item collapsed, its panel content is absent from the accessibility tree and is not reachable by screen-reader browse mode.

### [P2-05] Application top bar exposes a search field and an alerts button with no behaviour

- **Classification:** Defect
- **Affected area:** Demo application, interface honesty
- **Evidence:** `scripts/ui/layoutApp.js:92,110`
- **Current behavior:** The application top bar renders `<input aria-label="Szukaj" type="search" placeholder="Szukaj...">` and a button labelled "Alerty" with `aria-label="Otwórz alerty"`. Neither has a handler anywhere in the repository. The per-view search inputs in the orders, fleet and drivers tables are separate controls and do work.
- **Impact:** Two prominent, enabled controls in the persistent application chrome accept interaction and do nothing — the pattern the project handles correctly elsewhere by disabling CSV export with an explanatory title.
- **Recommended direction:** Give both controls behaviour, or apply the same honest treatment already used for CSV export — disabled with a title explaining the demo limitation.
- **Verification criteria:** Every enabled control in the application top bar performs an observable action, or communicates its unavailability.

### [P2-06] Demo reset destroys local data without confirmation, unlike every other destructive action

- **Classification:** Defect
- **Affected area:** Settings view, data safety
- **Evidence:** `scripts/ui/views/settingsView.js:113-119,224-230`; `scripts/state/store.js:314-345`
- **Current behavior:** A single click on "Resetuj" calls `FleetStore.resetDemo()` immediately. That clears eight storage keys — domain records, activity, list preferences, filters, theme, compact mode, dashboard range and the offline queue — and rebuilds from seed. Record deletion elsewhere in the application routes through a "Potwierdzenie usunięcia" modal.
- **Impact:** All locally created demo records and interface preferences are lost from one unconfirmed click, and the reset is broader than the card's description ("Przywraca dane demo do stanu początkowego") suggests. The loss is limited to browser-local demo data and is recoverable by re-entry.
- **Recommended direction:** Route the reset through the existing confirmation modal and state in the confirmation what will be cleared.
- **Verification criteria:** Activating "Resetuj" requires an explicit confirmation that names the data being cleared.

### [P2-07] README understates the persisted storage keys, the reset scope and the store's subscription model

- **Classification:** Documentation mismatch
- **Affected area:** Documentation, data and state description
- **Evidence:** `README.md:218` and `README.md:456`; `scripts/state/store.js:96-108,314-326,92-94`; `scripts/router.js:234`
- **Current behavior:** The README lists five `localStorage` keys. `persist()` additionally writes `fleet-theme`, `fleet-compact`, `fleet-dashboard-range`, `fleet-auth` and `fleet-filters`, and the router writes `fleet-last-route`. The documented reset scope (domain, activity, list preferences) is narrower than the implementation, which also clears theme, compact mode, dashboard range, filters and the offline queue. `onChange` is documented as a subscription mechanism and has no subscriber.
- **Impact:** The section a reader would consult to understand what the project stores in their browser, and what a reset removes, is materially incomplete — which matters more than usual because the privacy page relies on the same description.
- **Recommended direction:** Update the data-and-state section to list every key actually written and the full reset scope, and either remove the subscription claim or note that the API is currently unused.
- **Verification criteria:** Every key written by the implementation appears in the README list, and the documented reset scope matches `resetDemo`.

### [P2-08] Product page copy drops Polish diacritics in three places

- **Classification:** Content integrity risk
- **Affected area:** Public content, Polish-language copy
- **Evidence:** `product/index.html:127,148,173`
- **Current behavior:** The page renders "Wskazniki zaufania", "Jak to dziala" and "Raporty KPI i eksporty pomagaja zamykac petle operacyjna", while the surrounding copy on the same page and across the other ten public documents uses correct diacritics.
- **Impact:** Visible spelling errors on a public marketing page of a portfolio project, inconsistent with the standard of the rest of the site.
- **Recommended direction:** Correct the three strings to match the diacritic convention used everywhere else.
- **Verification criteria:** No public page contains Polish words with dropped diacritics.

## 7. Extra quality improvements

### Offline fallback document for failed navigations

- **Relevant area:** Service worker (`sw.js:118-130`).
- **Current evidence:** `networkFirstNavigation` returns `Response.error()` when the network fails and no cached entry matches, so an offline navigation to an unvisited, non-precached route surfaces the browser's own error page. The README describes the current strategy accurately, so this is not a documentation gap.
- **Potential value:** A branded offline document would make the service worker's behaviour legible to a reviewer and close the one path where the application currently hands control back to the browser.
- **Scope boundary:** Optional. The current behaviour matches the documented design and is not a defect.

### Precache the stylesheet and entry scripts alongside the documents

- **Relevant area:** Service worker precache (`sw.js:3-16`).
- **Current evidence:** `PRECACHE_URLS` covers the app shell and the ten public documents but no CSS, JavaScript or font. Those are cached only opportunistically by the stale-while-revalidate handler after a controlled navigation has requested them.
- **Potential value:** A first offline navigation to a precached-but-unvisited route would render styled and interactive rather than as unstyled markup.
- **Scope boundary:** Optional, and it would tie the precache list to the build output naming, so it is worth doing only alongside a decision about generated asset names.

### Extend the CSP with the directives the current policy leaves open

- **Relevant area:** Hosting headers (`_headers:7`).
- **Current evidence:** The policy sets `default-src`, `img-src`, `style-src`, `script-src`, `font-src` and `connect-src`, and framing is separately denied via `X-Frame-Options`. `base-uri`, `form-action` and `object-src` are not set and therefore fall back to permissive defaults rather than to `default-src`.
- **Potential value:** Closes the residual injection surface a self-only policy is otherwise designed to eliminate, at no functional cost for a static site.
- **Scope boundary:** Optional hardening. No current implementation depends on the omitted directives.

## 8. Current readiness conclusion

**Status:** Needs important fixes

No finding prevents the project from being built, served or navigated, and no critical risk was detected: there are no exposed secrets, no broken asset contract, no data-loss path outside browser-local demo data, and no failure that makes the project substantially unusable. The readiness status is set by ten P1 findings that a reviewer would reasonably expect to be closed before this is presented as finished work — two accessibility defects affecting navigation and landmark structure across the whole application area, two content-integrity issues on public pages, an architecture residue that ships an unreachable duplicate of every public page, a documentation section that points maintainers at that residue, a failing project-owned CSS gate, an unreachable error page, a deterministic layout break at one common viewport width, and an offline queue that silently discards user input.

None of these requires redesign or migration; each has a contained correction path within the existing architecture. Once they are resolved, the remaining risk is concentrated in verification that this audit could not perform — browser, assistive-technology, cross-browser, build and production checks — rather than in the implementation itself.

## 9. Senior rating

**Rating:** 6/10

Judged as a vanilla, frontend-only portfolio SaaS demo with no backend, the engineering foundations are above average for the category: one canonical source of domain state with validated rehydration, permissions isolated from views, consistent output escaping backed by a test that asserts it, reusable keyboard-complete dialog patterns, a cleanup registry that actually runs on route change, a build that fails loudly instead of emitting partial output, a project-specific validation script, real security headers, and documentation that resists overclaiming.

The rating is held at 6 by the number of confirmed current defects rather than by any single one. The accessibility contract is stated in the README but is not met where it matters most — the application's only navigation is hidden from assistive technology at desktop widths and its content region is not a landmark. The project's own CSS gate fails in `HEAD`. Roughly 40 % of the shipped script payload is unreachable duplicate markup that has already drifted, and the README documents that dead path as canonical. Public content asserts testimonials and metrics the project cannot support, and the contact form confirms a delivery it does not perform while the privacy page says the opposite. These are the kinds of issues a final review is meant to catch, and their combined presence is what separates the current state from the 8-plus range the underlying architecture would otherwise support. Verification limitations — no executed test suite, no browser or assistive-technology checks, no build run, no deployment inspection — mean the rating reflects source-verified quality and unresolved risk, not measured runtime behaviour.
