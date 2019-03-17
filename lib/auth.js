const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('../lib/knex.js');
const bcrypt = require('bcryptjs');

//Passport functions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  knex('users').where({
    id: id
  }).then((user) => {
    done(null, user);
  });
});

const strategyOptions = {};

passport.use(new LocalStrategy(strategyOptions, (username, password, done) => {
  knex('users').where({
    username: username
  }).first()
  .then((user) => {
    if (!user) {
        return done(null, false);
    }
    if (password === user.pw_hash) {
      return done(null, user);
    } else {
      console.log(bcrypt.compareSync(password, user.pw_hash));
      return done(null, false);
    }
  })
  .catch((err) => { return done(err); });
}));

// Custom auth functions
let Auth = {};

Auth.doLogin = function () {
  // Do a bunch of cool stuff after passport authentication.
  return 0;
}

module.export = Auth;
