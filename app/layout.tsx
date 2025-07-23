import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#db2225",
  colorScheme: "light",
  viewportFit: "cover", // For devices with notches
};

export const metadata: Metadata = {
  title: "Smart Surveyors - Professional Land Surveying Services",
  description:
    "Professional land surveying services with over 15 years of experience. We provide precise boundary surveys, building set-outs, AutoCAD drafting, and more.",
  keywords:
    "land surveying, boundary surveys, building set-out, AutoCAD drafting, professional surveyors, property mapping, GPS precision",
  authors: [{ name: "Smart Surveyors" }],
  creator: "Smart Surveyors",
  publisher: "Smart Surveyors",
  formatDetection: {
    telephone: false, // Disable automatic phone number detection
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Smart Surveyors",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Smart Surveyors",
    "application-name": "Smart Surveyors",
    "msapplication-TileColor": "#db2225",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#db2225",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon0.svg", sizes: "any", type: "image/svg+xml" },
      { url: "/icon1.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap"
          as="style"
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />

        {/* Preconnect to critical third-party origins */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Mobile-specific meta tags */}
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Prevent automatic scaling on iOS */}
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />

        {/* iOS Safari specific */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Smart Surveyors" />

        {/* Windows Phone specific */}
        <meta name="msapplication-TileColor" content="#db2225" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Disable automatic translation */}
        <meta name="google" content="notranslate" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
