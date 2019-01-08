// getting-started.js
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// Connection URL
const url = 'mongodb://Mary:diamond45@ds145194.mlab.com:45194/church';

mongoose.connect(url, { useNewUrlParser: true }).then(
       () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    module.exports = {mongoose};