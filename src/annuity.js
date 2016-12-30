function presentValue(pmt, inf, term){
	return pmt * (1 + inf) * term;
}

exports.presentValue = presentValue;
