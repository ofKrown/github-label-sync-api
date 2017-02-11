require('chai').should();
const lib = require('./index');
const config = require('./config');
const R = require('ramda');

describe('Library', () => {
	it('getAffilated should return token affilated repositories', async () => {
		const repos = await lib.getAffilated(config.token);
		repos.should.be.an('array');
		repos.length.should.be.above(1);
	});

	it('getRepository should return repository', async () => {
		const repo = await lib.getRepository(config.token, 'bmatz/github-label-sync-api');
		repo.should.be.an('object');
		repo.owner.should.exist;
		repo.owner.should.be.an('object');
		repo.full_name.should.equal('bmatz/github-label-sync-api');
	});

	it('getLabels should return labels', async () => {
		const labels = await lib.getLabels(config.token, 'bmatz/github-label-sync-api');
		labels.should.be.an('array');
		labels.length.should.be.above(1);
		const label = R.head(labels);
		label.should.have.property('color');
		label.should.have.property('name');
	});

	it('createLabel should create label', async () => {
		// mockclient dose not support label create/udpate/delete
		if (config.env !== 'test') {
			let labels = await lib.getLabels(config.token, 'bmatz/github-label-sync-api');
			const label = R.head(labels);
			const newLabel = Object.assign({}, label);
			newLabel.name = 'TestLabel';
			await lib.createLabel(config.token, 'bmatz/github-label-sync-api', newLabel);
			labels = await lib.getLabels(config.token, 'bmatz/github-label-sync-api');
			const foundLabel = R.find(l => l.name === newLabel.name)(labels);
			foundLabel.name.should.equal(newLabel.name);
			foundLabel.color.should.equal(newLabel.color);
			await lib.deleteLabel(config.token, 'bmatz/github-label-sync-api', newLabel.name);
		}
	});

	it('updateLabel should update label', async () => {
		// mockclient dose not support label create/udpate/delete
		if (config.env !== 'test') {
			const newLabel = { name: 'TestLabel', color: 'ee0701' };
			await lib.createLabel(config.token, 'bmatz/github-label-sync-api', newLabel);
			newLabel.color = 'ee0702';
			await lib.updateLabel(config.token, 'bmatz/github-label-sync-api', newLabel);
			const labels = await lib.getLabels(config.token, 'bmatz/github-label-sync-api');
			const foundLabel = R.find(l => l.name === newLabel.name)(labels);
			foundLabel.name.should.equal(newLabel.name);
			foundLabel.color.should.equal(newLabel.color);
			await lib.deleteLabel(config.token, 'bmatz/github-label-sync-api', newLabel.name);
		}
	});

	it('deleteLabel should delete label', async () => {
		// mockclient dose not support label create/udpate/delete
		if (config.env !== 'test') {
			let labels = await lib.getLabels(config.token, 'bmatz/github-label-sync-api');
			const label = R.head(labels);
			const newLabel = Object.assign({}, label);
			newLabel.name = 'TestLabel';
			await lib.createLabel(config.token, 'bmatz/github-label-sync-api', newLabel);
			labels = await lib.getLabels(config.token, 'bmatz/github-label-sync-api');
			let foundLabel = R.find(l => l.name === newLabel.name)(labels);
			foundLabel.name.should.equal(newLabel.name);
			foundLabel.color.should.equal(newLabel.color);
			await lib.deleteLabel(config.token, 'bmatz/github-label-sync-api', newLabel.name);
			labels = await lib.getLabels(config.token, 'bmatz/github-label-sync-api');
			foundLabel = R.filter(l => l.name === newLabel.name, labels);
			foundLabel.should.exist;
			foundLabel.length.should.equal(0);
		}
	});
});
