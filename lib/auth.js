const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/users');

const options = {};

passport.serializeUser((user, done) => {
    console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('HERE 1');
  Users.query().findById(ctx.params.id).then(function(user) {
    console.log('user: ');
    console.log(user);
    console.log('END');
    done(null, user);
  });
});

passport.use(new LocalStrategy(options, (username, password, done) => {
  console.log('HERE 2');
  return done(null, user);
  // knex('users').where({ username }).first()
  // .then((user) => {
  //   if (!user) return done(null, false);
  //   if (password === user.password) {
  //     return done(null, user);
  //   } else {
  //     return done(null, false);
  //   }
  // })
  // .catch((err) => { return done(err); });
}));
