import type { Metadata } from "next";
import { Newsreader, Work_Sans } from "next/font/google";

import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const SITE_URL = "https://aramzor.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aramzor - Breathwork App for Anxiety, Sleep & Energy",
    template: "%s | Aramzor",
  },
  description:
    "Science-backed breathing exercises for anxiety relief, better sleep, and natural energy. The Aramzor Method combines Tibetan Tummo, Kundalini pranayama, and Stanford HRV research into one proprietary protocol. Free trial. $8/month.",
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
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Aramzor",
    title: "Aramzor - Breathwork for Anxiety, Sleep & Natural Energy",
    description:
      "Science-backed breathing exercises that earn your calm. One proprietary method. Five modes. Combines Tibetan Tummo, Kundalini pranayama, and Stanford HRV research. Free trial.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aramzor - Force in. Peace out.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aramzor - Breathwork for Anxiety, Sleep & Natural Energy",
    description:
      "Science-backed breathing exercises that earn your calm. One method. Five modes. $8/month.",
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
    <html
      lang="en"
      className={`${newsreader.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">{children}</body>
    </html>
  );
}
