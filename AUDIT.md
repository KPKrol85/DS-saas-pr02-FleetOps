# FleetOps — Final Technical Front-End Audit

**Audit date:** 2026-08-10
**Project type:** Static multi-page front-end site with a hash-routed, browser-local demo application (vanilla HTML/CSS/JS as an ES module graph, no UI framework, built with Vite)
**Audit mode:** Final repository and implementation review
**Current readiness:** Ready with minor refinements

## 1. Executive assessment

FleetOps is now a coherent project with a single definition for everything it ships. Each public route is one maintained static document, the demo application is one hash-routed shell, runtime JavaScript is an explicit ES module graph behind a single entry, `styles/src/` is the only CSS source, and `public/` holds the production-static files Vite copies verbatim. The Vite migration preserved every production URL, and the service-worker precache is derived from the build that emitted the assets rather than maintained by hand — a custom Rollup plugin reads the finished bundle and fails the build if a precached document, the placeholder or a runtime asset is missing.

The behaviours that were previously misleading are now honest. The contact form posts to a real provider with progressive enhancement, confirms only on a successful response and keeps the typed message on failure; the privacy policy describes that same data path; the landing page presents demo scenarios instead of attributed testimonials and the product page marks its figures as illustrative; unavailable controls are natively disabled with an explanatory title; offline mutations are rejected with a message that says so; the demo reset requires a confirmation that names its scope. Accessibility is handled where it matters: drawer semantics are viewport-conditional in both shells, the application content region is a `main` landmark that the skip link focuses, and collapsed accordion panels leave the accessibility tree.

Documentation is the strongest part of the repository. The README describes the executed model file by file, lists every `localStorage` key the implementation writes, states which of them nothing reads back, records that the deployment is manual and that no CI exists, and declines to claim anything it cannot support.

What remains is residue and verification hygiene, not defect. The ES module migration left twenty-three modules publishing themselves on `window`; exactly one of those globals is read at runtime, and it is the one that looks most disposable. The smoke suite is allowed to reuse an existing preview server, so it can pass against a stale artifact. Service-worker cache versioning is hand-maintained while its precache content is build-derived, and three development dependencies carry high-severity advisories with no runtime exposure. None of these blocks release, deployment or portfolio presentation.

## 2. Audit scope and verification

### Areas inspected

- All thirteen maintained HTML documents: `index.html`, `404.html`, `offline.html` and the ten route directories (`product`, `features`, `pricing`, `about`, `contact`, `security`, `careers`, `privacy`, `terms`, `cookies`)
- All 24 runtime modules under `scripts/` plus the QA script — entry, router, store, seed, permissions, four utilities, six shared components, seven views, two layouts
- All eleven CSS sources under `styles/src/` and the `styles/main.css` entry point
- Build and tooling: `vite.config.js` including the `fleetopsServiceWorkerPrecache` plugin, `package.json` scripts, `package-lock.json`, `optimize-images.js`
- Service worker and PWA contract: `public/sw.js`, the emitted `dist/sw.js`, `public/assets/favicon/site.webmanifest`, registration in `scripts/main.js`, `offline.html`
- Deployment, security and SEO configuration: `public/_headers`, `public/_redirects`, `public/robots.txt`, `public/sitemap.xml`, canonical and social metadata across all documents
- Testing: `playwright.config.js`, `tests/smoke.spec.js`
- Documentation, licensing and repository state: `README.md`, `CHANGELOG.md`, `docs/archive/plans/PLAN-2026-08-10.md`, `LICENSE`, `.gitignore`, `.gitattributes`, tracked file set, working tree, commit history
- The `dist/` artifact present in the working tree, including the emitted bundle and the generated service worker

### Verification performed

