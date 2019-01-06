const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./DB/mongoose');
var {User} = require('./models/User');
let port = 3000;

var app = express();

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));


app.post('/users', function(req,res)  {
   var silence = new User({ 
         name: req.body.name,
         // password: req.body.password,
         // email: req.body.email
     });
     silence.save().then(function (err, silence) {
          if (err) return console.error(err);
      console.log(silence); // 'Silence'
      
        });
     });  
    
     app.get('/users', (req, res) => {
      User.find().then((users) => {
        res.send({users});
      }, (e) => {
        res.status(400).send(e);
      })
    });
     
     app.listen(port, () => {
     console.log('Server is up on port ' + port );
      });

      module.exports = {app};