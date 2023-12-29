module.exports = {
	env: {
		browser: true,
		es2021: true,
		'jest/globals': 'true',
	},
	extends: ['airbnb-base', 'prettier'],
	overrides: [
		{
			env: {
				node: true,
				'jest/globals': true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['jest'],
	rules: {
		'no-plusplus': 'off',
		'eol-last': 'off',
		'max-len': ['error', 150, { ignoreUrls: true, ignoreComments: true }],
		'no-tabs': 'off',
		'no-alert': 'off',
		'prefer-destructuring': 'off',
		'indent': [2, 'tab'],
		'no-param-reassign': 'off',
		'linebreak-style': 'off',
		'no-unused-vars': 'off',
		'import/prefer-default-export': 'off',
	},
	settings: {
		"import/resolver": {
			"node": {
				"extensions": [".js", ".json"]
			}
		}
	}
};
