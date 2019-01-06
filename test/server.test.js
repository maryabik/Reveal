const expect = require('expect');
//var expect = require('chai').expect;
const request = require('supertest');
var assert = require('assert');

var {mongoose} = require('./../DB/mongoose');
var {User} = require('./../models/User');
var {app} = require ('./../server');


const users = [{
  name: 'First'
}, {
  name: 'Second'
}];

beforeEach((done) => {
  User.deleteOne({}).then(() => {
    return User.insertMany(users);
  }).then(() => done());
});

// describe
describe('POST /users', () => {
 
  it('should create a new todo', (done) => {
    setTimeout(done, 2000);
    var name = 'maryjjj';


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
          expect(users.length).toBe(1);
          expect(users[0].name).toBe(name);
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