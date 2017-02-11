const StoreBase = require('./StoreBase');

class RepositoryStore {
	constructor(token) {
		this.headers = {
			affilation: 'owner, organization_member',
			per_page: 100,
		};
		this.storeBase = new StoreBase(token, 'repos.getAll', this.headers);
	}

	getAll() {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await this.storeBase.getAll();
				this.repos = result;
				resolve(result);
			} catch (e) {
				reject(e);
			}
		});
	}

	getRepository(fullName) {
		if (!fullName) {
			throw new Error('missing argument: fullName, e.g.: owner/reponame');
		}
		const idx = fullName.indexOf('/');
		if (idx <= 0 || idx >= fullName.length - 1) {
			throw new Error('wrong argument format: fullName, e.g.: owner/reponame');
		}
		return new Promise(async (resolve, reject) => {
			try {
				const [owner, repo] = fullName.split('/');
				const result = await this.storeBase.client.repos.get({
					owner,
					repo,
				});
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = RepositoryStore;
