const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://127.0.0.1:8181",
    serviceWorkers: "block",
    screenshot: "off",
    trace: "off",
    video: "off",
  },
  webServer: {
    command: "npm run preview",
    url: "http://127.0.0.1:8181",
    reuseExistingServer: true,
    timeout: 10000,
  },
});
