const User = require('../models/users');
const Vote = require('../models/vote');

exports.addVote = function (req,res,next) {
    User.findOne({_id: req.user._id}, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            Vote.findOne({user: req.user, day: req.body.day, class: req.body.class}, function (err, vote) {
                if (err) {
                    console.log("error: not found");
                    res.status(500).json({"status": false})
                }
                if (vote) {
                    vote.count += 1;
                    vote.day = vote.day;
                    vote.save();
                }
                //Add New Vite
                else {
                    var newVote = new Vote({
                        class: req.body.class,
                        day: req.body.day,
                        count: 1,
                        user: existingUser._id
                    });
                    newVote.save();
                }
            });
        }
    });
    res.status(200).json({"status": true});
};

exports.getUpVotes = function(req,res,next){
    const userId = req.params.userId;
    var day = new Date();
    var date = day.getDate();
    User.findById(userId, (err, user) => {
        Vote.find({user: req.user,day:{$lt:date+1},class:'upvoteclicked'}).sort({day:1}).limit(5).populate({path: 'user'}).exec(function (err, votes) {
        res.status(200).send(votes);
    });
});
};