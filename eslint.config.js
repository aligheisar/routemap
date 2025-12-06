import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import globals from "globals";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  tseslint.configs.recommended,
  prettier,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
    },
  },
  globalIgnores(["**/dist/**"]),
]);
