const mongoose 			= require('mongoose');
const { TE, to } = require('../services/util.service');

const CompanySchema = mongoose.Schema({
  name: { type: String },
  users: [ { user: { type: mongoose.Schema.ObjectId, ref: 'User' }, permissions: [ { type: String } ] } ],
}, { timestamps: true });

CompanySchema.methods.toWeb = function() {
  const json = this.toJSON();
  json.id = this._id;//this is for the front end
  return json;
};

const company = module.exports = mongoose.model('Company', CompanySchema);
