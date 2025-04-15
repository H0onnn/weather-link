import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.config({
    extends: ['next'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          args: 'after-used',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      'no-undef': 'error',
    },
    settings: {
      next: {
        rootDir: '/',
      },
    },
  }),
];

export default eslintConfig;
