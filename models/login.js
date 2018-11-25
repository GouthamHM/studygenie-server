const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

const LoginSchema = new Schema({
    time:{
        type: Date
    },user:{
        type:Schema.Types.ObjectId,
        ref:'User'}
});
module.exports = mongoose.model('Login',LoginSchema);