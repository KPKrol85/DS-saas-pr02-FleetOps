# Changelog

All significant changes to this project are documented in this file.

## [Unreleased]

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

### Documentation

- Replaced the placeholder license with the KP_CODE Proprietary Project License 1.0 for FleetOps, and aligned the `package.json` `license` field and the README license sections with the canonical `LICENSE` file.
- Added a bilingual (PL/EN) README documenting project scope, features, technology stack, project structure and development workflows.

### Testing

- Added Playwright smoke tests in `tests/smoke.spec.js` covering public pages and demo application routes.
- Added a CSS custom-property consistency check (`scripts/qa/check-css-vars.js`) exposed as the `qa:css-vars` package script.
