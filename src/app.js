const express = require("express");
const path = require("path");
const pug = require("pug");
const annuity = require("./annuity");

const app = express();
const view = pug.compileFile(
	path.join(__dirname, "./view.pug"), {compileDebug: false}
);

app.get("/", function(req, res) {
	var pmt = parseFloat(req.query.pmt);
	var inf = parseFloat(req.query.inf);
	var term = parseFloat(req.query.term);
	var result = annuity.presentValue(pmt, inf, term);
	res.send(view({
		pmt: pmt,
		inf: inf,
		term: term,
		result: result
	}));
});

module.exports = app;
