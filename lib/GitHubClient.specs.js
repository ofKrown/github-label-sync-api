require('chai').should();
const { expect } = require('chai');
const GitHubClient = require('./GitHubClient');

describe('GitHubClient', () => {
	it('should throw an error if token is missing', () => {
		GitHubClient.should.throw(Error);
	});

	it('should instantiate client', () => {
		const client = new GitHubClient('testtoken');
		client.should.exist;
	});

	it('should get mock client in test env', () => {
		const client = new GitHubClient('testtoken');
		if (process.env.NODE_ENV === 'test') {
			client.mock.should.be.true;
		} else {
			expect(client.mock).to.not.exist;
		}
	});
});
