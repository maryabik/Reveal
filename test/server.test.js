const expect = require('expect');
//var expect = require('chai').expect;
const request = require('supertest');
//var assert = require('assert');

var {mongoose} = require('./../DB/mongoose');
var {User} = require('./../models/User');
var {app} = require ('./../server');


beforeEach((done) => {
    User.deleteOne({}).then(() => done());
  });

// describe
describe('POST /User', () => {
    it('should create a new user', (done) => {
      var name = 'Test todo text';
  
      request(app)
        .post('/User')
        .send({name})
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe(name);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          User.find().then((User) => {
            expect(User.length).toBe(1);
            expect(User[0].name).toBe(name);
            done();
          }).catch((e) => done(e));
        });
    });
  
    it('should not create todo with invalid body data', (done) => {
      request(app)
        .post('/User')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          User.find().then((User) => {
            expect(User.length).toBe(0);
            done();
          }).catch((e) => done(e));
        });
    });
  });
   