const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const TagSchema = new Schema({
    key:{type:String},
    value:{type: Number},
    user:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
});
module.exports = mongoose.model("Tag",TagSchema);