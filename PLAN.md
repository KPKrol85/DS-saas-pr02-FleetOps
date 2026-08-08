# FleetOps — Development Plan

**Last reviewed:** 2026-08-08
**Project type:** Static multi-page front-end site with a hash-routed, browser-local demo application (vanilla HTML/CSS/JS, no framework, no bundler)
**Plan status:** Active

## Planning principles

- The plan reflects the current verified project state.
- Main items are checked only when all required subtasks are complete.
- `styles/src/` and `scripts/` are canonical; `dist/` and `assets/img/` are generated output and are never edited directly.
- Completed significant changes are recorded separately in `CHANGELOG.md`.
- Findings converted from `AUDIT.md` (2026-08-08) were re-verified against the current implementation before entering this plan.

## Current priorities

1. `PH1-01` — Normalize line endings so CSS changes become reviewable.
2. `PH2-01` — Define the missing `--surface-muted` token and restore the CSS gate.
3. `PH3-01` — Remove the unreachable duplicate public-page renderers.
4. `PH4-01` — Remove mobile-drawer ARIA state from desktop navigation.
5. `PH4-02` — Emit a `main` landmark inside the application shell.

## Phase 1 — Repository hygiene and reviewable diffs

**Goal:** Make the working tree clean and diffs trustworthy before any source change is made.

- [x] **PH1-01 — Normalize text line endings across the repository** — **Priority:** High
  - [x] add a `.gitattributes` normalising line endings for text sources (`.html`, `.css`, `.js`, `.json`, `.md`, `.txt`, `.xml`) and marking `.bat` and binary assets appropriately
  - [x] renormalise the currently affected files once (`styles/src/06-app-components.css`, `styles/src/09-pages.css`, `start-local-server.bat`)
  - [x] confirm no content change is introduced by the renormalisation
  - **Completion condition:** `git diff` reports no changes for files whose content has not been edited
  - **Source:** `AUDIT.md` — P2-03

- [x] **PH1-02 — Add `.gitignore` and untrack the committed test artifact** — **Priority:** Medium
  - [x] add a `.gitignore` covering `node_modules/`, `dist/`, `test-results/` and Playwright report output
  - [x] untrack `test-results/.last-run.json`
  - [x] confirm the README statement that no recorded test-run results are committed becomes true
  - **Completion condition:** `git status` is clean after install, build and test, and no test-run artifact is tracked
  - **Source:** `AUDIT.md` — P2-01

- [x] **PH1-03 — Stop the documented build and test commands from rewriting tracked images** — **Priority:** Medium
  - [x] decouple `optimize:images` from the `build` and `test` package scripts
  - [x] keep image generation available as an explicit standalone command, or make it skip regeneration when outputs are current
  - [x] define `test` as a check that does not modify tracked files
  - [x] update the README workflow section to describe the resulting commands
  - [x] optional: add one combined read-only verification script running `qa:css-vars` and `test:smoke` — satisfied by `npm test`, which is exactly that combination; no additional script was introduced
  - **Completion condition:** running the documented build and test commands leaves tracked files unmodified
  - **Source:** `AUDIT.md` — P2-02, section 7

## Phase 2 — Restore the project's own validation gate

**Goal:** Make `npm run qa:css-vars` a gate that passes, so it can guard later CSS work.

- [x] **PH2-01 — Resolve the undefined `--surface-muted` token** — **Priority:** High
  - [x] define `--surface-muted` in both theme blocks in `styles/src/00-settings.css`, or repoint the two declarations at an existing surface token — repointed at the existing `--surface-2`, which is already the canonical recessed surface inside a `--surface` card and is defined in both themes; no new token was added
  - [x] apply the fix to `styles/src/06-app-components.css:317` and `:386` (`.setting-card__toggle-control`, `.setting-card__check-control`)
  - [x] verify the compact-mode toggle track and settings checkbox render with a visible fill in light and dark themes
  - **Completion condition:** `npm run qa:css-vars` exits 0
  - **Depends on:** `PH1-01`
  - **Source:** `AUDIT.md` — P1-07

