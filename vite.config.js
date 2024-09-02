import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import icons from "./public/icons.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "Barbershop App",
        short_name: "Barbershop",
        description: "Barbershop management system for small businesses",
        theme_color: "#AF8447",
        background_color: "#f7f7f7",
        scope: "/",
        start_url: "/",
        display: "standalone",
        icons: icons.icons,
        screenshots: [
          {
            src: "/screenshots/screenshot1.jpg",
            sizes: "1921x884",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/screenshots/screenshot2.png",
            sizes: "432x935",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
      workbox: {
        importScripts: ["/service-worker/push.js"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
    },
  },
});
