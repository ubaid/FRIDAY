/* eslint-disable func-names */

const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
  name: { type: String },
  users: [ { user: { type: mongoose.Schema.ObjectId, ref: 'User' }, permissions: [ { type: String } ] } ],
}, { timestamps: true });

CompanySchema.methods.toWeb = function() {
  const json = this.toJSON();
  json.id = this._id;//this is for the front end
  return json;
};

module.exports = mongoose.model('Company', CompanySchema);
