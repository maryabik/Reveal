// getting-started.js
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true,
        minlength: [3, 'Name too short'],
        maxlength: 12,
        trim: true,
        unique:true,
        index:true
      }
      // password: {
      //   type: String,
      //   required: true,
      //   trim: true,
     //    unique:true 
      // },
      // email: {
      //   type: String, 
      //   allowBlank: true,
      //   required: true,
      //   trim: true,
      //   unique:true
      // }
  });

  var User = mongoose.model('User', UserSchema);

//   var silence = new User({ 
//       name: 'Maryk',
//       password: 'admin',
//       email: 'mary345@gmail.com'
//  });
  
//   silence.save(function (err, silence) {
//     if (err) return console.error(err);
//     console.log(silence); // 'Silence'

//   });

//     var othersilence = new User({ 
//         name: 'Maryme',
//         password: 'admin',
//         email: 'mary345@gmail.com'
//    });
 
// othersilence.save(function (err, silence) {
//   if (err) return console.error(err);
//   console.log(othersilence); // 'Silence'

// });

module.exports = {User};