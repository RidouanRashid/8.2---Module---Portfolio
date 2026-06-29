import type { Metadata } from "next";
import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Bold condensed sport grotesque for headings (startlist / scoreboard energy).
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Clean sans for body.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

// Monospace for code snippets and the HUD.
const mono = JetBrains_Mono({ variable: "--font-jbmono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lane 2 — Ridouan Rashid",
  description:
    "Run a 400m hurdles race through a developer's eyes. A first-person, scroll-driven portfolio: projects line the track, hurdles are skills cleared, and the finish line reveals the athlete behind the code.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} ${mono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
