'use strict';

const knex = require('knex');

// Bootstrap knex using the knexfile
module.exports = knex(require('../knexfile'));
