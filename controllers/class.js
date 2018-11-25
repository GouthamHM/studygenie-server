const User = require('../models/users');
const Logins = require('../models/login');
const Class = require('../models/class');
const Note = require('../models/note');
exports.getClass = function(req,res,next){
    const userId = req.params.userId;
        User.findById(userId, (err, user) => {
        Class.find({}, function(err, classes) {
            if(err){
                res.status(400).send({status:false});
            }
            res.status(200).send(classes);
        });
    });
};

exports.addClass= function(req,res,next){
    User.findOne({_id: req.user._id}, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            var newClass = new Class({
                className: req.body.className,
                classNo: req.body.classNo,
                
            });
            newClass.save();
            res.status(200).send(newClass);
        }
    });
}
exports.deleteClass= function(req,res,next){
    User.findOne({_id: req.user._id}, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            Class.findOneAndRemove({_id:req.params.id},{upsert:false},function(err, class1){
                Note.remove({class:req.params.id},function(err,notes){
                    if (err){
                        res.status(200).send({"status":false});
                    }else{
                        res.status(200).send({"status":true})
                    }
                });
                if (err){
                    res.status(200).send({"status":false});
                }else{
                    res.status(200).send({"status":true})
                }
            });
        }
    });
}
