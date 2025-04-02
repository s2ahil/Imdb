import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.URL": JSON.stringify(process.env.URL), // Ensure it's available at build time
  },
});
