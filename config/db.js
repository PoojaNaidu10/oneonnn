'use strict';
var mongoose = require('mongoose');
const systemconfig = require('../systemgitconfig/systemconfig');

//Localhost settings
var config = {
  "db": "oneonn",
  "host": systemconfig.HOST,
  "user": systemconfig.USER_NAME,
  "pw": systemconfig.PASSWRORD,
  "port": 27017
};

var port = (config.port.length > 0) ? ":" + config.port : '';
var login = (config.user.length > 0) ? config.user + ":" + config.pw + "@" : '';
var uristring =  "mongodb://" + login + config.host + port + "/" + config.db;

var mongoOptions = { db: { safe: true }, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true };

// Connect to Database
console.log("uri--------",uristring);
mongoose.connect(uristring, { useNewUrlParser: true, useUnifiedTopology: true  },function (err, res) {
  if(err){
    //console.time('find')
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  }else{
    console.log('Successfully connected to: ' + uristring);
  }
});


exports.mongoose = mongoose;
