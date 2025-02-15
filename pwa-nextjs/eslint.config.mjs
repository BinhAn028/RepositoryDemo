import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.ts', '**/*.tsx'], // Áp dụng cho các file TypeScript
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn', // Đặt thành cảnh báo
    },
  },
  {
    files: ['**/*.test.ts', '**/*.spec.ts'], // Chỉ áp dụng cho file test
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Tắt trong file test
    },
  },
];

export default eslintConfig;
