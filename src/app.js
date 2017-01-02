const express = require("express");
const path = require("path");
const pug = require("pug");
const ctrl = require("./controller");

const app = express();
const view = pug.compileFile(
	path.join(__dirname, "./view.pug"), {compileDebug: false}
);

app.get("/", function(req, res) {
	var pmt = req.query.pmt;
	var term = req.query.term;
	var growth = req.query.growth;
	var inf = req.query.inf;

	var calcinfo = ctrl.calc({
		growth: growth,
		pmt: pmt,
		term: term,
		inf: inf
	});

	res.send(view({
		pmt: calcinfo.out.pmt,
		term: calcinfo.out.term,
		growth: calcinfo.out.growth,
		inf: calcinfo.out.inf,
		result: calcinfo.out.result
	}));
});

module.exports = app;
