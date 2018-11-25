const User = require('../models/users');
const Logins = require('../models/login');
const Note = require('../models/note');
exports.getNotes = function(req,res,next){
    const userId = req.params.userId;
        User.findById(userId, (err, user) => {
        Note.find({user: req.user}).populate({path: 'user'}).exec(function (err, notes) {
            res.status(200).send(notes);
        });
    });
};
exports.getNotesById = function(req,res,next){
    const userId = req.params.userId;
        User.findById(userId, (err, user) => {
        Note.find({_id:req.params.id,user: req.user}).populate({path: 'user'}).exec(function (err, notes) {
            if(err){
                res.status(403).sednd({status:false});
            }else{res.status(200).send(notes);}
        });
    });
};
exports.getClassNotes = function(req,res,next){
    Note.find({class:req.params.id}, function(err,notes){
        res.status(200).send(notes);
    });
};

exports.addNote = function(req,res,next){
    User.findOne({_id: req.user._id}, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            var newVote = new Note({
                date: req.body.date,
                title: req.body.title,
                className:req.body.className,
                mdText:req.body.mdText,
                class: req.body.classId,
                user: existingUser._id
            });
            newVote.save();
            res.status(200).send(newVote);
        }
    });
}

exports.editNote = function(req,res,next){
    User.findOne({_id: req.user._id}, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            Note.findOneAndUpdate({_id:req.params.id},req.body,{upsert:false},function(err, note){
                if (err){
                    res.status(200).send({"status":false})
                }else{
                    res.status(200).send(note);
                }
            });
        }
    });
}
exports.deleteNote = function(req,res,next){
    User.findOne({_id: req.user._id}, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            Note.findOneAndRemove({_id:req.params.id},{upsert:false},function(err, note){
                if (err){
                    res.status(200).send({"status":false});
                }else{
                    res.status(200).send({"status":true})
                }
            });
        }
    });
}