- `node scripts/qa/check-css-vars.js` (`npm run qa:css-vars`) — executed and passed; 971 `var()` usages against 77 definitions across 11 source files, exit code 0
- `node --check` across every tracked JavaScript file including `public/sw.js`, `vite.config.js` and `optimize-images.js` — executed and passed; syntax only, no behavioural verification
- `npm audit` — executed; three high-severity advisories reported, all in development dependencies (see [P2-04])
- `git status`, `git log`, `git ls-files`, working-tree comparison of `dist/` against its sources — executed
- Static inspection of every file listed above, including cross-referencing each `window.*` publication against its consumers, each documented README claim against its implementation, and each finding of the previous audit against the current source
- `npm run test:smoke` — **executed and passed on the project owner's machine on 2026-08-10, not re-executed during this audit.** The supplied run reports 29 of 29 tests passing. `playwright.config.js:19-24` starts the suite with `npm run build && npm run preview`, so the run exercised the built `dist/` artifact rather than the development server. This audit reports that result as supplied evidence and does not independently assert it.

### Verification limitations

- The smoke suite and the production build were not executed by this audit. The `dist/` artifact inspected here was produced by the owner's run; its timestamps are newer than every source file, and `dist/sw.js:29` carries the real hashed URLs of the emitted bundle, which is consistent with a current build. That is artifact inspection, not an executed build.
- No browser or assistive-technology environment was available to this audit. Responsive behaviour, focus order, live-region announcement, service-worker runtime behaviour and offline navigation were **not executed here**; several of them are covered by the supplied Playwright run.
- Contrast compliance was not fully verified because reliable computed-style analysis was not available.
- No live URL was supplied to this audit and no deployed environment was inspected. `README.md` and `CHANGELOG.md` record a manual Netlify CLI deployment and provider-side form verification performed by the project owner; that is repository documentation, and this audit neither confirms nor contradicts it.
- Third-party availability and delivery guarantees for the contact form provider are outside the scope of a repository audit.

## 3. Verified strengths

