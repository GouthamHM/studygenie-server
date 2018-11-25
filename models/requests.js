const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs');

const RequestSchema = new Schema({
  dept :{
    type: String,
    enum :['CS','CE','EE'],
    default: 'CS'
  },
  will_give:{
    type:String,
  },
  need:{
    type: String
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'}
  },
  {
  timestamps:true
});

module.exports = mongoose.model('Request',RequestSchema);
