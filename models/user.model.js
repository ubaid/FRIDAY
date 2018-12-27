/* eslint-disable func-names */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bcryptP = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const validate = require('mongoose-validator');
const Company = require('./company.model');
const { throwError, to } = require('../services/util.service');
const config = require('../config/config');

const UserSchema = mongoose.Schema({
  first: { type: String },
  last: { type: String },
  phone: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    sparse: true, //sparse is because now we have two possible unique keys that are optional
    validate: [ validate({
      validator: 'isNumeric',
      arguments: [ 7, 20 ],
      message: 'Not a valid phone number.',
    }) ],
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
    validate: [ validate({
      validator: 'isEmail',
      message: 'Not a valid email.',
    }) ],
  },
  password: { type: String },
  status: { type: Boolean, default: false },
  role: { type: Number, default: 0 }, // 0: user,1:admin
}, { timestamps: true });

UserSchema.virtual('companies', {
  ref: 'Company',
  localField: '_id',
  foreignField: 'users.user',
  justOne: false,
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password') && !this.isNew) {
    return next();
  }

  let err;
  let salt;
  // eslint-disable-next-line prefer-const
  [ err, salt ] = await to(bcrypt.genSalt(10));
  if (err) {
    throwError(err.message, true);
  }

  let hash;
  // eslint-disable-next-line prefer-const
  [ err, hash ] = await to(bcrypt.hash(this.password, salt));
  if (err) {
    throwError(err.message, true);
  }

  this.password = hash;
  return 0;
});

UserSchema.methods.comparePassword = async function(pw) {
  if (!this.password) {
    throwError('password not set');
  }

  const [ err, pass ] = await to(bcryptP.compare(pw, this.password));
  if (err) {
    throwError(err);
  }

  if (!pass) {
    throwError('invalid password');
  }

  return this;
};

UserSchema.methods.Companies = async function() {
  const [ err, companies ] = await to(Company.find({ 'users.user': this._id }));
  if (err) {
    throwError('err getting companies');
  }
  return companies;
};

UserSchema.virtual('full_name').set(function(name) {
  [ this.first, this.last ] = name.split(' ');
});

UserSchema.virtual('full_name').get(function() { //now you can treat as if this was a property instead of a function
  if (!this.first) {
    return null;
  }

  if (!this.last) {
    return this.first;
  }

  return `${ this.first } ${ this.last }`;
});

UserSchema.methods.getJWT = function() {
  const expirationTime = parseInt(config.jwt.expiration, 10);
  return `Bearer ${ jwt.sign({ user_id: this._id }, config.jwt.encryption, { expiresIn: expirationTime }) }`;
};

UserSchema.methods.toWeb = function() {
  const json = this.toJSON();
  json.id = this._id;//this is for the front end
  return json;
};

// eslint-disable-next-line
const User = module.exports = mongoose.model('User', UserSchema);
