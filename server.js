const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./DB/mongoose');
var {User} = require('./models/User');
let port = 3000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.post('/user', function(req,res)  {
   var silence = new User({ 
         name: req.body.name,
         password: req.body.password,
          email: req.body.email
     });
     silence.save().then(doc, function (err, silence) {
          if (err) return console.error(err);
          JSON.parse(sience);
           console.log(silence); // 'Silence'
      
        });
     });  
    

     
     
     app.listen(port, () => {
     console.log('Server is up on port ' + port );
      });

      module.exports = {app};