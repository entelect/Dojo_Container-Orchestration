var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://' + process.env.MONGODB + ':27017/machines';
const express = require('express')
const app = express()
app.set('view engine', 'pug')
app.locals.formatBytes = formatBytes
app.locals.formatLoadAverage = formatLoadAverage
app.locals.formatUptime = formatUptime

app.get('/', (req, res) => {
  console.log('Received request for URL: ' + req.url);
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    findMachines(db, function (machines) {
      res.render('index', { machines: machines })
      db.close();
    });
  });
})

app.listen(8080, () => console.log('Example app listening on port 8080!'))

var findMachines = function (db, callback) {
  var cursor = db.collection('machines').find();
  var machines = [];
  cursor.each(function (err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      console.log(JSON.stringify(doc))
      machines.push(doc);
    } else {
      callback(machines);
    }
  });
};

function formatBytes(a, b) {
  if (0 == a)
    return "0 Bytes";
  var c = 1024
  var d = b || 2
  var e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  var f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
}

function formatLoadAverage(loadAverage) {
  return parseFloat(loadAverage[0]).toPrecision(2) + ", " + parseFloat(loadAverage[1]).toPrecision(2) + ", " + parseFloat(loadAverage[2]).toPrecision(2)
}

function formatUptime(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

