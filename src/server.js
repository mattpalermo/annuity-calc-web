var express = require('express');
var path = require('path');
var annuity = require('./annuity')
var app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res){
  res.render('app', {
    pmt: req.query.pmt,
    inf: req.query.inf,
    term: req.query.term,
    result: annuity.presentValue(parseFloat(req.query.pmt),
                                 parseFloat(req.query.inf),
                                 parseFloat(req.query.term))
  });
});

module.exports = app;
