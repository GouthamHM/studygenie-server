const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const ClassSchema = new Schema({
    className:{type:String},
    classNo:{type:String}   
});
module.exports = mongoose.model("Class",ClassSchema);