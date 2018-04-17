'use strict';

const path = require('path');

const Koa = require('koa');
const serve = require('koa-static');

const config = require('./config');
const router = require('./routes');
const middleware = require('./lib/middleware');

const app = new Koa();

app.use(serve(path.join(__dirname, 'static')));
app.use(middleware.validationErrorHandler);
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
