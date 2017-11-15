var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://' + process.env.MONGODB + ':27017/machines';
var http = require('http');
const express = require('express')
const app = express()
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  console.log('Received request for URL: ' + req.url);
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findMachines(db, function(machines) {
      res.render('index', { machines: machines })
      db.close();
    });
  });
})

app.listen(8080, () => console.log('Example app listening on port 8080!'))

var findMachines = function(db, callback) {
  var cursor = db.collection('machines').find();
  var machines = [];
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      console.log(JSON.stringify(doc))
      machines.push(doc);
    } else {
      callback(machines);
    }
  });
};
