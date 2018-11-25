const passport = require('passport'),
      User = require('../models/users'),
      config = require('./main'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,

      LocalStrategy = require('passport-local');

const localOptions = {usernameField:'email'};

const localLogin = new LocalStrategy(localOptions,function(email,password,next){
  User.findOne({email:email},function(err,user){
    if(err){return next(err)}
    if(!user){
      return next(null, false, {error:'User account not found'})
    }
    user.comparePassword(password,function(err,isMatch){
      if(err) {return next(err);}
      if(!isMatch){
        return next(null,false, 'wrong creds given')
      }
      return next(null,user);
    });
  });
});

const jwtOptions = {
jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions,function(payload,done){
  User.findById(payload._id,function(err,user){
    if(err){return done(err,false);}
    if(user){
      done(null,user);
    }else{
      done(null,false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
