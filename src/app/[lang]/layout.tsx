import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { portfolioPage, siteUrl } from "@/app/composition-root";
import { localeOf } from "@/app/locale-param";
import { defaultLocale, isLocale, locales, type Locale } from "@/domain/i18n/locale";
import "../globals.css";

// SF Pro comes from the system on Apple platforms; Inter stands in elsewhere.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Open Graph names locales with an underscore and a region.
const openGraphLocale: Record<Locale, string> = { en: "en_US", "pt-BR": "pt_BR" };

// Every locale is prerendered; the proxy sends visitors to theirs.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const locale = await localeOf(params);
  const { profile } = portfolioPage(locale).portfolio;
  const title = `${profile.name} — ${profile.role}`;
  const description = profile.description;
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      // The root picks a language from the browser's, so it is the default.
      languages: {
        ...Object.fromEntries(locales.map((other) => [other, `/${other}`])),
        "x-default": "/",
      },
    },
    openGraph: {
      type: "profile",
      url: `/${locale}`,
      locale: openGraphLocale[locale],
      alternateLocale: locales.filter((other) => other !== locale).map((other) => openGraphLocale[other]),
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
}

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  // Any other segment still gets a document, and its page answers with a 404.
  return (
    <html
      lang={isLocale(lang) ? lang : defaultLocale}
      className={`${inter.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
