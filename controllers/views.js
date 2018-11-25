const User = require('../models/users');
const View = require('../models/view');

exports.getViews = function(req,res,next){
    const userId = req.params.userId;
    var data = {
        z :[
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ],
        x:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        y:['Morning','Afternoon','Evening'],
        type: 'heatmap'
    };

    User.findById(userId, (err, user) => {
        View.find({user: req.user}).sort({value:-1}).limit(5).populate({path: 'user'}).exec(function (err, tags) {
            var len = tags.length;
            tags.forEach(function (tag) {
            var day_index = data.x.indexOf(tag.day);
            var y_index = data.y.indexOf(tag.phase);
            data.z[y_index][day_index] = tag.count
            len =len-1
        });
        if (len==0){
            res.status(200).send(data);
        }

        });
    });
};
