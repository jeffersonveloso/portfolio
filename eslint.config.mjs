import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Clean Architecture's dependency rule: each layer may only import the
// layers inside it. domain ← application ← infrastructure | presentation ← app.
const layer = (name) => [`@/${name}`, `@/${name}/**`];
const frameworks = ["react", "react/**", "react-dom", "react-dom/**", "next", "next/**"];
const boundary = (files, forbidden, message) => ({
  files,
  rules: {
    "no-restricted-imports": ["error", { patterns: [{ group: forbidden, message }] }],
  },
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  boundary(
    ["src/domain/**"],
    [...layer("application"), ...layer("infrastructure"), ...layer("presentation"), ...layer("app"), ...frameworks],
    "The domain is plain TypeScript and depends on nothing outside itself.",
  ),
  boundary(
    ["src/application/**"],
    [...layer("infrastructure"), ...layer("presentation"), ...layer("app"), ...frameworks],
    "The application layer depends only on the domain; adapters implement its ports.",
  ),
  boundary(
    ["src/infrastructure/**"],
    [...layer("presentation"), ...layer("app")],
    "Infrastructure implements ports; it never reaches up into the UI or the app.",
  ),
  boundary(
    ["src/presentation/**"],
    [...layer("infrastructure"), ...layer("app")],
    "Presentation talks to ports, not adapters; the app layer wires them in.",
  ),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored agent tooling.
    ".claude/**",
  ]),
]);

export default eslintConfig;
