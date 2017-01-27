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
* Update [package.json](../package.json) version property
* Create tag with the format "v1.2.3" with a message with the format "version
  1.2.3". (This can be done in the GitHub web interface)
* Write some release notes in the GitHub releases section
* Upload the `annuity-calc-web-1.2.3.tgz` package to GitHub releases.
