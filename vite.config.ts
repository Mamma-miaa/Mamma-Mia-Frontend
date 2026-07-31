import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    svgr(),
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      // 토큰 없으면(로컬 빌드 등) 소스맵 업로드 생략
      disable: !process.env.SENTRY_AUTH_TOKEN,
      sourcemaps: {
        filesToDeleteAfterUpload: "./dist/**/*.map",
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
