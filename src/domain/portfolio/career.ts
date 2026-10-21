import type { Period } from "@/domain/portfolio/period";

export type Job = {
  readonly company: string;
  readonly role: string;
  readonly period: Period;
  readonly points: readonly string[];
};

export type Education = {
  readonly title: string;
  readonly place: string;
};
