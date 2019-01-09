// getting-started.js
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// Connection URL
const url = 'mongodb://Mary:diamond45@ds145194.mlab.com:45194/church';

mongoose.connect( process.env.MONGODB_URI || url, {
   useNewUrlParser: true,
   useCreateIndex: true,
   autoIndex: false
}).then(
       () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

   //  //heroku
   //  process.env.NODE_ENV === 'production'

   //  //locally
   //  process.env.NODE_ENV === 'development'

   //  //moka
   //  process.env.NODE_ENV === 'test'

    module.exports = {mongoose};


    // "test": "node ./node_modules/mocha/bin/mocha --timeout 20000",