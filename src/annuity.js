exports.presentValue = function(pmt, inf, term){
  return pmt * (1 + inf) * term;
};