## Phase 3 — Single source of truth for public pages

**Goal:** Leave exactly one definition of every public page — the static documents that actually render.

- [ ] **PH3-01 — Remove the unreachable public-page renderers and their router cases** — **Priority:** High
  - [ ] confirm the reachability boundary in `scripts/main.js` (`redirectLegacyPublicHash`, `isDynamicHash`) before deleting anything
  - [ ] remove `scripts/ui/marketingPages.js` and its `<script>` references in all twelve HTML documents
  - [ ] remove `renderLanding`, `renderLandingHeader`, `renderLandingFooter` from `scripts/ui/layoutLanding.js`, keeping `initLandingShell`, the theme helpers and `bindLogoScroll`
  - [ ] remove `renderInfoPage` and the unreachable public route cases from `scripts/router.js`
  - [ ] remove the dead `.footer-links a` selector in `applyAriaCurrent` (`scripts/router.js:120`) and confirm `aria-current` still resolves against the selectors that exist
  - [ ] re-run the smoke suite for the public routes and the `#/app` guard
  - **Completion condition:** no `render*Page`, `renderLanding` or `renderInfoPage` definition remains without a reachable call site, the public pages render unchanged, and the per-page script payload drops by the removed amount
  - **Source:** `AUDIT.md` — P1-03

## Phase 4 — Application accessibility and responsive contracts

**Goal:** Make the demo application's navigation, landmarks and breakpoints correct at every supported width.

- [ ] **PH4-01 — Make drawer semantics viewport-conditional** — **Priority:** High
  - [ ] apply `role="dialog"`, `aria-modal` and `aria-hidden` to `#mobileNav` and `#appDrawer` only while the container operates as an overlay
  - [ ] stop `renderAppShell` from re-applying `aria-hidden="true"` on every route render at desktop widths (`scripts/ui/layoutApp.js:56-59,245`)
  - [ ] align the drawer state handling in `scripts/ui/layoutLanding.js` with the same rule
  - **Completion condition:** at 1280 px neither navigation container exposes `aria-hidden="true"` or modal dialog semantics and every navigation link is in the accessibility tree; at 390 px the closed drawer remains hidden from it
  - **Source:** `AUDIT.md` — P1-01

- [ ] **PH4-02 — Emit a `main` landmark inside the application shell** — **Priority:** High
  - [ ] render the application content region as a `main` element carrying `id="main-content"` in `renderAppShell` (`scripts/ui/layoutApp.js:192-200`)
  - [ ] confirm exactly one `main` landmark exists per rendered route, including the in-app not-found view
  - [ ] verify the persistent skip link resolves and moves focus into the region
  - **Completion condition:** on `#/app`, `#/app/orders` and the in-app not-found route a single `main#main-content` exists and the skip link moves focus into it
  - **Source:** `AUDIT.md` — P1-02

- [ ] **PH4-03 — Use one breakpoint boundary for the whole application shell** — **Priority:** High
  - [ ] reconcile the mixed `1024px` and `1025px` boundaries in `styles/src/06-app.css` (`:25`, `:145`, `:337`, `:457`)
  - [ ] ensure the sidebar becomes static at exactly the width where the mobile top bar and `#drawerToggle` are withdrawn
  - [ ] confirm `.app-main` occupies the content column at every width where the two-column grid is active
  - **Completion condition:** at 1023 px, 1024 px and 1025 px the application exposes exactly one usable navigation affordance and the content is never confined to the sidebar column
  - **Source:** `AUDIT.md` — P1-09

- [ ] **PH4-04 — Make the collapsed accordion state authoritative** — **Priority:** Medium
  - [ ] hide the collapsed panel from the accessibility tree in addition to the `max-height` transition (`styles/src/03-components.css:444-452`, `scripts/ui/components/accordion.js:45-49`)
  - [ ] preserve the existing open/close animation and `aria-expanded` synchronisation
  - **Completion condition:** a collapsed accordion panel's content is absent from the accessibility tree
  - **Source:** `AUDIT.md` — P2-04

