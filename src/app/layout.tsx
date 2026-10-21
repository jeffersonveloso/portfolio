import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { portfolioPage, siteUrl } from "@/app/composition-root";
import "./globals.css";

// SF Pro comes from the system on Apple platforms; Inter stands in elsewhere.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { profile } = portfolioPage.portfolio;
const title = `${profile.name} — ${profile.role}`;
const description = profile.description;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: "profile",
    locale: "en_US",
    title,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
