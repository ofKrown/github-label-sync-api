module.exports = {
	extends: 'airbnb-base',
	plugins: [
		'mocha',
	],
	env: {
		node: true,
		mocha: true,
	},
	rules: {
		strict: [0, 'global'],
		indent: [1, 'tab', { SwitchCase: 1, VariableDeclarator: 1 }],
		'arrow-body-style': [2, 'as-needed'],
		'max-len': [2, 160, 2, {
			ignoreUrls: true,
			ignoreComments: false,
		}],
		'no-tabs': 0,
		'no-plusplus': 0,
		'object-shorthand': [0],
		'no-underscore-dangle': ['error', { allow: ['_id'], allowAfterThis: true, allowAfterSuper: true }],
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'import/named': 2,
		'mocha/no-exclusive-tests': 'error',
		'no-restricted-syntax': [
			'error',
			'ForInStatement',
			'labeledStatement',
			'WithStatement',
		],
		'no-await-in-loop': 0,
		'no-console': [1, { allow: ['warn'] }],
		'arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
		'no-unused-expressions': 0,
	},
};
