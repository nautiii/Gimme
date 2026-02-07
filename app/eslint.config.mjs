import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default defineConfig({
  extends: [js.configs.recommended],
  plugins: {
    "@typescript-eslint": tsPlugin,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  rules: {
    // your custom rules here
  },
});
