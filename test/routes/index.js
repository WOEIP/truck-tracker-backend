'use strict';

const Koa = require('koa');
const incito = require('incito');
const test = require('ava');
const axios = require('axios');

const router = require('../../routes');

// prettier-ignore
const app = new Koa()
  .use(router.routes())
  .use(router.allowedMethods());

const server = incito(app.callback());
const request = axios.create({
  baseURL: `http://localhost:${server.port}/`,
});

test('/', async t => {
  const res = await request.get();
  t.is(res.data, 'Hello World');
});

test('404', async t => {
  const err = await t.throws(request.get('adsfjklasfkldasf'));
  t.is(err.response.status, 404);
  t.is(err.response.data, 'Not Found');
});
