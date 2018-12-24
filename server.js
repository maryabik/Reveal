// // app.js

// const express = require('express');
// const bodyParser = require('body-parser');

// const product = require('./routes/product.route'); // Imports routes for the products
// const app = express();

// // Set up mongoose connection
// const mongoose = require('mongoose');
// let dev_db_url = 'mongodb://someone:abcd1234@ds113435.mlab.com:13435/church';
// const mongoDB = process.env.MONGODB_URI || dev_db_url;
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use('/products', product);

// // Serve only the static files form the dist directory
// app.use(express.static(__dirname + '/dist/revealmfm'));

// app.get('/*', function(req,res) {
    
// res.sendFile(path.join(__dirname+'/dist/revealmfm/index.html'));
// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);

// app.listen(port, () => {
//     console.log('Server is up and running on port numner ' + port);
// });

// //app.js
// const express = require('express');
// const bodyParser = require('body-parser');


// // Imports routes for the products
// const app = express();

// let port = 1234;

// app.listen(port, () => {
//     console.log('Server is up and running on port numner ' + port);
// });

// //to connect to port another solution
// const express = require('express'),
//     path = require('path'),
//     bodyParser = require('body-parser'),
//     cors = require('cors'),
//     mongoose = require('mongoose');

//     const app = express();
//     let port = process.env.PORT || 4000;

//     const server = app.listen(function(){
//         console.log('Listening on port ' + port);
//     });

// server.js

// const express = require('express'),
//     path = require('path'),
//     bodyParser = require('body-parser'),
//     cors = require('cors'),
//     mongoose = require('mongoose'),
//     config = require('./DB');

// const businessRoute = require('./routes/business.route');
// mongoose.Promise = global.Promise;
// mongoose.connect(config.DB, { useNewUrlParser: true }).then(
//   () => {console.log('Database is connected') },
//   err => { console.log('Can not connect to the database'+ err)}
// );

// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended : false}));
// app.use(cors());
// app.use('/business', businessRoute);
// const port = process.env.PORT || 4000;

// const server = app.listen(port, function(){
//   console.log('Listening on port ' + port);
// });


const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if (err){
      console.log('unableto append to server.log')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log('Server is up on port ${port} ');
});
