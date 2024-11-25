// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,  // Set to false to run tests in headed mode (visible browser)
    screenshot: 'only-on-failure', // Capture screenshots only when tests fail
  },
  // You can also configure other global settings here
});
