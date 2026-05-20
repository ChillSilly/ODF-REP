import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AutoTracker } from "./components/AutoTracker";
import CustomCursor from "./components/CustomCursor";
import GlobalSpotlight from "./components/GlobalSpotlight";

const inter = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "ODF — Options Data Flow",
  description: "Comprehensive study guide on regime detection, Hidden Markov Models, volatility analysis, and trading applications.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable} ${raleway.variable}`}>
      <body className="gradient-animate">
        <div className="noise-overlay" />
        <GlobalSpotlight />
        <CustomCursor />
        <Navbar />
        <AutoTracker />
        {children}
      </body>
    </html>
  );
}
