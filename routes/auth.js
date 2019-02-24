'use strict';

const Router = require('koa-router');
const parser = require('koa-body');

const passport = require('koa-passport');

const parsers = {
  query: parser({urlencoded: true, multipart: false, json: false}),
  form: parser({urlencoded: false, multipart: true, json: false}),
  json: parser({urlencoded: false, multipart: false, json: true}),
};

const auth = new Router();

auth.get('/', parsers.json, async ctx => {
    ctx.body = { loggedIn: ctx.isAuthenticated() };
});

auth.post('/login', parsers.json, async ctx => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.status = 200;
      console.log(ctx.isAuthenticated());
      ctx.body = 'Login successful';
    } else {
      ctx.status = 400;
      ctx.body = 'Bummer!';
    }
  })(ctx);
});

auth.post('/logout', parsers.json, async ctx => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.status = 200;
    ctx.body = 'Logout successful';
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

module.exports = auth;
