'use strict';

const test = require('ava');

const {Enum} = require('../../lib/constants');

test('new Enum()', t => {
  const numbers = new Enum(['ONE', 'TWO']);

  t.is(typeof numbers.ONE, 'symbol');
  t.is(typeof numbers.TWO, 'symbol');
  t.true(Array.isArray(numbers.values));
  t.true(numbers.values.includes('ONE'));
  t.true(numbers.valueSet instanceof Set);
});

test('enum.has', t => {
  const numbers = new Enum(['ONE']);

  t.true(numbers.has(numbers.ONE));
  t.false(numbers.has('ONE'));
  t.false(numbers.has(1));
});
