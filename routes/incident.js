'use strict';

const Router = require('koa-router');
const parser = require('koa-body');

const Incident = require('../models/incident');

const parsers = {
  query: parser({urlencoded: true, multipart: false, json: false}),
  form: parser({urlencoded: false, multipart: true, json: false}),
  json: parser({urlencoded: false, multipart: false, json: true}),
};

const incident = new Router();

incident.get('/', async ctx => {
  ctx.body = await Incident.query();
});

incident.post('/', parsers.json, async ctx => {
  ctx.body = await Incident.query()
    .insert(ctx.request.body)
    .returning('*');
});

incident.get('/:id', async ctx => {
  ctx.body = await Incident.query().findById(ctx.params.id);
});

incident.patch('/:id', parsers.json, async (ctx, next) => {
  // TODO
  ctx.body = 'updated incident' + ctx.params.id;
  await next();
});

module.exports = incident;
