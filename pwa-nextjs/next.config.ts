// import type { NextConfig } from "next";
import dayjs from 'dayjs';
import bundleAnalyzer from "@next/bundle-analyzer";
import nextPWA from 'next-pwa';

// import path from 'path';
// import fs from 'fs';
// import * as Terser from 'terser';

const nextConfig = {
  env: {
    BUILD_TIME: dayjs().toDate().toISOString(),
  },
  reactStrictMode: true, // Enable React strict mode for improved error handling
  // swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development', // Remove console.log in production
  },
  // experimental: {
  //   ppr: 'incremental' as any,
  // },
  images: {
    formats: ['image/avif', 'image/webp'] as any,
    // deviceSizes: [120, 320, 420, 768, 1024, 1200],
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
  // output: "export",
  trailingSlash: true,

  // webpack: (config: any, { isServer }: { isServer: any }) => {
  //     if (!isServer) {
  //         const swFilePath = path.resolve(__dirname, 'public/sw.js');

  //         // Minify the generated service-worker.js
  //         config.plugins.push({
  //             apply: (compiler: any) => {
  //                 compiler.hooks.done.tap('MinifySW', async () => {
  //                     if (fs.existsSync(swFilePath)) {
  //                         const swCode = fs.readFileSync(swFilePath, 'utf-8');
  //                         const minified: any = await Terser.minify(swCode);
  //                         if (minified.error) {
  //                             console.error('Error minifying service worker:', minified.error);
  //                         } else {
  //                             fs.writeFileSync(swFilePath, minified.code, 'utf-8');
  //                             console.log('Service Worker successfully minified!');
  //                         }
  //                     }
  //                 });
  //             },
  //         });
  //     }
  //     return config;
  // },
};

// export default nextConfig;

// Cấu hình Bundle Analyzer
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withPWA = nextPWA({
  dest: 'public', // destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // disable PWA in the development environment
  register: true, // register the PWA service worker
  skipWaiting: true, // skip waiting for service worker activation
});

// Xuất cấu hình Next.js
export default withBundleAnalyzer(withPWA(nextConfig) as any);
