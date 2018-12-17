module.exports = function(callback) {
  var MongoClient = require('mongodb').MongoClient;
  const ObjectId = require('mongodb').ObjectId;
  var uri = "REMOVED FOR PRIVACY";
  MongoClient.connect(uri, callback)

}
