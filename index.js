'use strict';

const path = require('path');
const {Model} = require('objection');

const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');

const config = require('./config');
const knex = require('./lib/knex');

const app = new Koa();
const router = new Router();

Model.knex(knex);

router.get('/', ctx => {
  ctx.body = 'Hello World';
});

app.use(serve(path.join(__dirname, 'static')));
app.use(router.routes());
app.use(router.allowedMethods());

/**
 * module.parent is set if this file is being imported by another file
 * We only want to start listening if this as the first file loaded
 */
if (!module.parent) {
  app.listen(config.get('port'));
}

module.exports = app;
