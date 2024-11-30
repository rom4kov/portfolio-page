import { defineConfig, loadEnv, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression2";
import { ViteMinifyPlugin } from "vite-plugin-minify";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = env.REACT_APP_ENV === "development" ? 5173 : 4173;
  return {
    define: {
      "process.env.REACT_APP_API_URL": JSON.stringify(env.REACT_APP_API_URL),
      "process.env.REACT_APP_ENV": JSON.stringify(env.REACT_APP_ENV),
    },
    plugins: [
      {
        name: "html-transform",
        transformIndexHtml(html) {
          return html.replace(
            `<div id="animation-wrapper">`,
            `<div class="loading-cube"></div>
             <div id="animation-wrapper">`
          );
        },
      } as PluginOption,
      react(),
      compression({
        algorithm: "gzip", // Use gzip compression
        filename: "[path][base].gz", // Set the filename template for compressed files
        threshold: 1024, // Minimum size (in bytes) for compression
        deleteOriginalAssets: false, // Keep original files (optional)
      }),
      compression({
        algorithm: "brotliCompress", // Use Brotli compression
        filename: "[path][base].br",
        threshold: 1024,
      }),
      ViteMinifyPlugin(),
    ],
    server: {
      port: port,
      strictPort: true,
      host: true,
    },
  };
});
