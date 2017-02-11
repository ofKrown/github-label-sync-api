const GitHubAPI = require('github');

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

module.exports = GitHubClient;
