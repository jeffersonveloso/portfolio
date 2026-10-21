"use client";

import { createContext, use, type ReactNode } from "react";
import type { SectionNavigator } from "@/application/ports/section-navigator";

const SectionNavigatorContext = createContext<SectionNavigator | null>(null);

/** Hands the page's components the SectionNavigator the app chose. */
export function SectionNavigatorProvider({
  navigator,
  children,
}: {
  navigator: SectionNavigator;
  children: ReactNode;
}) {
  return <SectionNavigatorContext value={navigator}>{children}</SectionNavigatorContext>;
}

export function useSectionNavigator(): SectionNavigator {
  const navigator = use(SectionNavigatorContext);
  if (!navigator) throw new Error("useSectionNavigator needs a SectionNavigatorProvider above it.");
  return navigator;
}
