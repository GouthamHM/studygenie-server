const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const ViewSchema  = new Schema({
    day:{type:String},
    phase:{
        type: String,
        enum:['Evening', 'Afternoon','Morning']
    },
    count: {type:Number},
    user:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
});
module.exports = mongoose.model("View",ViewSchema);