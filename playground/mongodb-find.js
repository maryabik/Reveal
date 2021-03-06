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


// Insert multiple documents
db.collection("user").find({username: "mary"}).toArray(function(err, r) {
    assert.equal(null, err);
    console.log(r);

  client.close();
});
});
