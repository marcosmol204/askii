const mongoose = require('mongoose');

const { Schema } = mongoose;


const UserSchema = new Schema({
    email: { ...requiredString, unique:true},
    password: requiredString,
    firstName: requiredString,
    lastName: requiredString,
    lastName: requiredString,
    phoneNumber: { type: String ,required:false}
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
