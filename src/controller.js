const annuity = require("./annuity");

// Takes string or undefined values
function calc(growth, pmt, term, inf) {
	var val = {};
	var empty = {};
	var invalid = {};
	var out = {}; // text to be put back into the view.

	empty.growth = isEmpty(growth);
	empty.pmt = isEmpty(pmt);
	empty.term = isEmpty(term);
	empty.inf = isEmpty(inf);

	val.growth = parseFloat(growth);
	val.pmt = parseFloat(pmt);
	val.term = parseFloat(term);
	val.inf = empty.inf ? 0 : parseFloat(inf);

	invalid.growth = Number.isNaN(val.growth);
	invalid.pmt = Number.isNaN(val.pmt);
	invalid.term = Number.isNaN(val.term);
	invalid.inf = Number.isNaN(val.inf);

	out.growth = invalid.growth ? growth : val.growth.toString();
	out.pmt = invalid.pmt ? pmt : val.pmt.toString();
	out.term = invalid.term ? term : val.term.toString();
	if (empty.inf) {
		out.inf = "";
	} else {
		invalid.inf ? inf : val.inf.toString();
	}

	if (invalid.growth || invalid.pmt || invalid.term || invalid.inf) {
		val.result = NaN;
		out.result = "";
	} else {
		val.result = annuity.pv(growth * 0.01, pmt, term, inf * 0.01);
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

exports.calc = calc;