- One definition per public page. Each route is a single maintained document, and the previously duplicated hash-routed renderer path is gone — `scripts/ui/marketingPages.js` no longer exists and `scripts/ui/layoutLanding.js:248` now exports only shell behaviour (`getLandingTheme`, `initResourcesMenu`, `initLandingShell`).
- Explicit module dependencies replacing implicit script order: every file under `scripts/` declares its imports and exports, behind the single `<script type="module" src="/scripts/main.js">` entry (`index.html:449`), with the bootstrap sequence documented at `scripts/main.js:1-12`.
- The service-worker precache is build-derived rather than hand-maintained. `fleetopsServiceWorkerPrecache` in `vite.config.js:80-130` reads the emitted documents, keeps only URLs the same bundle actually produced, sorts them for byte-identical rebuilds, and calls `this.error` if a precached document, the placeholder or any runtime asset is missing (`vite.config.js:101,110,115`). The result is visible in `dist/sw.js:29`.
- Service-worker navigation semantics are correct and reasoned in place: a fulfilled response of any status passes through unchanged so host 404s survive worker control, only a rejected request falls back, and recovery order is requested document → offline fallback → network error (`public/sw.js:135-154`). `cacheNavigationResponse` stores only successful responses for known public routes (`public/sw.js:105-120`).
- The offline fallback is genuinely self-sufficient: `offline.html` loads no stylesheet, script, font or image and inlines its own presentation, with the reason documented in the file (`offline.html:11-19`).
- Honest interface boundaries applied consistently. Global search and the alerts button are natively `disabled` with explanatory `title` attributes (`scripts/ui/layoutApp.js:92,110`), orders CSV export uses the same treatment, offline mutations are rejected with "zmiana nie została zapisana" rather than a false queue (`scripts/state/store.js:353-363`), and the demo reset opens a confirmation that names what it clears (`scripts/ui/views/settingsView.js:237-263`).
- Accessibility is viewport-aware rather than static. Drawer semantics — `role="dialog"`, `aria-modal` and `aria-hidden` — are applied and removed against a `matchMedia("(min-width: 1025px)")` query in both shells, kept in sync on viewport change and unsubscribed through the cleanup registry (`scripts/ui/layoutLanding.js:90-103,195-201`; `scripts/ui/layoutApp.js:238,264-274,314-327`). The application content region is the shell's `main` landmark and the skip-link target (`scripts/ui/layoutApp.js:205-215`), and collapsed accordion panels are removed from the accessibility tree through `hidden` while keeping the transition (`scripts/ui/components/accordion.js` — `syncState`).
- The contact form is a real submission path with a working no-JavaScript baseline. The document carries the provider's detection contract and a clipped honeypot kept out of the tab order and the accessibility tree (`contact/index.html:138-152`), and the enhanced path posts same-origin, treats only `response.ok` as success, preserves typed values on failure, restates the published e-mail and telephone channels, and serialises requests behind a disabled control with `aria-busy` (`scripts/main.js:85-150`).
- Consistent output escaping wherever record data reaches the DOM, via one helper — `escapeHtml` in `scripts/utils/dom.js`, used across all seven views and the application shell — with the behaviour asserted by the smoke suite.
- Security-relevant headers are specific and now complete for a self-only policy: frame denial, nosniff, referrer policy, permissions policy, HSTS, and a CSP that closes `base-uri`, `form-action` and `object-src` (`public/_headers:1-7`). No `.env`, credential, token or key material is tracked, and no `console.log`, `debugger`, `TODO` or `FIXME` appears in runtime code — the only logging is in the QA script.
- Routing configuration matches the architecture: `public/_redirects` carries slash redirects and an asset rule with no SPA catch-all, so unmatched paths reach `404.html`, and that document uses root-relative references throughout (`404.html:34-44,55`).
- Repository hygiene is enforced rather than assumed. `.gitattributes` declares a line-ending policy per file type and states that it overrides local Git settings; `.gitignore` covers dependencies, build output, test artifacts, the local Netlify folder and the local agent tooling directory; the previously committed Playwright run artifact is no longer tracked.
- Documentation matches the implementation to an unusual degree: the README Architecture section describes the executed model, the data section enumerates all ten written `localStorage` keys, groups them by responsibility and names the two legacy keys that appear only in cleanup code (`README.md:229-238`), and the deployment section records the manual CLI path and the absence of CI.
- `npm test` is a genuinely read-only gate — `qa:css-vars` plus the smoke suite — and image generation is an explicit maintenance command that no build or test path invokes (`package.json` — `scripts`).

## 4. P0 — Critical risks

None detected.

## 5. P1 — Important issues worth fixing next

None detected.

## 6. P2 — Minor refinements

### [P2-01] Twenty-three modules publish themselves on `window`; the one global that is load-bearing is indistinguishable from the twenty-two that are not

- **Classification:** Maintenance risk
- **Affected area:** Module architecture, demo permission model, documentation
- **Evidence:** `scripts/state/store.js:366,368`; `scripts/core/permissions.js:49-55,114-115`; `README.md:51` and `README.md:307`
- **Current behavior:** Every runtime module both exports its API and assigns itself to `window` — 23 such assignments across `scripts/`. Only one is read anywhere: `scripts/core/permissions.js` resolves the current user and writes the activity trail through `window.FleetStore`, deliberately and with the reason documented in place (`scripts/state/store.js` imports `FleetPermissions`, so a static import back would close a module cycle). The other 22 assignments have no consumer in the repository, in the tests or in any HTML document. The README describes the whole set as "a deliberately preserved internal contract, not a loading mechanism", which is accurate for 22 of them and inaccurate for the one that is a runtime dependency.
- **Impact:** Nothing is currently broken. The risk is that removing `store.js:368` during an obvious dead-global cleanup silently degrades the permission model rather than failing: `resolveUser` falls back to `defaultUser`, which is `DemoUsers[0]` — the administrator — so every demo role would gain administrator rights and `guard` would stop recording denials. The in-code explanation sits in `permissions.js`, not at the assignment being removed, and the README statement actively suggests the assignment is inert.
- **Recommended direction:** Remove the global publications nothing consumes, and make the remaining dependency explicit at both ends — either resolve the cycle so `permissions.js` can import the store, or keep the lazy lookup while marking the assignment in `store.js` as load-bearing and correcting the README sentence to distinguish the two cases.
- **Verification criteria:** Every remaining `window.*` publication has an identifiable consumer, and removing any single one of them causes a visible failure rather than a silent change in permission behaviour.

