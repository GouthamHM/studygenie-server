const User = require('../models/users');
const Requests = require('../models/requests');
const setUserInfo = require('./helper').setUserInfo;
const setRequestInfo = require('./helper').setRequestInfo;
    exports.addRequest = function (req, resp, next) {
  const userId = req.user._id;
  User.findOne({_id: userId},function(err,existingUser){
    if(err){return next(err);}
    if(existingUser){
        var request = new Requests({
          will_give:req.body.will_give,
          need:req.body.need,
          user:existingUser._id
        });
        request.save(function(err,res){
          return resp.status(200).send({request: request})
        });
    }
  });
};

exports.getRequests = function(req,res,next){
  Requests.find().populate({ path: 'user' }).exec(function (err,requests){
    res.status(200).send(setRequestInfo(requests));
  });
};
