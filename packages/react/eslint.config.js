import { defineConfig } from "eslint/config";
import rootConfig from "../../eslint.config.js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  ...rootConfig,
  ...defineConfig([
    reactHooks.configs.flat["recommended-latest"],
    reactRefresh.configs.recommended,
  ]),
];