### [P2-02] The smoke suite may pass against a stale build artifact

- **Classification:** Source-visible risk
- **Affected area:** Automated verification
- **Evidence:** `playwright.config.js:19-24`
- **Current behavior:** The suite's `webServer` command is `npm run build && npm run preview`, but `reuseExistingServer: true` means the whole command is skipped whenever something already answers on `http://127.0.0.1:8182`. A preview server left running from an earlier build therefore serves a `dist/` that predates the current sources, and the run reports success against it.
- **Impact:** The project's only automated gate covering the production artifact can report a pass that does not describe the current sources. This is exactly the scenario the suite exists to rule out, and there is no CI run to catch it independently — the README records that no CI integration exists.
- **Recommended direction:** Reserve server reuse for local iteration and require a fresh build for a reported verification run, for example by tying `reuseExistingServer` to an environment flag that defaults to off.
- **Verification criteria:** A verification run started while a stale preview server is listening either rebuilds first or fails, rather than testing the stale artifact.

### [P2-03] Service-worker cache versioning is hand-maintained while its precache content is build-derived

- **Classification:** Maintenance risk
- **Affected area:** Service worker, client storage
- **Evidence:** `public/sw.js:1,29-33,44-57`
- **Current behavior:** `RUNTIME_ASSET_URLS` changes automatically with every build that emits new content hashes, but `CACHE_NAME` is a literal (`"fleetops-v1.12"`) that a maintainer must remember to advance. Activation deletes only caches whose name differs from the current one. If the version is not bumped, a new build's `install` adds its hashed assets to the same cache while the previous build's hashed entries stay in it permanently, because nothing else evicts them.
- **Impact:** Storage growth across deployments rather than incorrect serving — content-hashed URLs cannot collide, so a stale entry is never returned for new content. The two halves of the precache contract nevertheless move on different schedules, and the manual half is the one with no build-time check behind it, unlike every other part of the precache which fails the build when inconsistent.
- **Recommended direction:** Derive the cache name from the same build data that produces the asset list, or fail the build when the emitted asset set changes and the version literal does not.
- **Verification criteria:** Two consecutive builds with different asset hashes produce different cache names without a manual edit, and the older cache is removed on activation.

### [P2-04] Three development dependencies carry high-severity advisories, two of them fixable within the current major versions

- **Classification:** Security exposure
- **Affected area:** Dependency configuration
- **Evidence:** `npm audit` output; `package.json` — `devDependencies`; `package-lock.json`
- **Current behavior:** `npm audit` reports three high-severity advisories, all in the development tree: `nanoid` at or below 3.3.16 and `postcss` at or below 8.5.22, both transitive under Vite, and `sharp` below 0.35.0 for inherited libvips issues. The audit reports the first two as fixable without breaking changes and `sharp` as requiring a major upgrade to 0.35.3.
- **Impact:** No runtime exposure — nothing from these packages ships to the browser, the PostCSS advisory needs an attacker-controlled `sourceMappingURL` in processed CSS while all CSS here is first-party, and `sharp` processes two first-party source images. The practical cost is that a reviewer running `npm audit` on a portfolio project sees three unresolved high-severity findings and has to reason this through themselves.
- **Recommended direction:** Take the non-breaking updates for the transitive advisories, and evaluate the `sharp` major upgrade separately since it affects only the explicit image-generation command.
- **Verification criteria:** `npm audit` reports no high-severity advisory, or each remaining one is recorded in the repository with its reason for being accepted.

## 7. Extra quality improvements

### Split the demo application out of the bundle every public page loads

