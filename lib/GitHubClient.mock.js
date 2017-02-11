const { repo, label } = require('./GitHubClient.mock.data.js');
const R = require('ramda');

class GitHubClientMock {
	constructor(token, multiplePages = false) {
		if (!token) {
			throw new Error('Oauth2 authentication requires a token or key & secret to be set');
		}
		this.token = token;
		this.multiplePages = multiplePages;
		this.page = 1;
		this.mock = true;
		this.baseLabel = label;
		this.labels = [label, label];
	}

	getNextPage() {
		this.page = 2;
		// based on mode return page 2 repos or labels
		if (this.mode === 'repos') {
			return Promise.resolve([repo]);
		}
		return Promise.resolve([label]);
	}

	hasNextPage() {
		return this.multiplePages && this.page === 1;
	}

	get repos() {
		return {
			getAll: () => {
				this.page = 1;
				this.mode = 'repos';
				return Promise.resolve([repo, repo]); // return mock repos
			},
			get: () => Promise.resolve(repo), // return mock repo
		};
	}

	get issues() {
		return {
			getLabels: () => {
				this.page = 1;
				this.mode = 'labels';
				return Promise.resolve(this.labels); // return mock labels
			},
			updateLabel: (token, reponame, labelObj) => {
				const foundLabel = R.find(l => l.name === labelObj.name)(this.labels);
				this.labels = R.filter(l => l.name !== labelObj.name, this.labels);
				this.labels.push(Object.assign({}, foundLabel, labelObj));
				return Promise.resolve(true);
			},
			createLabel: (token, reponame, labelObj) => {
				this.labels.push(Object.assign({}, this.baseLabel, labelObj));
				return Promise.resolve(true);
			},
			deleteLabel: (token, reponame, labelName) => {
				this.labels = R.filter(l => l.name !== labelName, this.labels);
				return Promise.resolve(true);
			},
		};
	}
}

module.exports = GitHubClientMock;
