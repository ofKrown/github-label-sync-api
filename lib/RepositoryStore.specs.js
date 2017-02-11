require('chai').should();
const RepositoryStore = require('./RepositoryStore');
const config = require('./config');
const R = require('ramda');

describe('RepositoryStore', () => {
	let repoStore = null;
	before(() => {
		repoStore = new RepositoryStore(config.token);
	});

	it('should instantiate', () => {
		repoStore.should.be.an('object');
	});

	it('getAll should return repositories', async () => {
		const repos = await repoStore.getAll();
		repos.should.be.an('array');
		repos.length.should.be.above(1);
		R.head(repos).owner.should.be.an('object');
	});

	it('getRepository should return a repository', async () => {
		const repo = await repoStore.getRepository('bmatz/github-label-sync-api');
		repo.should.be.an('object');
		repo.owner.should.exist;
		repo.owner.should.be.an('object');
	});

	it('getRepository should throw an error if argument is missing', async () => {
		repoStore.getRepository.should.throw(Error);
	});

	it('getRepository should throw an error if argument has wrong format', async () => {
		const errorCall1 = () => { repoStore.getRepository('repo'); };
		const errorCall2 = () => { repoStore.getRepository('/repo'); };
		const errorCall3 = () => { repoStore.getRepository('repo/'); };
		errorCall1.should.throw(Error);
		errorCall2.should.throw(Error);
		errorCall3.should.throw(Error);
	});
});
