'use strict';

const Router = require('koa-router');
const parser = require('koa-body');

const passport = require('koa-passport');

const parsers = {
  query: parser({urlencoded: true, multipart: false, json: false}),
  form: parser({urlencoded: false, multipart: true, json: false}),
  json: parser({urlencoded: false, multipart: false, json: true}),
};

const login = new Router();

login.post('/', parsers.json, async ctx => {
  console.log(ctx.request.body.username);
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.status = 200;
      ctx.body = 'Login successful';
    } else {
      ctx.status = 400;
      ctx.body = 'Bummer!';
    }
  })(ctx);
});

module.exports = login;
