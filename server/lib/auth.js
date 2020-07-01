const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/UserModel');

passport.use(new LocalStrategy({usernameField: 'email'}, async(username, password, done) => {
    try{
        const user = await UserModel.findOne({email: username}).exec();
        if(!user) return done(null, false, {message: "Invalid username or password"});

        const passwordOK = await user.comparePassword(password);
        if(!passwordOK) return done(null, false, {message: "Invalid username or password"});

        return done(null, user);
    }catch(err){
        return done(err)
    }
}));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
    try{
        const user = await UserModel.findById({id}).exec();
        return done(null, user);
    }catch(err){
        return done(err);
    }
})

module.exports ={
    initialize: passport.initialize(),
    session: passport.session(),
    setUser: (req, res, next) => {
        res.locas.user = req.user;
        return next();
    }
}