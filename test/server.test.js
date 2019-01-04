const expect = require('expect');
//var expect = require('chai').expect;
const request = require('supertest');
var assert = require('assert');

var {mongoose} = require('./../DB/mongoose');
var {User} = require('./../models/User');
var {app} = require ('./../server');


beforeEach((done) => {
    User.deleteOne({}).then(() => done());
  });

// describe
describe('POST /users', () => {
 
  it('should create a new todo', (done) => {
    setTimeout(done, 309);
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

        User.find().then((users) => {
          expect(users.length).toBe(1);
          expect(users[0].name).toBe(name);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    setTimeout(done, 309);
    request(app)
      .post('/users')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.find().then((todos) => {
          expect(users.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});
