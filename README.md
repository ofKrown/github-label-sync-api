# github-label-sync-api

## Installation

```bash
$ yarn add github-label-sync-api
```

## API token

You will need a GitHub API token. You can create one here -> [https://github.com/settings/tokens](https://github.com/settings/tokens). Make sure to check 'repo - Full control of private repositories'

## async - await

github-label-sync-api uses async-await syntax. You will need to run your script with the **--harmony-async-await** flag.

e.g.:

```bash
$ node --harmony-async-await index.js
```

## Usage

```js
const api = require('github-label-sync-api');

const token = 'dummytoken';
const repositoryName = 'bmatz/github-label-sync-api';

// get affiliated repositories
const repositories = await api.getAffiliated(token);

// get specific repository (public or one of your affiliated repositories)
const repository = await api.getRepository(token, repositoryName);

// get a repositories issue labels
const labels = await api.getLabels(token, repositoryName);

// create a single label
await api.createLabel(token, repositoryName, {
  name: 'TestLabel',
  color: 'ff0011'
});

// create multiple labels
await api.createLabels(token, repositoryName, [{
  name: 'TestLabel',
  color: 'ff0011'
}, {
  name: 'TestLabel2',
  color: 'ff1111'
}]);


// update a single label
await api.updateLabel(token, repositoryName, {
  name: 'TestLabel',
  color: 'ff0022'
});

// update multiple labels
await api.updateLabels(token, repositoryName, [{
  name: 'TestLabel',
  color: 'ff0022'
}, {
  name: 'TestLabel2',
  color: 'ff1122'
}]);


// delete a single label
await api.deleteLabel(token, repositoryName, 'TestLabel');

// delete multiple labels
await api.deleteLabels(token, repositoryName, ['TestLabel', 'TestLabel2']);
```
