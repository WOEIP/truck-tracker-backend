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
  console.log('HERE');
//  console.log(ctx.request);
  console.log(ctx.isAuthenticated());
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
