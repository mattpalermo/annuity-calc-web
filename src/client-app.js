"use strict";

const ctrl = require("./controller");
//const Chart = require("chart.js");
/* global Chart */

// Calculate present value when inputs are changed.
let form = document.getElementById("calcform");
let elPmt = document.getElementById("pmt");
let elInf = document.getElementById("inf");
let elGrowth = document.getElementById("growth");
let elTerm = document.getElementById("term");
let elPv = document.getElementById("pv");

let elChart = document.getElementById("outputchart");

let scatterChart = new Chart(elChart, {
	type: "line",
	data: {
		datasets: [{
			label: "Annuity Value",
			backgroundColor: "rgba(75, 192, 192, 0.2)",
			borderColor: "rgba(75, 192, 192, 1)",
			yAxisID: "val"
		},
		{
			label: "Payment rate",
			backgroundColor: "rgba(54, 162, 235, 0.2)",
			borderColor: "rgba(54, 162, 235, 1)",
			yAxisID: "pmt"
		}]
	},
	options: {
		scales: {
			xAxes: [{
				type: "linear",
				position: "bottom",
				ticks: {}
			}],
			yAxes: [
				{
					type: "linear",
					ticks: {
						beginAtZero: true
					},
					position: "left",
					id: "val",
					scaleLabel: {
						display: true,
						labelString: "Annuity Value"
					}
				},
				{
					type: "linear",
					ticks: {
						beginAtZero: true
					},
					position: "right",
					id: "pmt",
					scaleLabel: {
						display: true,
						labelString: "Payment amount"
					}
				}
			]
		}
	}
});

[elPmt, elInf, elTerm, elGrowth].forEach(function(itm) {
	itm.addEventListener("input", inputsChanged);
	itm.addEventListener("change", inputsChanged);
});

function inputsChanged() {
	if (form.reportValidity()) recalc();
}

recalc();

function recalc() {
	let calcinfo;
	calcinfo = ctrl.calc({
		growth: elGrowth.value,
		pmt: elPmt.value,
		term: elTerm.value,
		inf: elInf.value
	});
	elPv.textContent = calcinfo.out.result;

	let graphinfo = ctrl.plot(calcinfo);
	scatterChart.data.datasets[0].data = graphinfo.valdata;
	scatterChart.data.datasets[1].data = graphinfo.pmtdata;
	scatterChart.options.scales.xAxes[0].ticks.min = graphinfo.xaxis.min;
	scatterChart.options.scales.xAxes[0].ticks.max = graphinfo.xaxis.max;
	scatterChart.update();
}
