const jwt = require('jsonwebtoken'),
      crypto = require('crypto'),
      User = require('../models/users'),
      Login = require('../models/login'),
      config = require('../config/main');

function generateToken(user){
  return jwt.sign(user,config.secret,{
    expiresIn: 1000000
  });
}

function setuserInfo(user){
  return {
    _id : user._id,
    firstName: user.profile.firstName,
    lastName : user.profile.lastName,
    email : user.email,
    dept : user.dept
  }
}

//Login

exports.login = function(req, res, next) {
  console.log(req.body);
  let userInfo = setuserInfo(req.user);
    User.findOne({_id: req.user._id},function(err,existingUser){
        if(err){return next(err);}
        if(existingUser) {
          var login = new Login({
              time: new Date(),
              user: existingUser._id
          });
          login.save();
        } });
    userInfo.token =  generateToken(userInfo);
  res.status(200).json(userInfo);
};


//Register

exports.register = function(req,res,next){
  console.log(res);
  const email = req.body.email,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        password = req.body.password;
  if(!email){
    return res.status(422).send({ error: 'You must enter an email address.'});
  }
  if(!firstName || !lastName){
    return res.status(422).send({ error: 'You must enter name'});
  }
  if(!password){
    return res.status(422).send({ error: 'You must enter a password'});
  }
  User.findOne({email: email},function(err,existingUser){
    if(err){return next(err);}
    if(existingUser){
      return res.status(422).send({error: 'Email already registered'})
    }
    let user = new User({
      email:email,
      password: password,
      profile: {firstName:firstName,lastName:lastName}
    });
    user.save(function(err,user){
      if(err){return next(err);}
      let userInfo = setuserInfo(user);
      res.status(201).json({
        token : 'bearer ' + generateToken(userInfo),
        user: userInfo
      });
    });
  });
};
