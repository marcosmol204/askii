const { Schema } = require('mongoose');

const isRequired = { required: true };
const requiredString = { type: String, ...isRequired };
const requiredNumber = { type: Number, ...isRequired };
const requiredBool = { type: Boolean, ...isRequired };
const requiredMixed = { type: Schema.Types.Mixed, required: true };

module.exports = {
  requiredString,
  requiredBool,
  requiredNumber,
  requiredMixed,
};
