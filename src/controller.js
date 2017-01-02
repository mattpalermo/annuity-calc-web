// TODO: Try to seperate out the concern of converting the percentages into
//       ratios. At the moment it is done seperately in both calc() and
//       plot().

const annuity = require("./annuity");

// Takes string or undefined values
// Parses the text extracted from the user interface form input fields.
// Outputs:
//   empty: was the input field empty?
//   val: the interpretted value of the input field.
//   invalid: Was the input string invalid in some way? perhaps unable to be interpretted?
//   output: The text that should be put back into the text field.
function calc(p) {
	var val = {};
	var empty = {};
	var invalid = {};
	var out = {}; // text to be put back into the view.

	empty.growth = isEmpty(p.growth);
	empty.pmt = isEmpty(p.pmt);
	empty.term = isEmpty(p.term);
	empty.inf = isEmpty(p.inf);

	val.growth = parseFloat(p.growth);
	val.pmt = parseFloat(p.pmt);
	val.term = parseFloat(p.term);
	val.inf = empty.inf ? 0 : parseFloat(p.inf);

	invalid.growth = Number.isNaN(val.growth);
	invalid.pmt = Number.isNaN(val.pmt);
	invalid.term = Number.isNaN(val.term);
	invalid.inf = Number.isNaN(val.inf);
	invalid.any = invalid.growth || invalid.pmt || invalid.term || invalid.inf;

	out.growth = invalid.growth ? p.growth : val.growth.toString();
	out.pmt = invalid.pmt ? p.pmt : val.pmt.toString();
	out.term = invalid.term ? p.term : val.term.toString();
	if (empty.inf) {
		out.inf = "";
	} else {
		out.inf = invalid.inf ? p.inf : val.inf.toString();
	}

	if (invalid.any) {
		val.result = NaN;
		out.result = "";
	} else {
		var calc_params = {
			growth: val.growth * 0.01,
			inf: val.inf * 0.01,
			initPmtCond: {pmt: val.pmt, time: 0},
			initValCond: {val: 0, time: val.term},
			time: 0
		};
		val.result = annuity.value(calc_params);
		out.result = val.result.toString();
	}

	return {
		empty: empty,
		val: val,
		invalid: invalid,
		out: out
	};
}

function isEmpty(val) {
	return val === undefined || !val.trim();
}

// Generate the scatter plot data to render the scatterplot.
// Calc info should come straight from the return value of calc().
function plot(calcinfo) {
	if (calcinfo.invalid.any) return {
		valdata: {},
		pmtdata: {},
		xaxis: {
			min: 0,
			max: 1
		}
	};

	var params = {
		growth: calcinfo.val.growth * 0.01,
		inf: calcinfo.val.inf * 0.01,
		initPmtCond: {pmt: calcinfo.val.pmt, time: 0},
		initValCond: {val: 0, time: calcinfo.val.term},
		//time: val.term
	};
	var valdata = [{
		x: 0,
		y: calcinfo.val.result
	}];
	var pmtdata = [];

	for (var i = 1; i <= calcinfo.val.term; i++) {
		params.time = i;
		valdata.push({
			x: i,
			y: annuity.value(params)
		});
		pmtdata.push({
			x: i,
			y: annuity.pmt_value(params)
		});
	}

	return {
		valdata: valdata,
		pmtdata: pmtdata,
		xaxis: {
			min: 0,
			max: calcinfo.val.term
		}
	};
}

exports.calc = calc;
exports.plot = plot;
