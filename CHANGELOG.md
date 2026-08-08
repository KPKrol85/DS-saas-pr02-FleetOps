# Changelog

All significant changes to this project are documented in this file.

## [Unreleased]

### Changed

- Migrated the project to Vite as the single development, module, build and production-preview tool. `vite.config.js` declares every maintained HTML document as a build entry, so the multi-page public structure, the hash-routed demo application and all production URLs are unchanged; development runs on `127.0.0.1:8181` and the production preview of `dist/` on `127.0.0.1:8182`, both with strict port handling. Active runtime JavaScript moved from 25 ordered `<script defer>` tags to a Vite-managed ES module graph behind a single `/scripts/main.js` module entry, with explicit imports replacing the implicit load order (the `window.*` namespaces remain as the project's internal contract). Production-static files moved to `public/` (`assets/`, `sw.js`, `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`) so Vite copies them to `dist/` verbatim under their existing paths, while `assets/img-src/` stays an out-of-build source input and `optimize-images.js` now writes to `public/assets/img/`. Retired `build-dist.js`, `postcss.config.js` and the `cssnano`, `postcss`, `postcss-cli` and `terser` dependencies, together with the Python `http.server` preview workflow; CSS and JavaScript bundling and minification are now owned by Vite. Reworked the npm contract to `dev`, `build`, `preview` (`preview:dist` kept as an alias) and turned `npm test` from a build alias into `qa:css-vars` plus the smoke suite, so no normal command regenerates image assets. The service worker keeps its `/sw.js` production registration and is skipped during development, and Playwright now runs the existing smoke suite against the built production preview.

### Added

- Added the standalone FleetOps static frontend implementation, covering public marketing and legal pages (`product`, `features`, `pricing`, `about`, `contact`, `security`, `careers`, `privacy`, `terms`, `cookies`, `404.html`) and a hash-routed demo application under `#/app`, `#/app/orders`, `#/app/fleet`, `#/app/drivers`, `#/app/reports` and `#/app/settings`.
- Added a hash router with an authentication guard for demo routes, `aria-current` synchronization and scroll reset on navigation.
- Added local demo record management for orders, fleet and drivers, including create, edit, delete, filtering, sorting, load-more pagination and a record details drawer.
- Added browser-local demo state persistence in `localStorage` using versioned storage keys (`fleet-domain-v1`, `fleet-activity-v1`, `fleet-list-prefs-v1`) and a demo data reset action.
- Added a local demo role model with administrator, dispatcher and driver roles enforced through action-level permission checks in `scripts/core/permissions.js`.
- Added interface settings for light and dark theme, compact mode, dashboard range and list preferences.
- Added JSON export for reports; CSV export of orders is intentionally disabled in the demo.
- Added shared UI components for dropdowns, modals, toasts, accordions, tables and the record drawer.
- Added a service worker (`sw.js`) that precaches the app shell and public routes and removes outdated `fleetops-` caches on activation.
- Added a Web App Manifest with application icons, screenshots and shortcut entries.
- Added a production build pipeline (`build-dist.js`) that emits a `dist/` output with CSS minified through PostCSS and `cssnano` and JavaScript minified through `terser`, and copies `sw.js`, `_headers`, `_redirects`, `robots.txt` and `sitemap.xml`.
- Added an image generation pipeline (`optimize-images.js`) producing AVIF, WebP and JPG variants from source images with `sharp`.
- Added static-hosting deployment configuration: security and cache headers in `_headers`, asset passthrough, trailing-slash redirects and index fallback in `_redirects`, plus `robots.txt` and `sitemap.xml`.
- Added a repository-wide line-ending policy in `.gitattributes` — LF for text sources and documentation, CRLF for Windows batch files, and explicit `binary` marking for image and font assets — and normalized the affected sources once, so checkouts are byte-identical across platforms and diffs no longer carry whole-file line-ending churn.

### Documentation

- Replaced the placeholder license with the KP_CODE Proprietary Project License 1.0 for FleetOps, and aligned the `package.json` `license` field and the README license sections with the canonical `LICENSE` file.
- Added a bilingual (PL/EN) README documenting project scope, features, technology stack, project structure and development workflows.

### Testing

- Added Playwright smoke tests in `tests/smoke.spec.js` covering public pages and demo application routes.
- Added a CSS custom-property consistency check (`scripts/qa/check-css-vars.js`) exposed as the `qa:css-vars` package script.
