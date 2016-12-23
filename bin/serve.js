#!/usr/bin/env node

const app = require('../src/server.js');
const logger = require('morgan');
const express = require('express');

var port = 4000;
var server = express();
server.use(logger('dev'));
server.use(express.static('dist'));
server.use(app);
server.listen(port);
console.log('Listening on port ' + port);
