// Apple's two button grammars (DESIGN-APPLE.md): blue pills for actions and
// compact utility rects. Every press shrinks to 95%.
const pill =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-[22px] py-[11px] text-[17px] leading-none transition-[transform,background-color] duration-150 active:scale-95";

export const button = {
  primary: `${pill} bg-action text-white hover:bg-action-hover`,
  ghost: `${pill} border border-action text-action hover:bg-action/5`,
  ghostOnDark: `${pill} border border-sky text-sky hover:bg-sky/10`,
};

export const textLink = "text-action hover:underline";
export const textLinkOnDark = "text-sky hover:underline";

export const tile = {
  light: "bg-canvas text-graphite",
  parchment: "bg-parchment text-graphite",
  dark: "bg-tile-1 text-white",
  dark2: "bg-tile-2 text-white",
  dark3: "bg-tile-3 text-white",
};

// Section rhythm: 80px of air inside each tile, 48px on small phones.
export const section = "px-5 py-12 sm:px-8 md:py-20";

export const type = {
  hero: "text-[28px] leading-[1.07] font-semibold tracking-[-0.015em] min-[420px]:text-[34px] min-[641px]:text-[40px] min-[1069px]:text-[56px] min-[1069px]:tracking-[-0.005em]",
  displayLg: "text-[32px] leading-[1.1] font-semibold tracking-[-0.01em] md:text-[40px] md:tracking-normal",
  displayMd: "text-[28px] leading-[1.2] font-semibold tracking-[-0.011em] md:text-[34px]",
  lead: "text-[21px] leading-[1.3] font-normal md:text-[28px] md:leading-[1.14] md:tracking-[0.007em]",
  tagline: "text-[21px] leading-[1.19] font-semibold tracking-[0.011em]",
  taglineRegular: "text-[21px] leading-[1.3] font-normal tracking-[0.011em]",
  bodyStrong: "text-[17px] leading-[1.24] font-semibold tracking-[-0.022em]",
  caption: "text-[14px] leading-[1.43] tracking-[-0.016em]",
  captionStrong: "text-[14px] leading-[1.29] font-semibold tracking-[-0.016em]",
  fine: "text-[12px] leading-none tracking-[-0.01em]",
};