- **Relevant area:** Module graph and build output (`scripts/main.js:8`; `scripts/router.js:1-12`; `dist/assets/main-BBQDKSh8.js`).
- **Current evidence:** `main.js` statically imports `FleetRouter`, which statically imports the application shell and all seven views, so the single emitted chunk — 107 KB for the current build — is downloaded and parsed by all thirteen documents. The router, the application shell and the views account for roughly 3 100 source lines that no public marketing page can execute, since those pages never enter a `#/app` route.
- **Potential value:** The marketing pages would load only the shell behaviour they actually run. Vite is already configured for it, so the change is a dynamic import at the router boundary rather than a restructure.
- **Scope boundary:** Optional. The current payload is modest and nothing is broken; this is a proportionality improvement, not a defect.

### Record a contrast and assistive-technology verification pass

- **Relevant area:** Accessibility verification (`styles/src/00-settings.css` token definitions; the accessibility section of `README.md`).
- **Current evidence:** The implementation covers the mechanisms a source audit can confirm — landmarks, live regions, focus management, viewport-conditional drawer semantics, 31 `:focus-visible` rules and 13 `prefers-reduced-motion` blocks — but colour contrast and actual screen-reader announcement are the two areas neither this audit nor the smoke suite can establish.
- **Potential value:** It would close the one remaining gap between what the project implements and what it can evidence, without changing the README's correct refusal to claim formal conformance.
- **Scope boundary:** Optional, and it is a verification activity rather than a code change.

## 8. Current readiness conclusion

**Status:** Ready with minor refinements

No critical or important finding remains. Every defect from the previous audit was closed at the source rather than documented away: the duplicate page-rendering path was deleted, the application shell gained a `main` landmark, drawer semantics became viewport-conditional, the shell breakpoints were unified, the offline queue was replaced with an honest rejection, the contact form became a real submission path reconciled with the privacy policy, unsupported public claims were reframed, the unreachable error page was restored by removing the SPA catch-all, collapsed accordion panels were hidden from assistive technology, the undefined design token was resolved, and repository hygiene was put under `.gitignore` and `.gitattributes`. All three previously optional improvements — the offline fallback document, the build-derived runtime-asset precache and the extended CSP — were implemented.

What is left are four contained refinements: module-migration residue with a documented but silent failure mode, two verification-hygiene items, and development-dependency advisories with no runtime exposure. None of them affects a user-facing behaviour, a build, a deployment or an accessibility contract, and none needs to be resolved before this is presented, deployed or handed over. The remaining risk sits in verification this audit could not perform — contrast, assistive technology, cross-browser behaviour and the live environment — rather than in the implementation.

## 9. Senior rating

**Rating:** 8/10

Judged as a vanilla, frontend-only portfolio SaaS demo, this is now a strong implementation with an unusually disciplined relationship between its code, its tests and its documentation. The architecture has one owner for every concern: one document per public route, one module graph behind one entry, one CSS source tree, one service-worker source whose precache is generated from the build that produced the assets and which fails the build when the two disagree. The interface no longer claims anything the implementation cannot do — disabled controls say why, offline rejections say the change was not saved, public figures are marked illustrative, and the contact form confirms only what the provider accepted while keeping a working no-JavaScript path. The README describes the executed system precisely enough to audit against, including the parts that are inert.

The rating stops at 8 rather than higher for reasons of verification and residue, not correctness. The module migration left twenty-three global publications of which one is load-bearing, and the documentation describes that set in a way that would mislead the person most likely to clean it up. The single automated gate covering the production artifact can be satisfied by a stale server. Cache versioning is the one part of the service-worker contract with no build-time check behind it. Contrast and assistive-technology behaviour remain unevidenced, and the deployment is recorded in documentation rather than verified here. The 29-test suite that covers the built artifact is reported as passing on the project owner's machine and was not re-executed by this audit; the rating reflects source-verified quality plus that supplied evidence, not independently measured runtime behaviour.
