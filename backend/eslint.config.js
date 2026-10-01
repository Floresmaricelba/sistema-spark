import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', '.vercel/**'],
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      'no-console': 'warn',
    },
  },
);
