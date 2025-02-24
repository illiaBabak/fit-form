import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: "https://fit-form-gamma.vercel.app/start",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
