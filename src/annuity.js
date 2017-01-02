"use strict";

// TODO: Document the domains in which this method of evaluation yeilds
//       significant error.

/*
params.growth;
params.inf;
params.initValCond.val;
params.initValCond.time;
params.initPmtCond.pmt;
params.initPmtCond.time;
params.time;
*/
// handle the params.inf === -1 case.
function value_graduated(p) {
	if (p.inf === undefined || p.inf === 0) {
		return value_simple({
			growth: p.growth,
			pmt: p.initPmtCond.pmt,
			initValCond: p.initValCond,
			time: p.time
		});
	}

	let gdash = (1 + p.growth) / (1 + p.inf) - 1;
	let j = p.time - p.initValCond.time;
	let pmtAtK = pmt_value({
		initPmtCond: p.initPmtCond,
		inf: p.inf,
		time: p.initValCond.time
	});

	let p_simple = {
		growth: gdash,
		pmt: pmtAtK,
		initValCond: p.initValCond,
		time: p.time
	};
	return Math.pow(1 + p.inf, j) * value_simple(p_simple);
}

/*
params.initPmtCond.pmt;
params.initPmtCond.time;
params.inf;
params.time;
*/
function pmt_value(p) {
	return p.initPmtCond.pmt * Math.pow(1 + p.inf, p.time - p.initPmtCond.time);
}

/*
params.growth;
params.pmt;
params.initValCond.val;
params.initValCond.time;
params.time;
*/
function value_simple(p) {
	if (p.growth === undefined || p.growth === 0) {
		return p.initValCond.val - p.pmt * (p.time - p.initValCond.time);
	}

	let pmtCap = p.pmt / p.growth;
	return (Math.pow(1 + p.growth, p.time - p.initValCond.time) *
		(p.initValCond.val - pmtCap)) + pmtCap;
}

exports.value = value_graduated;
exports.value_graduated = value_graduated;
exports.value_simple = value_simple;
exports.pmt_value = pmt_value;
