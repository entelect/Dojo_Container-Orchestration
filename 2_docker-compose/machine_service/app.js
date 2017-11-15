var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://' + process.env.MONGODB + ':27017/machines';
var os = require('os')

var update = function(db, callback) {
  db.collection('machines')
    .updateOne({
        "hostname": os.hostname()
      }, {
        "hostname": os.hostname(),
        "type": os.type(),
        "platform": os.platform(),
        "arch": os.arch(),
        "release": os.release(),
        "uptime": os.uptime(),
        "loadavg": os.loadavg(),
        "totalmem": os.totalmem(),
        "freemem": os.freemem(),
        "cpus": os.cpus(),
        "networkinterfaces": os.networkInterfaces()
      }, {
        upsert: true
      },
      (err, result) => {
        assert.equal(err, null);
        console.log("Updated information for ", os.hostname())
        callback();
      });
};

MongoClient.connect(url)
  .then((db) => {
    console.log("Connected correctly to server.");
    setInterval(() => {
      update(db, () => {})
    }, process.env.INTERVAL);
    // db.close();
  })
  .catch((err) => console.error(err))
