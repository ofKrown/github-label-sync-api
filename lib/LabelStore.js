const StoreBase = require('./StoreBase');

class LabelStore {
	constructor(token, repository) {
		const [owner, repositoryName] = repository.split('/');
		this.headers = {
			owner,
			repo: repositoryName,
			per_page: 100,
		};
		this.owner = owner;
		this.repositoryName = repositoryName;
		this.storeBase = new StoreBase(token, 'issues.getLabels', this.headers);
	}

	async createLabel(label, update) {
		return new Promise(async (resolve, reject) => {
			try {
				const options = {
					owner: this.owner,
					repo: this.repositoryName,
					name: label.name,
					color: label.color,
				};
				if (update) {
					options.oldname = label.name;
					await this.storeBase.client.issues.updateLabel(options);
				} else {
					await this.storeBase.client.issues.createLabel(options);
				}
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	}

	deleteLabel(labelName) {
		return new Promise(async (resolve, reject) => {
			try {
				const options = {
					owner: this.owner,
					repo: this.repositoryName,
					name: labelName,
				};
				await this.storeBase.client.issues.deleteLabel(options);
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	}

	deleteLabels(labelNames) {
		return new Promise(async (resolve, reject) => {
			try {
				if (labelNames.length) {
					for (let i = 0; i < labelNames.length; i++) {
						await this.deleteLabel(labelNames[i]);
					}
				}
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	}

	async updateLabel(label) {
		return this.createLabel(label, true);
	}

	async createLabels(labels, update) {
		return new Promise(async (resolve, reject) => {
			try {
				if (labels.length) {
					for (let i = 0; i < labels.length; i++) {
						if (update) {
							await this.updateLabel(labels[i]);
						} else {
							await this.createLabel(labels[i]);
						}
					}
				}
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	}

	async updateLabels(labels) {
		return this.createLabels(labels, true);
	}

	async getAll() {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await this.storeBase.getAll();
				this.labels = result;
				resolve(result);
			} catch (e) {
				reject(e);
			}
		});
	}
}

module.exports = LabelStore;
