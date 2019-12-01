const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

mongoose.Promise = global.Promise;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

process.env.NODE_ENV && process.env.NODE_ENV === 'DEV' ? mongoose.set('debug', true) : '';

module.exports = mongoose;
