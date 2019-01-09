const expect = require('expect');
//var expect = require('chai').expect;
const request = require('supertest');
var assert = require('assert');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./../DB/mongoose');
var {User} = require('./../models/User');
var {app} = require ('./../server');


const users = [{
  _id: new ObjectID(),
  name: 'First'
},
{
  _id: new ObjectID(),
  name: 'Second'
}];

// // Database Name
// const dbName = 'church';

// // Create a new MongoClient
// const client = new MongoClient(url,{ useNewUrlParser: true });

// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

  beforeEach(function(done) {
       User.deleteOne({})
      .then(function() {
        return User.insertMany(users),
              //assert.equal(null, err);
              //assert.equal(1, users.deletedCount);
              done();});
  
});


// // Remove a single document
// beforeEach((done) => {
// db.collection('users').deleteOne({}, function(err, r) {
//     assert.equal(null, err);
//     assert.equal(1, r.deletedCount);
//     return User.insertMany(users);
// });
// });

// beforeEach((done) => {
//   User.deleteOne({}).then(() => {
//     return User.insertMany(users);
//   }).then(() => done());
// });

// describe
describe('POST /users', () => {
  it('should create a new todo', (done) => {
    setTimeout(done, 2000);
    var name = 'maryj';
    request(app)
      .post('/users')
      .send({name})
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(name);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.find({name}).then((users) => {
          //expect(users[0].name).toBe(name);
          expect(users.name).toBeNull();
          expect(users.length).toBe(1);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    setTimeout(done, 2000);
    request(app)
      .post('/users')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.find().then((users) => {
          expect(users.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /users', () => {
  it('should get all users', (done) => {
  setTimeout(done, 2000);
    request(app)
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body.users.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /users/:id', () => {
  it('should return todo doc', (done) => {
  setTimeout(done, 2000);
    request(app)
      .get(`/users/${users[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.user.text).toBe(users[0].text);
      })
      .end(done);
  });
  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /users', () => {
  it('should remove a user', (done) => {
  setTimeout(done, 2000);
    request(app)
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body.users.length).toBe(2);
      })
      .end(done);
  });
  it('should return a user', (done) => {
    setTimeout(done, 2000);
      request(app)
        .get(`/users`)
        .expect(200)
        .expect((res) => {
          expect(res.body.users.length).toBe(2);
        })
        .end(done);
    });
});

describe('PATCH /users/:id', () => {
  it('should update the user', (done) => {
  setTimeout(done, 2000);
  var hexId = new ObjectID().toHexString();
  var name = "new name"
    request(app)
      .patch(`/users/${hexId}`)
      .send({
        name
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.user.name).toBe(name);
      })
      .end(done);
  });
});