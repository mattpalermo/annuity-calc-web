# annuity-calc-web

[![License:
MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A graduated annuity calculator web app. The application calculates the present
value of a graduated annuity and plots the value over time.

Feedback, support, questions and problem reports are welcome in the
[issue list](https://github.com/mattpalermo/annuity-calc-web/issues).

## Using the application

* Enter calculation inputs in the text fields provided.
* The calculated present value will be shown in the "Present Value" output.
* Various attributes of the annuity are plotted again time in the graph.

If JavaScript is disabled or not working correctly, you will find the following:

* The "Calculate" button needs to be clicked to run the calculation
* The graph will not be present or will not work.

## Running the Server

You will need to have [Node.js](https://nodejs.org/en/) installed to run the
application. You will also need a modern web browser.

[Download](https://github.com/mattpalermo/annuity-calc-web/releases) the
application package (`annuity-calc-web-[version].tgz`). Install the package
using

```
npm install -g annuity-calc-web-[version].tgz
```

Run the server using
```
annuity-calc-www --help
annuity-calc-www
```

Note, there is a small issue with the help output
([issue #29](https://github.com/mattpalermo/annuity-calc-web/issues/29)).

## Feedback & Contribution

Contributions of any shape, form and size are welcomed. Any feedback, support,
and in general any public discussion should be submitted to the
[issue list](https://github.com/mattpalermo/annuity-calc-web/issues).
To submit changes to the source, submit a GitHub pull request.

See the [development guide](doc/development-guide.md) for more information about
setting up a development environment, running tests, linting, etc.

## License

This project's source code is released under the MIT license. You can read the
full license text in the [LICENSE](LICENSE) file.
