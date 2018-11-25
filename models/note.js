const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const NoteSchema = new Schema({
    date:{type:String},
    title:{type:String},
    className:{type: String},
    mdText:{type:String},
    user:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    class:{
        type: Schema.Types.ObjectId,
        ref:'Class'
    }
});
module.exports = mongoose.model("Note",NoteSchema);