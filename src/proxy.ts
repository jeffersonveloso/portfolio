import { NextResponse, type NextRequest } from "next/server";
import { isLocale, locales } from "@/domain/i18n/locale";
import { preferredLocale } from "@/infrastructure/http/preferred-locale";

// Every page lives under its locale (/en, /pt-BR). A path without one goes to
// the locale the browser asks for, and a locale typed in another case
// (/pt-br) goes to its canonical spelling.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, segment = ""] = pathname.split("/");
  if (isLocale(segment)) return;

  const url = request.nextUrl.clone();
  const spelled = locales.find((locale) => locale.toLowerCase() === segment.toLowerCase());
  if (spelled) {
    url.pathname = `/${spelled}${pathname.slice(segment.length + 1)}`;
    return NextResponse.redirect(url, 308);
  }

  const locale = preferredLocale(request.headers.get("accept-language"));
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  // The redirect depends on the visitor's languages, so caches must key on them.
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  // Pages only: not Next.js internals or files such as the CV and images.
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
