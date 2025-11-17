import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
	js.configs.recommended,
	...eslintPluginAstro.configs.recommended,
	...eslintPluginAstro.configs['flat/jsx-a11y-recommended'],
	{
		plugins: {
			'jsx-a11y': jsxA11y
		},
	},
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser
		}
	}
];
