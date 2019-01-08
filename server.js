const express = require('express');
const bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./DB/mongoose');
var {User} = require('./models/User');

var app = express();
const port = process.env.PORT || 3000;

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

    app.get('/users/:id', (req, res) => {
      var id = req.params.id;
    
      if (!ObjectID.isValid(id)) {
        return res.status(404).send();
      }
    
      User.findById(id).then((user) => {
        if (!user) {
          return res.status(404).send();
        }
    
        res.send({user});
      }).catch((e) => {
        res.status(400).send();
      });
    });

    app.delete('/users/:id', (req, res) => {
      var id = req.params.id;
    
      if (!ObjectID.isValid(id)) {
        return res.status(404).send();
      }
    
      User.findByIdAndDelete(id).then((user) => {
        if (!user) {
          return res.status(404).send();
        }
    
        res.send(todo);
      }).catch((e) => {
        res.status(400).send();
      });
    });
    

    // app.get('/users/:id', (req, res) => {
    //     res.send(req.params)});
     
     app.listen(port, () => {
     console.log('Server is up on ' + [ port] );
      });

      module.exports = {app};