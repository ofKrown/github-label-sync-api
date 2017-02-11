const fs = require('fs');
const path = require('path');
const os = require('os');

const readTokenFromFile = (filepath) => {
	let token = fs.readFileSync(filepath).toString().trim();
	token = token.replace(/[\t\r\n]/g, '');
	return token;
};

function run() {
	process.env.NODE_ENV = 'production';
	const homedir = os.homedir();
	const filepath = path.join(homedir, '.githubtoken');
	process.env.TOKEN = readTokenFromFile(filepath);
	require('./base'); // eslint-disable-line
}

run();
