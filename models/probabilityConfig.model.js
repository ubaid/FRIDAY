const mongoose 			= require('mongoose');
require('mongoose-double')(mongoose);

const SchemaTypes = mongoose.Schema.Types;
const { TE, to } = require('../services/util.service');

const ProbabilityConfigSchema = mongoose.Schema({
  field: { type: String },
  low: { type: SchemaTypes.Double },
  high: { type: SchemaTypes.Double },
}, { timestamps: true });

ProbabilityConfigSchema.methods.toWeb = function() {
  const json = this.toJSON();
  json.id = this._id;//this is for the front end
  return json;
};


const probabilityConfig = module.exports = mongoose.model('ProbabilityConfig', ProbabilityConfigSchema);
