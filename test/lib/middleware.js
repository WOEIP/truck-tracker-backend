'use strict';

const td = require('testdouble');
const test = require('ava');
const {ValidationError} = require('objection');

const middleware = require('../../lib/middleware');

test('validationErorHandler - no error', async t => {

  const ctx = {};
  const next = td.function()

  await middleware.validationErorHandler(ctx, next);

  td.verify(next(), {times: 1});
  t.deepEqual({}, ctx);

});

test('validationErorHandler - not validationEror', async t => {

  const err = new Error('I should not be caught');

  const ctx = {};
  const next = td.function();

  td.when(next()).thenReject(err);

  const caught = await t.throws(middleware.validationErorHandler(ctx, next));
  t.is(caught, err);
  t.deepEqual({}, ctx);

});

test('validationErorHandler - validationEror', async t => {

  const err = new ValidationError('');
  err.data = 'data'
  err.message = 'I should be caught';

  const ctx = {};
  const next = td.function();

  td.when(next()).thenReject(err);

  await middleware.validationErorHandler(ctx, next);
  t.is(ctx.status, 400);
  t.is(ctx.body.message, 'I should be caught');
  t.is(ctx.body.errors, 'data');

});
