const User = require('../models/users');
const Logins = require('../models/login');

exports.getLogins = function(req,res,next){
    const userId = req.params.userId;
        User.findById(userId, (err, user) => {
        Logins.find({user: req.user}).populate({path: 'user'}).exec(function (err, logins) {
            res.status(200).send(logins);
        });
    });
};
