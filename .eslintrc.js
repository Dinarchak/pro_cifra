module.exports = {
    parser: '@typescript-eslint/parser', // Используем парсер для TypeScript
    parserOptions: {
      ecmaVersion: 2020, // Поддержка современных возможностей JS
      sourceType: 'module', // Используем ES-модули
      ecmaFeatures: {
        jsx: true, // Поддержка JSX
      },
    },
    settings: {
      react: {
        version: 'detect', // Автоматически определяет версию React
      },
    },
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    plugins: ['react', '@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
    ],
    rules: {
      // 🔧 Твои кастомные правила ниже
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/react-in-jsx-scope': 'off', // Не нужен в React 17+
      'react/prop-types': 'off', // Не нужен с TypeScript
    },
  };
  