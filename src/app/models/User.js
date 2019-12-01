const mongoose = require('../../../database');
const { cryptoHelper, uuidHelper } = require('../../helpers');

const userSchema = new mongoose.Schema({
  'id': {
    'type': String,
    'require': true
  },
  'nome': {
    'type': String,
    'require': true
  },
  'email': {
    'type': String,
    'unique': true,
    'required': true,
    'lowercase': true
  },
  'senha': {
    'type': String,
    'required': true,
    'select': false
  },
  'salt': {
    'type': String,
    'select': false
  },
  'token': {
    'type': String,
    'default': null
  },
  'data_criacao': {
    'type': Date,
    'default': Date.now
  },
  'data_atualizacao': {
    'type': Date,
  },
  'ultimo_login': {
    'type': Date,
    'default': Date.now
  }
});

userSchema.pre('save', function (next) {

  // Hash Password
  const hashed = cryptoHelper.encrypt(this.senha);
  this.senha = hashed.hash;
  this.salt = hashed.salt;

  // Generate UUID
  this.id = uuidHelper.generate(this.email);

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
