'use strict';

const Router = require('koa-router');
const Incident = require('../models/Incident');

const incident = new Router();

incident.get('/', async (ctx, next) => {
  ctx.body = 'Hello World';
  await next();
});

incident.post('/', async (ctx, next) => {
  ctx.body = 'created a new incident';
  await next();
});

incident.get('/:id', async (ctx, next) => {
  ctx.body = 'incident ' + ctx.params.id;
  await next();
});

incident.patch('/:id', async (ctx, next) => {
  ctx.body = 'updated incident' + ctx.params.id;
  await next();
});

module.exports = incident;
