import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ProgressProvider from '@/providers/progressProvider/ProgressProvider';
import RouterProgress from '@/providers/progressProvider/RouterProgress';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'PWA NextJS',
  description: "It's a simple progressive web application made with NextJS",
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'next14', 'pwa', 'next-pwa'],
  authors: [
    {
      name: 'imvinojanv',
      url: 'https://www.linkedin.com/in/imvinojanv/',
    },
  ],
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png' },
    { rel: 'icon', url: 'icons/icon-128x128.png' },
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  shrinkToFit: 'no',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      {/* <script
        type='text/javascript'
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
              c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "qvp4lsh5ng");`,
        }}
      /> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ProgressProvider>
          {/* <RouterProgress /> */}
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}
