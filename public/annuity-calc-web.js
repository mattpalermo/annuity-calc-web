// Calculate present value when inputs are changed.
var form = document.getElementById('calcform');
var pmt = document.getElementById('pmt');
var inf = document.getElementById('inf');
var term = document.getElementById('term');
var pv = document.getElementById('pv');

[pmt, inf, term].forEach(function(itm){
  itm.addEventListener('input', inputsChanged);
  itm.addEventListener('change', inputsChanged);
});

function inputsChanged(){
  if (form.reportValidity()) recalc();
}

function recalc(){
  var pmtV = pmt.valueAsNumber;
  var infV = inf.valueAsNumber;
  var termV = term.valueAsNumber;
  var pvV = presentValue(pmtV, infV, termV);
  document.getElementById('pv').textContent = pvV;
}

function presentValue(pmt, inf, term){
  return pmt * (1+inf) * term;
}
