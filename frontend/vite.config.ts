/*
 * Copyright (c) 2025 Christian Bannard
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * -------------------------------------------------------------------------
 * File: c:\localdev\crypto\blockchain-distronet\frontend\vite.config.ts
 *
 * Author: Christian Bannard
 * Created: 2025-01-13
 *
 * Description: Vite configuration.
 * -------------------------------------------------------------------------
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 */

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
    port: 5173,
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
  build: {
    sourcemap: true,
    outDir: "dist",
    assetsDir: "assets",
  },
});
