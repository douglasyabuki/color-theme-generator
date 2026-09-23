import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],

    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["src/components/ui/*.tsx"],
    rules: {
      // shadcn shares variant factories and its sidebar hook alongside components.
      "react-refresh/only-export-components": [
        "error",
        {
          allowExportNames: [
            "buttonVariants",
            "badgeVariants",
            "tabsListVariants",
            "toggleVariants",
            "useSidebar",
          ],
        },
      ],
    },
  },
]);
