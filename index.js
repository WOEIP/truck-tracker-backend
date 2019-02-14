'use strict';

const path = require('path');

const Koa = require('koa');
const serve = require('koa-static');
const cors = require('@koa/cors');
const session = require('koa-session');
const passport = require('koa-passport');

const config = require('./config');
const router = require('./routes');
const validationErrorHandler = require('./lib/middleware/validation-error-handler.js');

const app = new Koa();

app.keys = ['TODO put a secret key here'];
app.use(session(app));



// authentication
require('./lib/auth.js');
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    // TODO this should prolly be in config
    origin: false,
    credentials: true,
    allowHeaders: ['Origin', 'Content-Type'],
  }),
);
app.use(validationErrorHandler);
app.use(router.routes());
app.use(router.allowedMethods());

/**
 * module.parent is set if this file is being imported by another file
 * We only want to start listening if this is the first file loaded
 */
if (!module.parent) {
  app.listen(config.get('port'));
}

module.exports = app;
