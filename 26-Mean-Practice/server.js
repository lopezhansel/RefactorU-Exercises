var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/breakinDB')
var app = express();


