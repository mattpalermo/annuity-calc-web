# Development Guide

Some information about hacking at the code.

## Development environment

Firstly, install dependencies and run an initial build with

```
npm install
```

Then run a server with automatic rebuild and refresh on file system changes with

```
npm run watch
```

## Tests

Run the test suit with

```
npm run test
```

Run the code linting suit with

```
npm run lint
```

DoIUse can be run with. It's ok if this fails, it provides some guidelines.

```
npm run lint:doiuse
```

## Bumping the version number

* Follow [semantic versioning](http://semver.org)
* Update package.json version property
* Update README 'running the server' section
