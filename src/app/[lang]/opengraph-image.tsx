import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { portfolioPage } from "@/app/composition-root";
import { localeOf } from "@/app/locale-param";
import { defaultLocale } from "@/domain/i18n/locale";
import { getDictionary } from "@/presentation/i18n/dictionaries";
import { glow } from "@/presentation/keyboard/layout";

// Name and role read the same in every locale.
const { profile: owner } = portfolioPage(defaultLocale).portfolio;

export const alt = `${owner.name}, ${owner.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const KEY = 76;

// Share card in the home page's language: a white Apple tile, the name and
// role, and a strip of keycaps spelling the name in the stripe colours.
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await localeOf(params);
  const { profile } = portfolioPage(locale).portfolio;
  const { availability } = getDictionary(locale);
  const name = profile.name.split(" ")[0].toUpperCase();
  const fontsDir = join(process.cwd(), "src/app/og-fonts");
  const [semibold, regular] = await Promise.all([
    readFile(join(fontsDir, "Inter-SemiBold.woff")),
    readFile(join(fontsDir, "Inter-Regular.woff")),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#ffffff",
        color: "#1d1d1f",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", fontSize: 76, fontWeight: 600, letterSpacing: -2 }}>{profile.name}</div>
      <div style={{ display: "flex", marginTop: 8, fontSize: 34, fontWeight: 400 }}>{profile.role}.</div>
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 48,
          padding: 22,
          borderRadius: 30,
          background: "#e3e4e8",
          boxShadow: "3px 5px 30px rgba(0,0,0,0.22)",
        }}
      >
        {name.split("").map((letter, i) => {
          const { lit, legend } = glow[i % glow.length];
          return (
            <div
              key={i}
              style={{
                display: "flex",
                width: KEY,
                height: KEY,
                borderRadius: 12,
                padding: "6px 7px 12px",
                background: "rgba(0,0,0,0.18)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  borderRadius: 9,
                  background: lit,
                  color: legend,
                  fontSize: 26,
                  fontWeight: 600,
                }}
              >
                {letter}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 48,
          padding: "14px 30px",
          borderRadius: 9999,
          background: "#0066cc",
          color: "#ffffff",
          fontSize: 24,
        }}
      >
        {`${availability} · ${profile.location.country}, ${profile.location.timezone}`}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: semibold, style: "normal", weight: 600 },
        { name: "Inter", data: regular, style: "normal", weight: 400 },
      ],
    },
  );
}