## Phase 5 — Demo behaviour honesty and data safety

**Goal:** Ensure every enabled control in the demo does what it says, and no user input is lost silently.

- [ ] **PH5-01 — Stop presenting discarded offline actions as queued work** — **Priority:** High
  - [ ] decide between replaying queued actions and rejecting them plainly, given the browser-local demo scope
  - [ ] if rejecting: change the `ensureOnline` message to state the action was not saved and must be repeated (`scripts/state/store.js:377-386`)
  - [ ] stop `setOnlineStatus` from presenting the reconnect as a completed sync while it clears the queue (`scripts/state/store.js:347-357`)
  - [ ] if replaying: persist the action payload in `enqueueOfflineAction` and apply the queue on reconnect
  - [ ] align the README offline description with the chosen behaviour
  - **Completion condition:** after creating a record offline and returning online, either the record exists or the user was told explicitly that it was not saved; no message implies deferred processing that does not occur
  - **Source:** `AUDIT.md` — P1-06

- [ ] **PH5-02 — Give the application top bar controls behaviour or an honest disabled state** — **Priority:** Medium
  - [ ] resolve the search input and the "Alerty" button in `scripts/ui/layoutApp.js:92,110`
  - [ ] apply the treatment already used for the disabled CSV export (disabled plus explanatory `title`) where no behaviour is added
  - **Completion condition:** every enabled control in the application top bar performs an observable action or communicates its unavailability
  - **Source:** `AUDIT.md` — P2-05

- [ ] **PH5-03 — Require confirmation before the demo reset** — **Priority:** Medium
  - [ ] route `resetDemo` through the existing confirmation modal (`scripts/ui/views/settingsView.js:113-119,224-230`)
  - [ ] state in the confirmation what is cleared, matching the full scope in `scripts/state/store.js:314-345`
  - [ ] correct the reset card description so it matches that scope
  - **Completion condition:** activating "Resetuj" requires an explicit confirmation naming the data being cleared
  - **Source:** `AUDIT.md` — P2-06

## Phase 6 — Public content and disclosure integrity

**Goal:** Make every public claim one the project can support, and make the contact surfaces agree with each other.

- [ ] **PH6-01 — Align the contact form, its confirmation and the privacy page on one truth** — **Priority:** High
  - [ ] state on the form itself that the submission is not transmitted (`contact/index.html:120,147,150`)
  - [ ] replace the success wording in `bindStaticContactForm` with a demo-accurate confirmation (`scripts/main.js:65-79`)
  - [ ] remove the one-working-day response commitment from the form copy and the FAQ
  - [ ] reconcile the privacy page description of the form with the chosen behaviour (`privacy/index.html:193`)
  - **Completion condition:** the contact page, the success message and the privacy page make the same statement about whether a submission is transmitted, and no response-time commitment remains that the implementation cannot honour
  - **Source:** `AUDIT.md` — P1-05

- [ ] **PH6-02 — Remove or explicitly mark the unsupported testimonials and trust metrics** — **Priority:** High
  - [ ] resolve the three attributed testimonials on the landing page (`index.html:283-314`)
  - [ ] resolve the "Wskaźniki zaufania" figures on the product page (`product/index.html:127-141`)
  - [ ] either mark both sections as illustrative sample content in the visible copy, or replace them with statements the demo can support
  - **Completion condition:** no public page presents a quotation attributed to a named organisation or a numeric performance figure without a visible indication that the content is illustrative
  - **Source:** `AUDIT.md` — P1-10

- [ ] **PH6-03 — Correct the dropped Polish diacritics on the product page** — **Priority:** Low
  - [ ] fix the three strings at `product/index.html:127,148,173`
  - **Completion condition:** no public page contains Polish words with dropped diacritics
  - **Source:** `AUDIT.md` — P2-08

## Phase 7 — Deployment routing and error document

**Goal:** Make unknown URLs reach the maintained error document instead of a soft 404.

