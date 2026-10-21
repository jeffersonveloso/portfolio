import type { SVGProps } from "react";

// One stroke family for every icon: 24px grid, 1.75 stroke, square caps.
function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M7 17 17 7M9 7h8v8" />
    </Icon>
  );
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Icon>
  );
}

export function Copy(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M9 9h11v11H9z" />
      <path d="M15 9V4H4v11h5" />
    </Icon>
  );
}

export function Check(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Icon>
  );
}

export function ArrowUp(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 20V5M6 11l6-6 6 6" />
    </Icon>
  );
}

export function Expand(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
    </Icon>
  );
}

export function Close(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Icon>
  );
}

export function Mail(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M3 5h18v14H3z" />
      <path d="m3 6 9 7 9-7" />
    </Icon>
  );
}

// GitHub's mark in the same stroke (Lucide's outline, round-capped like the
// original so the tail reads).
export function GitHub(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </Icon>
  );
}

export function LinkedIn(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M3 3h18v18H3z" />
      <path d="M8 10.5V17M8 7v.01M12 17v-6.5M12 13.25c0-1.8 1.2-2.75 2.5-2.75S17 11.4 17 13.25V17" />
    </Icon>
  );
}
