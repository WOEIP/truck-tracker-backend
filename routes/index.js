'use strict';

const fs = require('fs');
const path = require('path');

const Router = require('koa-router');

const root = new Router();

root.get('/', ctx => {
  ctx.body = 'Hello World';
});

// read all of the js files in this directory and mount their default export as a router
fs
  .readdirSync(__dirname)
  .filter(file => path.extname(file) === '.js' && file !== 'index.js')
  .forEach(file => {
    const router = require(path.join(__dirname, file));
    const route = path.basename(file, path.extname(file));

    root.use(`/${route}`, router.routes());
  });

module.exports = root;
