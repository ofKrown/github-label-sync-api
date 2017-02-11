require('chai').should();
const GitHubClient = require('./GitHubClient');

describe('GitHubClient', () => {
	it('should instantiate client', () => {
		const client = new GitHubClient('testtoken');
		client.should.exist;
	});
});
