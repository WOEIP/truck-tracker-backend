'use strict';

const test = require('ava');

const app = require('..');

test('ensure app is exported', t => {
  t.is(typeof app.listen, 'function');
});
