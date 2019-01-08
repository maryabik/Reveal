var {ObjectID} = require('mongodb');

var {mongoose} = require('./../DB/mongoose');
var {User} = require('./../models/User');

User.deleteOne({ }, function (err, r) {
    console.log(r);
});

//A.findOneAndRemove(conditions)
//A.findByIdAndRemove() 
User.findByIdAndUpdate({id: 'jjjkjkj'}, function (err, r) {
    console.log(r);
});
