import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server :{
        port:5173,
            proxy:{
            '/api/':{ 
                target: 'http://44.223.134.187:8080/',
                changeOrigin: true,
            }
        }
    },
    base: "./",
    test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    coverage: {
        provider: "v8",
        reporter: ["text", "html"],
    },
    },
});