function run() {
	process.env.NODE_ENV = 'test';
	process.env.TOKEN = 'dummytoken';
	require('./base'); // eslint-disable-line
}

run();
