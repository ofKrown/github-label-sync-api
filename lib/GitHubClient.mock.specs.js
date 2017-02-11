require('chai').should();
const GitHubClient = require('./GitHubClient.mock.js');
const mockRepo = require('./GitHubClient.mock.data.js').repo;
const mockLabel = require('./GitHubClient.mock.data.js').label;
const R = require('ramda');

describe('GitHubClient Mock', () => {
	let client = null;
	let multiPageClient = null;

	before(() => {
		client = new GitHubClient('testtoken');
		multiPageClient = new GitHubClient('testtoken', true);
	});

	it('should throw an error if token is missing', () => {
		GitHubClient.should.throw(Error);
	});

	it('should instantiate client', () => {
		client.should.exist;
	});

	it('should switch modes', async () => {
		await client.repos.getAll();
		client.mode.should.equal('repos');
		await client.issues.getLabels();
		client.mode.should.equal('labels');
	});

	describe('SinglePage Client', () => {
		describe('repos', () => {
			it('get should return an object', async () => {
				const repo = await client.repos.get();
				repo.should.be.an('object');
				repo.id.should.equal(mockRepo.id);
			});

			it('getAll should return an array with 2 items', async () => {
				const repos = await client.repos.getAll();
				repos.should.be.an('array');
				repos.length.should.equal(2);
				const uniqRepos = R.uniq(R.map(r => r.id, repos));
				uniqRepos.length.should.equal(1);
				R.head(uniqRepos).should.equal(mockRepo.id);
			});

			it('hasNextPage should return false', async () => {
				await client.repos.getAll();
				const hasNextPage = client.hasNextPage();
				hasNextPage.should.be.false;
			});
		});

		describe('issues', () => {
			it('getLabels should return an array with 2 items', async () => {
				const labels = await client.issues.getLabels();
				labels.should.be.an('array');
				labels.length.should.equal(2);
				const uniqLabels = R.uniq(R.map(r => r.id, labels));
				uniqLabels.length.should.equal(1);
				R.head(uniqLabels).should.equal(mockLabel.id);
			});

			it('hasNextPage should return false', async () => {
				await client.issues.getLabels();
				const hasNextPage = client.hasNextPage();
				hasNextPage.should.be.false;
			});

			it('createLabel should resolve', async () => {
				const label = { name: 'TestLabel', color: '123456' };
				const result = await client.issues.createLabel('dummytoken', 'dummy/repo', label);
				result.should.be.true;
				client.issues.deleteLabel('dummytoken', 'dummy/repo', 'TestLabel');
			});

			it('createLabel should actually add a label', async () => {
				const label = { name: 'TestLabel', color: '123456' };
				const result = await client.issues.createLabel('dummytoken', 'dummy/repo', label);
				result.should.be.true;
				client.labels.length.should.equal(3);
				client.issues.deleteLabel('dummytoken', 'dummy/repo', 'TestLabel');
				client.labels.length.should.equal(2);
			});

			it('updateLabel should resolve', async () => {
				const label = { name: 'TestLabel', color: '123456' };
				await client.issues.createLabel('dummytoken', 'dummy/repo', label);
				const result = await client.issues.updateLabel('dummytoken', 'dummy/repo', label);
				result.should.be.true;
				client.issues.deleteLabel('dummytoken', 'dummy/repo', 'TestLabel');
			});

			it('updateLabel should acutally update a label', async () => {
				const label = { name: 'TestLabel', color: '123456' };
				await client.issues.createLabel('dummytoken', 'dummy/repo', label);
				label.color = '123457';
				const result = await client.issues.updateLabel('dummytoken', 'dummy/repo', label);
				result.should.be.true;
				const foundLabel = R.find(l => l.name === label.name)(client.labels);
				foundLabel.color.should.equal(label.color);
				client.issues.deleteLabel('dummytoken', 'dummy/repo', 'TestLabel');
			});

			it('deleteLabel should resolve', async () => {
				const label = { name: 'TestLabel', color: '123456' };
				await client.issues.createLabel('dummytoken', 'dummy/repo', label);
				const result = await client.issues.deleteLabel('dummytoken', 'dummy/repo', 'TestLabel');
				result.should.be.true;
			});

			it('deleteLabel should actually delete a label', async () => {
				const label = { name: 'TestLabel', color: '123456' };
				await client.issues.createLabel('dummytoken', 'dummy/repo', label);
				client.labels.length.should.equal(3);
				const result = await client.issues.deleteLabel('dummytoken', 'dummy/repo', 'TestLabel');
				result.should.be.true;
				client.labels.length.should.equal(2);
			});
		});
	});

	describe('MultiPage Client', () => {
		it('should reset paging', async () => {
			await multiPageClient.repos.getAll();
			multiPageClient.page.should.equal(1);
			await multiPageClient.getNextPage();
			multiPageClient.page.should.equal(2);
			await multiPageClient.issues.getLabels();
			multiPageClient.page.should.equal(1);
		});

		describe('repos', () => {
			it('hasNextPage should return true', async () => {
				await multiPageClient.repos.getAll();
				multiPageClient.hasNextPage().should.be.true;
			});

			it('getNextPage should return an array with 1 item', async () => {
				let repos = await multiPageClient.repos.getAll();
				repos = await multiPageClient.getNextPage();
				repos.should.be.an('array');
				repos.length.should.equal(1);
				R.head(repos).id.should.equal(mockRepo.id);
			});
		});

		describe('issues', () => {
			it('hasNextPage should return true', async () => {
				await multiPageClient.issues.getLabels();
				multiPageClient.hasNextPage().should.be.true;
			});

			it('getNextPage should return an array with 1 item', async () => {
				let labels = await multiPageClient.issues.getLabels();
				labels = await multiPageClient.getNextPage();
				labels.should.be.an('array');
				labels.length.should.equal(1);
				R.head(labels).id.should.equal(mockLabel.id);
			});
		});
	});
});
