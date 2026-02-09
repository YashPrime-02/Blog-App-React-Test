import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Vite configuration file
// This controls both:
// 1) Vite Dev Server (npm run dev)
// 2) Vitest Testing Setup (npm test)

export default defineConfig({
  // ✅ Enables React support in Vite (JSX, fast refresh, etc.)
  plugins: [react()],

  // ✅ Vitest configuration
  // Vitest is the testing tool used in Vite projects
  test: {
    // ✅ Uses a browser-like environment inside Node.js
    // jsdom creates a fake DOM so React components can render in tests
    environment: "jsdom",

    // ✅ Runs this file before every test file
    // We use it to load jest-dom matchers like:
    // expect(...).toBeInTheDocument()
    setupFiles: "./src/setupTests.js",

    // ✅ Allows using test(), expect(), describe() without importing them
    // Similar to how Jest works
    globals: true
  }
});
