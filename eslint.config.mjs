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
     "@typescript-eslint/no-explicit-any": "warn",
     "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],   "react/react-in-jsx-scope": "off" ,
    "@typescript-eslint/ban-types": [
      "error",
      {
        "extendDefaults": true,
        "types": {
          "{}": false // Allow empty object type
        }
      }
    ]
  }
} 
]

export default eslintConfig;