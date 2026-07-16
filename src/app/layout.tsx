import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";

import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://aramzor.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#000000" },
  ],
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aramzor - Breathwork App for Anxiety, Sleep & Energy",
    template: "%s | Aramzor",
  },
  description:
    "When panic hits, start with one breath. Science-backed breathwork for anxiety, sleep, and energy. Peace in. Stress out. Free trial. $8/month.",
  applicationName: "Aramzor",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Aramzor",
  },
  formatDetection: {
    telephone: false,
  },
  keywords: [
    "breathwork app",
    "breathing exercises for anxiety",
    "anxiety relief breathing",
    "box breathing",
    "4-7-8 breathing",
    "physiological sigh",
    "Wim Hof alternative",
    "coherence breathing",
    "breathing exercises for sleep",
    "natural high breathing",
    "pranayama app",
    "Tummo breathing",
    "HRV breathing",
    "breathwork for anxiety",
  ],
  authors: [{ name: "Aramzor" }],
  creator: "Aramzor",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Aramzor",
    title: "Aramzor - Breathwork for Anxiety, Sleep & Natural Energy",
    description:
      "When panic hits, start with one breath. One proprietary method. Five modes. Combines Tibetan Tummo, Kundalini pranayama, and Stanford HRV research. Free trial.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aramzor - Peace in. Stress out.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aramzor - Breathwork for Anxiety, Sleep & Natural Energy",
    description:
      "When panic hits, start with one breath. One method. Five modes. $8/month.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} h-full antialiased`}>
      <body className="min-h-full min-h-dvh flex flex-col bg-bg text-text font-body">
        {children}
      </body>
    </html>
  );
}
