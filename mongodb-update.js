//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')
const assert = require('assert');

// Connection URL
const url = 'mongodb://Mary:diamond45@ds145194.mlab.com:45194/church';

// Database Name
const dbName = 'church';

// Create a new MongoClient
const client = new MongoClient(url,{ useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

// Modify and return the modified document
db.collection('user').findOneAndUpdate(
    {_id: new ObjectID('5c265eafefe82e3ae1eccd65')}, 
    {$set: {username: "Mary"}}, {
    returnOriginal: false
}, function(err, r) {
  assert.equal(null, err);
  console.log(r);

 client.close();
});
});
