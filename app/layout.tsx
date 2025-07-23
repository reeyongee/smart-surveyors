import type { Metadata, Viewport } from "next";
import "./globals.css";

// Optimized viewport configuration for 2024 mobile standards
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility
  minimumScale: 1,
  userScalable: true, // Don't disable zoom - accessibility requirement
  viewportFit: "cover", // For devices with notches/safe areas
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#db2225" },
    { media: "(prefers-color-scheme: dark)", color: "#db2225" },
  ],
  colorScheme: "light dark",
  interactiveWidget: "resizes-content", // Handle virtual keyboards properly
};

export const metadata: Metadata = {
  title: "Smart Surveyors - Professional Land Surveying Services",
  description:
    "Professional land surveying services with over 15 years of experience. Accurate, reliable, and efficient surveying solutions for your property needs. Serving residential, commercial, and industrial clients.",
  keywords: [
    "land surveying",
    "property surveying",
    "boundary surveys",
    "topographic surveys",
    "construction surveying",
    "ALTA surveys",
    "surveyor",
    "professional surveying services",
  ],
  authors: [{ name: "Smart Surveyors" }],
  creator: "Smart Surveyors",
  publisher: "Smart Surveyors",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smartsurveyors.com",
    siteName: "Smart Surveyors",
    title: "Smart Surveyors - Professional Land Surveying Services",
    description:
      "Professional land surveying services with over 15 years of experience. Accurate, reliable, and efficient surveying solutions.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Smart Surveyors - Professional Land Surveying Services",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Surveyors - Professional Land Surveying Services",
    description:
      "Professional land surveying services with over 15 years of experience.",
    images: ["/images/og-image.jpg"],
    creator: "@smartsurveyors",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://smartsurveyors.com",
  },
  category: "business",
  classification: "Professional Services",
  // Performance and mobile optimization
  other: {
    "mobile-web-app-capable": "yes",
    "mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Smart Surveyors",
    "application-name": "Smart Surveyors",
    "msapplication-TileColor": "#db2225",
    "msapplication-config": "/browserconfig.xml",
    // Performance hints
    "dns-prefetch-control": "on",
    // Security
    referrer: "origin-when-cross-origin",
    // Core Web Vitals optimization
    preconnect: "https://fonts.googleapis.com",
    "preconnect-crossorigin": "https://fonts.gstatic.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-inter">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preload critical fonts to improve LCP */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap"
          as="style"
        />

        {/* Load fonts with display=swap for better performance */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap"
        />

        {/* Fallback for browsers that don't support preload */}
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap"
          />
        </noscript>

        {/* Viewport height calculation script for mobile browsers */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setViewportHeight() {
                  const vh = window.innerHeight * 0.01;
                  document.documentElement.style.setProperty('--vh', vh + 'px');
                  
                  // Set dynamic viewport height variables
                  if (window.visualViewport) {
                    const dvh = window.visualViewport.height * 0.01;
                    document.documentElement.style.setProperty('--dvh', dvh + 'px');
                  }
                }
                
                // Set on load
                setViewportHeight();
                
                // Update on resize and orientation change
                window.addEventListener('resize', setViewportHeight);
                window.addEventListener('orientationchange', setViewportHeight);
                
                // Update on visual viewport changes (mobile keyboard, etc.)
                if (window.visualViewport) {
                  window.visualViewport.addEventListener('resize', setViewportHeight);
                }
                
                // Prevent zoom on double tap for better mobile UX
                let lastTouchEnd = 0;
                document.addEventListener('touchend', function (event) {
                  const now = (new Date()).getTime();
                  if (now - lastTouchEnd <= 300) {
                    event.preventDefault();
                  }
                  lastTouchEnd = now;
                }, false);
              })();
            `,
          }}
        />

        {/* Critical CSS for above-the-fold content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS for first paint optimization */
              html { 
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
              }
              body { 
                margin: 0; 
                padding: 0; 
                overflow-x: hidden;
                background-color: #ffffff;
                color: #000000;
              }
              .hero-section {
                background: linear-gradient(135deg, #db2225 0%, #a91b2e 100%);
                color: #ffffff;
                min-height: 100vh;
                min-height: 100dvh;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            `,
          }}
        />
      </head>
      <body className="font-inter">
        {children}

        {/* Service Worker registration for PWA capabilities */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('SW registered: ', registration);
                  }).catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
                });
              }
            `,
          }}
        />

        {/* Core Web Vitals measurement */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Measure Core Web Vitals
                function sendToAnalytics(metric) {
                  // Send to your analytics service
                  console.log('Core Web Vital:', metric);
                  
                  // Example: Send to Google Analytics 4
                  if (typeof gtag !== 'undefined') {
                    gtag('event', metric.name, {
                      event_category: 'Web Vitals',
                      event_label: metric.id,
                      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                      non_interaction: true,
                    });
                  }
                }
                
                // Load web-vitals library dynamically
                const script = document.createElement('script');
                script.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js';
                script.onload = function() {
                  if (window.webVitals) {
                    webVitals.onCLS(sendToAnalytics);
                    webVitals.onINP(sendToAnalytics);
                    webVitals.onLCP(sendToAnalytics);
                    webVitals.onFCP(sendToAnalytics);
                    webVitals.onTTFB(sendToAnalytics);
                  }
                };
                document.head.appendChild(script);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
