var {ObjectID} = require('mongodb');

var {mongoose} = require('./../DB/mongoose');
var {User} = require('./../models/User');

// var id = '57bf38394b39c93d2a557e9811';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// User.find({
//   _id: id
// }).then((users) => {
//   console.log('users', users);
// });
//
// User.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('User', user);
// });

// User.findById(id).then((user) => {
//   if (!user) {
//     return console.log('Id not found');
//   }
//   console.log('User By Id', user);
// }).catch((e) => console.log(e));

User.findById('5c30d73a65caf94f62f7e667').then((user) => {
    if (!user) {
      return console.log('Unable to find user');
    }
  console.log(user);
    //console.log(JSON.stringify(user, undefined, 3));
  }, (e) => {
    console.log(e);
  });
  