const GitHubAPI = require('github');
const GitHubClientMock = require('./GitHubClient.mock');
const config = require('./config');

function GitHubClient(token) {
	const github = new GitHubAPI(Object.assign({}, {
		version: '3.0.0',
		headers: {
			'user-agent': 'bmatz/github-sync',
		},
		timeout: 5000,
		protocol: 'https',
	}));

	github.authenticate({
		type: 'oauth',
		token,
	});

	return github;
}

module.exports = config.env === 'test' ? GitHubClientMock : GitHubClient;
