// @ts-check
import eslintPluginAstro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**', 'public/**'],
  },
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.astro'],
    rules: {
      // Frontmatter script blocks and inline <script> tags are common in
      // this project's component/page structure.
      'astro/no-set-html-directive': 'warn',
    },
  },
];