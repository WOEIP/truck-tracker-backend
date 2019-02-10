'use strict';

const Router = require('koa-router');
const parser = require('koa-body');

const logger = require('../lib/logger.js');
const passport = require('koa-passport');

const knex = require('knex');

const Users = require('../models/users');

const Reports = require('../models/reports');

const parsers = {
  query: parser({urlencoded: true, multipart: false, json: false}),
  form: parser({urlencoded: false, multipart: true, json: false}),
  json: parser({urlencoded: false, multipart: false, json: true}),
};

const reports = new Router();

reports.get('/', async ctx => {
  ctx.body = await Reports.query();
});

reports.post('/', parsers.json, async ctx => {
  console.log('AUTHING');
  console.log(ctx.isAuthenticated());
  const user = await Users.query().findById('9b6cd0e6-5494-4593-84e0-1ee9a498db02');

  const knex = require('../lib/knex.js');
  const user2 = await knex('users').where({
    id: '9b6cd0e6-5494-4593-84e0-1ee9a498db02'
  });
  console.log('USER:');
  console.log(user);
  console.log('USER2:');
  console.log(user2);
  console.log('END');
  user.id = '9b6cd0e6-5494-4593-84e0-1ee9a498db02';
  await ctx.login(user);
  console.log(ctx.isAuthenticated());
  passport.authenticate('local', { failureRedirect: '/login' }),
  ctx.body = await Reports.query()
    .insert(ctx.request.body)
    .returning('*');
});

reports.get('/:id', async ctx => {
  ctx.body = await Reports.query().findById(ctx.params.id);
});

reports.patch('/:id', parsers.json, async (ctx, next) => {
  // TODO
  ctx.body = 'updated reports' + ctx.params.id;
  await next();
});

module.exports = reports;
