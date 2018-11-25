const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const VoteSchema  = new Schema({
    day:{type:Number},
    type:{type:String},
    class:{type:String},
    count :{type:Number},
    user:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
});
module.exports = mongoose.model("Vote",VoteSchema);