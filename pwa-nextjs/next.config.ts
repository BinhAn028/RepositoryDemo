// import type { NextConfig } from "next";
import withPWA from 'next-pwa';
// import path from 'path';
// import fs from 'fs';
// import * as Terser from 'terser';

const nextConfig = {
    reactStrictMode: true, // Enable React strict mode for improved error handling
    // swcMinify: true, // Enable SWC minification for improved performance
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development"     // Remove console.log in production
    },
    output: "export",
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

export default withPWA({
    dest: "public", // destination directory for the PWA files
    swSrc: 'sw.js',
    // disable: process.env.NODE_ENV === "development",        // disable PWA in the development environment
    register: true, // register the PWA service worker
    skipWaiting: true, // skip waiting for service worker activation
})(nextConfig);