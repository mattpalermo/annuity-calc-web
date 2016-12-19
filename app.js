var express = require('express');
var path = require('path');
var app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('app', {
    pmt: req.query.pmt,
    inf: req.query.inf,
    term: req.query.term,
    result: calculatePV(req.query.pmt, req.query.inf, req.query.term)
  });
});

function calculatePV(pmt, inf, term){
  return pmt * (1+inf) * term
}

app.listen(3000);