- [ ] **PH7-01 — Scope the catch-all redirect and repair the error document's asset references** — **Priority:** High
  - [ ] decide whether the `/* /index.html 200` fallback is required, given that public routes are real directories and the demo lives entirely in the hash (`_redirects:16`)
  - [ ] scope or remove the fallback so unmatched paths reach `404.html`
  - [ ] switch the icon, manifest and home-link references in `404.html:34-38,55` from `./assets/...` and `href="./"` to root-relative paths
  - [ ] confirm `build-dist.js` still copies `404.html` and `_redirects` into `dist/` unchanged
  - **Completion condition:** the committed routing configuration serves the error document for unmatched paths, and `404.html` resolves its icons, manifest and home link at any request depth
  - **Verification limitation:** HTTP status behaviour can only be confirmed against a deployed environment; no deployment is available in the repository
  - **Source:** `AUDIT.md` — P1-08

## Phase 8 — Documentation accuracy and final verification

**Goal:** Make the README describe the code that actually runs, and close the verification gaps the audit could not perform.

- [ ] **PH8-01 — Rewrite the README Architecture section to match the executed model** — **Priority:** High
  - [ ] describe per-route static documents owning their own header, footer and content (`README.md:47,49` and `README.md:285,287`)
  - [ ] remove the references to the deleted renderers as the source of truth
  - [ ] drop or qualify the "store with subscriptions" claim while `FleetStore.onChange` has no subscriber
  - **Completion condition:** every file named in the Architecture section has a reachable runtime role matching the description
  - **Depends on:** `PH3-01`
  - **Source:** `AUDIT.md` — P1-04

- [ ] **PH8-02 — Correct the README data-and-state section** — **Priority:** Medium
  - [ ] list every key written by `persist()` — `fleet-theme`, `fleet-compact`, `fleet-dashboard-range`, `fleet-auth`, `fleet-filters` — alongside the five already documented (`scripts/state/store.js:96-108`)
  - [ ] include `fleet-last-route` written by the router (`scripts/router.js:234`)
  - [ ] correct the documented reset scope to match `resetDemo` (`scripts/state/store.js:314-326`)
  - [ ] confirm the privacy page description stays consistent with the corrected list
  - **Completion condition:** every key written by the implementation appears in the README list and the documented reset scope matches `resetDemo`
  - **Source:** `AUDIT.md` — P2-07

- [ ] **PH8-03 — Run the verification the audit could not perform** — **Priority:** Medium
  - [ ] install dependencies and execute `npm run test:smoke` against the current implementation
  - [ ] execute `npm run qa:css-vars` and confirm exit 0
  - [ ] execute the production build and confirm `dist/` output is complete and the tracked working tree stays clean
  - [ ] record only outcomes actually observed; do not restate unexecuted checks as passing
  - **Completion condition:** the CSS gate, the smoke suite and the build have each been executed once against the post-fix implementation
  - **Depends on:** `PH1-02`, `PH1-03`, `PH2-01`

## Deferred work

- [ ] **D-01 — Real contact-form submission endpoint**
  - **Reason:** the project is intentionally frontend-only with no backend; `PH6-01` resolves the disclosure mismatch without introducing one

## Optional future improvements

- [ ] **O-01 — Branded offline fallback document for failed navigations**
  - **Value:** removes the one path where `networkFirstNavigation` hands control back to the browser's own error page (`sw.js:118-130`)
  - **Scope boundary:** non-blocking; current behaviour matches the documented design

- [ ] **O-02 — Precache the stylesheet and entry scripts alongside the documents**
  - **Value:** a first offline navigation to a precached-but-unvisited route would render styled and interactive (`sw.js:3-16`)
  - **Scope boundary:** non-blocking; ties the precache list to build output naming, so it is worth doing only with a decision about generated asset names

- [ ] **O-03 — Extend the CSP with `base-uri`, `form-action` and `object-src`**
  - **Value:** closes the residual injection surface the current self-only policy otherwise eliminates (`_headers:7`)
  - **Scope boundary:** non-blocking hardening; no current implementation depends on the omitted directives
