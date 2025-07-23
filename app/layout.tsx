import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Surveyors",
  description:
    "Trusted land surveyors delivering precision, clarity, and results for over 15 years.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Smart Surveyors" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500&family=Manrope:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white font-manrope">{children}</body>
    </html>
  );
}
