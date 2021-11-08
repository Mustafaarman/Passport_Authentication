const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
const User = require("./model/userModel.js")


const authentication = function authentication() {
  passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      else if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      else if (user.password == password) {
        return done(null, user);
      }
      else{
        return done(err)
      }
      
    });
  }
));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      })
  })
}


module.exports = authentication;