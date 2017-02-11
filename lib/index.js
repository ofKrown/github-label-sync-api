const RepositoryStore = require('./RepositoryStore');
const LabelStore = require('./LabelStore');

module.exports = {
	getAffilated: token => new Promise(async (resolve, reject) => {
		try {
			const store = new RepositoryStore(token);
			resolve(await store.getAll());
		} catch (e) {
			reject(e);
		}
	}),
	getRepository: (token, fullName) => new Promise(async (resolve, reject) => {
		try {
			const store = new RepositoryStore(token);
			resolve(await store.getRepository(fullName));
		} catch (e) {
			reject(e);
		}
	}),
	getLabels: (token, repositoryName) => new Promise(async (resolve, reject) => {
		try {
			const store = new LabelStore(token, repositoryName);
			resolve(await store.getAll());
		} catch (e) {
			reject(e);
		}
	}),
	createLabel: (token, repositoryName, label) => new Promise(async (resolve, reject) => {
		try {
			const store = new LabelStore(token, repositoryName);
			resolve(await store.createLabel(label));
		} catch (e) {
			reject(e);
		}
	}),
	updateLabel: (token, repositoryName, label) => new Promise(async (resolve, reject) => {
		try {
			const store = new LabelStore(token, repositoryName);
			resolve(await store.updateLabel(label));
		} catch (e) {
			reject(e);
		}
	}),
	deleteLabel: (token, repositoryName, labelName) => new Promise(async (resolve, reject) => {
		try {
			const store = new LabelStore(token, repositoryName);
			resolve(await store.deleteLabel(labelName));
		} catch (e) {
			reject(e);
		}
	}),
	createLabels: (token, repositoryName, labels) => new Promise(async (resolve, reject) => {
		try {
			const store = new LabelStore(token, repositoryName);
			resolve(await store.createLabels(labels));
		} catch (e) {
			reject(e);
		}
	}),
	updateLabels: (token, repositoryName, labels) => new Promise(async (resolve, reject) => {
		try {
			const store = new LabelStore(token, repositoryName);
			resolve(await store.updateLabels(labels));
		} catch (e) {
			reject(e);
		}
	}),
	deleteLabels: (token, repositoryName, labelNames) => new Promise(async (resolve, reject) => {
		try {
			const store = new LabelStore(token, repositoryName);
			resolve(await store.deleteLabels(labelNames));
		} catch (e) {
			reject(e);
		}
	}),
};
