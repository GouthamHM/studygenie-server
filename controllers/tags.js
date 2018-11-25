const User = require('../models/users');
const Tag = require('../models/tag');
const View = require('../models/view');
exports.getTags = function(req,res,next){
    const userId = req.params.userId;
    User.findById(userId, (err, user) => {
        Tag.find({user: req.user}).sort({value:-1}).limit(5).populate({path: 'user'}).exec(function (err, tags) {
            res.status(200).send(tags);
        });
    });
};

exports.addTag = function (req,res,next) {
    User.findOne({_id: req.user._id}, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            var tags = req.body.tags;
            var tag_list = tags.split(',');
            tag_list.forEach(function(tag_name) {
                if(tag_name){
                Tag.findOne({user: req.user, key: tag_name}, function (err, tag) {
                    if (err) {
                        console.log("error: not found");
                        res.status(500).json({"status": false})
                    }
                    if (tag) {
                        tag.value += 1;
                        tag.save();
                    }
                    //Add New Tag
                    else {
                        var newTag = new Tag({
                            key: tag_name,
                            value: 1,
                            user: existingUser._id
                        });
                        newTag.save();
                    }
                });
            }
            });
        var date = new  Date();
        var current_hour = date.getHours();
        var phase = '';
        if (5<current_hour && current_hour<12){
            phase= "Morning"
        }else if (12<current_hour && current_hour<17){
            phase = 'Afternoon'
        }else{
            phase = 'Evening'
        }
        var day = date.getDay();
        var month = date.getMonth();
        var day_str = '';
        switch (day){
            case 0:
                day_str = 'Sunday';
                break;
            case 1:
                day_str = 'Monday';
                break;
            case 2:
                day_str = 'Tuesday';
                break;
            case 3:
                day_str = 'Wednesday';
                break;
            case 4:
                day_str = 'Thursday';
                break;
            case 5: 
                day_str = 'Friday';
                break;
            case 6:
                day_str = 'Saturday';
                break;
        }
        View.findOne({user: req.user, day:day_str , phase:phase}, function (err, view) {
            if (err) {
                console.log("error: not found");
                res.status(500).json({"status": false})
            }
            if (view) {
                view.count += 1;
                view.save();
            }
            else{
                var newView = new View({
                    day: day_str,
                    count: 1,
                    phase: phase,
                    user: existingUser._id
                });
                newView.save();
            }

        });
    }
});
    res.status(200).json({"status": true});
};