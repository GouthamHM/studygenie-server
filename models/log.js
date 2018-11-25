const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const LogSchema  = new Schema({
   time:{type:Date} ,
    type:{type:String},
    class:{type:String},
    user:{
            type: Schema.Types.ObjectId,
            ref:'User'
        }
});
module.exports = mongoose.model("Log",LogSchema);