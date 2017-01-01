const ctrl = require("./controller");

// Calculate present value when inputs are changed.
var form = document.getElementById("calcform");
var elPmt = document.getElementById("pmt");
var elInf = document.getElementById("inf");
var elGrowth = document.getElementById("growth");
var elTerm = document.getElementById("term");
var elPv = document.getElementById("pv");

[elPmt, elInf, elTerm, elGrowth].forEach(function(itm) {
	itm.addEventListener("input", inputsChanged);
	itm.addEventListener("change", inputsChanged);
});

function inputsChanged() {
	if (form.reportValidity()) recalc();
}

function recalc() {
	var calcinfo;
	calcinfo = ctrl.calc(elGrowth.value, elPmt.value, elTerm.value,
		elInf.value);
	elPv.textContent = calcinfo.out.result;
}
