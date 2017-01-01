// TODO: Document the domains in which this method of evaluation yeilds
//       significant error.
// All arguments are assumed to be a number
function pv(growth, pmt, term, inf = 0) {
	if (inf !== 0) {
		var gdash = (1 + growth) / (1 + inf) - 1;
		return pv(gdash, pmt, term, 0);
	} else {
		if (growth !== 0) {
			var tmp;
			tmp = pmt / growth;
			return Math.pow(1 + growth, term) * tmp - tmp;
		} else {
			return pmt * term;
		}
	}
}

exports.pv = pv;
