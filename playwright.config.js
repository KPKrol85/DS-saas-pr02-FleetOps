const { defineConfig, devices } = require("@playwright/test");

// The smoke suite exercises the deployable artifact: it runs against the Vite
// production preview (`dist/`), which is also the only mode where the service
// worker is registered.
module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://127.0.0.1:8182",
    serviceWorkers: "block",
    screenshot: "off",
    trace: "off",
    video: "off",
  },
  webServer: {
    command: "npm run build && npm run preview",
    url: "http://127.0.0.1:8182",
    reuseExistingServer: true,
    timeout: 120000,
  },
});
