'use strict';

const Router = require('koa-router');
const Incident = require('../models/Incident');
const parser = require('koa-body');

const parsers = {
  query: parser({urlencoded: true, multipart: false, json: false}),
  form: parser({urlencoded: false, multipart: true, json: false}),
  json: parser({urlencoded: false, multipart: false, json: true}),
};

const incident = new Router();

incident.get('/', async (ctx, next) => {
  ctx.body = 'Hello World';
  await next();
});

incident.post('/', parsers.json, async (ctx, next) => {
  ctx.body = 'created a new incident';
  ctx.body += ctx.request.body;
  await next();
});

incident.get('/:id', async (ctx, next) => {
  ctx.body = 'incident ' + ctx.params.id;
  await next();
});

incident.patch('/:id', parsers.json, async (ctx, next) => {
  ctx.body = 'updated incident' + ctx.params.id;
  await next();
});

module.exports = incident;
