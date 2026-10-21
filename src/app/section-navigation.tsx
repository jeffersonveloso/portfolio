"use client";

import type { ReactNode } from "react";
import { HashSectionNavigator } from "@/infrastructure/browser/hash-section-navigator";
import { SectionNavigatorProvider } from "@/presentation/navigation/section-navigator-context";

// The browser half of the composition root: the SectionNavigator port is
// served by the anchor-based adapter.
const navigator = new HashSectionNavigator();

export function SectionNavigation({ children }: { children: ReactNode }) {
  return <SectionNavigatorProvider navigator={navigator}>{children}</SectionNavigatorProvider>;
}
