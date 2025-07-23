import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    "Professional land surveying services with over 15 years of experience. Accurate, reliable, and efficient surveying solutions for your property needs.",
  keywords:
    "land surveying, property surveying, boundary surveys, topographic surveys, construction surveying, ALTA surveys",
  authors: [{ name: "Smart Surveyors" }],
  creator: "Smart Surveyors",
  publisher: "Smart Surveyors",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smartsurveyors.com",
    title: "Smart Surveyors - Professional Land Surveying Services",
    description:
      "Professional land surveying services with over 15 years of experience. Accurate, reliable, and efficient surveying solutions.",
    siteName: "Smart Surveyors",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Surveyors - Professional Land Surveying Services",
    description:
      "Professional land surveying services with over 15 years of experience.",
  },
  // Mobile optimization meta tags
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external font services for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* Mobile optimization meta tags */}
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        <meta name="apple-touch-fullscreen" content="yes" />

        {/* Performance hints */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="font-inter antialiased bg-white text-black overflow-x-hidden">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
