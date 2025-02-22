/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const VENDORS = {
  radix_ui: [
    "@radix-ui/react-accordion",
    "@radix-ui/react-alert-dialog",
    "@radix-ui/react-aspect-ratio",
    "@radix-ui/react-avatar",
    "@radix-ui/react-checkbox",
    "@radix-ui/react-collapsible",
    "@radix-ui/react-context-menu",
    "@radix-ui/react-dialog",
    "@radix-ui/react-dropdown-menu",
    "@radix-ui/react-hover-card",
    "@radix-ui/react-icons",
    "@radix-ui/react-label",
    "@radix-ui/react-menubar",
    "@radix-ui/react-navigation-menu",
    "@radix-ui/react-popover",
    "@radix-ui/react-progress",
    "@radix-ui/react-radio-group",
    "@radix-ui/react-scroll-area",
    "@radix-ui/react-select",
    "@radix-ui/react-separator",
    "@radix-ui/react-slider",
    "@radix-ui/react-slot",
    "@radix-ui/react-switch",
    "@radix-ui/react-tabs",
    "@radix-ui/react-toast",
    "@radix-ui/react-toggle",
    "@radix-ui/react-toggle-group",
    "@radix-ui/react-tooltip",
  ],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 850,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": [
            "axios",
            "crypto-js",
            "qrcode.react",
            "react-dom",
            "react-hook-form",
            "react-select",
            "react",
            "tailwind-merge",
          ],
          "pdfjs-dist": ["pdfjs-dist"],
          "pdf-lib": ["pdf-lib"],
          "react-pdf-viewer/core": ["@react-pdf-viewer/core"],
          vendor1: ["lodash", "zod", "swiper", "moment", ...VENDORS.radix_ui],
          vendor2: ["react-day-picker", "recharts"],
          vender3: [
            "@tanstack/react-router",
            "@tanstack/react-table",
            "i18next-browser-languagedetector",
            "i18next-chained-backend",
            "i18next-http-backend",
            "i18next-localstorage-backend",
            "i18next",
            "react-i18next",
          ],
          // screens: [
          //   // Add screen components
          //   './src/screens/tra-cuu-tinh-trang-ho-so/components/ket-qua-giai-quyet',
          //   './src/screens/tra-cuu-tinh-trang-ho-so/components/thanh-phan-ho-so',
          //   './src/screens/components/select/custom-select',
          //   // Add other screen paths here
          // ],
        },
      },
    },
  },
});
