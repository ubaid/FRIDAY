const mongoose 			= require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
const {TE, to}          = require('../services/util.service');

let ProbabilityConfigSchema = mongoose.Schema({
    field: {type:String},
    low:  {type:SchemaTypes.Double},
    high:  {type:SchemaTypes.Double},
}, {timestamps: true});

ProbabilityConfigSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};


let probabilityConfig = module.exports = mongoose.model('ProbabilityConfig', ProbabilityConfigSchema);

