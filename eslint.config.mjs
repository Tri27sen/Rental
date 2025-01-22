import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});


const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Add custom rules or settings here if needed
    rules: {
      "@typescript-eslint/no-explicit-any": "error", // Prevent using `any` type
      "react/react-in-jsx-scope": "off", // Example: Turn off rule for React import in scope (Next.js doesn't need it)
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Warn for unused variables except those starting with "_"
    },
  },
];

export default eslintConfig;