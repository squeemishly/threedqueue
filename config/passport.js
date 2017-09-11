var LocalStrategy   = require('passport-local').Strategy;

var Admin            = require('../app/models/admin');

module.exports = function(passport) {

  passport.serializeUser(function(admin, done) {
    done(null, admin);
  });

  passport.deserializeUser(function(admin, done) {
    done(null, admin);
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      process.nextTick(function() {
        Admin.findOne(email).then(function(data) {
          if (data.rowCount > 0) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {
            var newAdmin            = new Admin();
            newAdmin.email    = email;
            newAdmin.password = newAdmin.generateHash(password);
            newAdmin.save().then(data => {
              return done(null, newAdmin)
            })
          }
        });
      });
  }));

  passport.use('local-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      Admin.findOne(email).then(function(data) {
        if (data.rowCount < 1)
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        if (!Admin.validPassword(password, data.rows[0].password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        return done(null, data.rows[0]);
      });
    }));
};
