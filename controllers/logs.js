const User = require('../models/users');
const Log = require('../models/log');

exports.getLogs = function(req,res,next){
    const userId = req.params.userId;
    User.findById(userId, (err, user) => {
        Log.find({user: req.user}).populate({path: 'user'}).exec(function (err, logins) {
            res.status(200).send(logins);
        });
    });
};
exports.addLog = function (req,res,next) {
    User.findOne({_id: req.user._id},function(err,existingUser){
        if(err){return next(err);}
        if(existingUser) {
            var log = new Log({
                time: req.body.time,
                type: req.body.type,
                class: req.body.class,
                user: existingUser._id
            });
            log.save();
        } });
    res.status(200).json({"status":true});
};
