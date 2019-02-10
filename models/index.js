'use strict';

const {Model, snakeCaseMappers} = require('objection');

// Provide the knex instance to objection
Model.knex(require('../lib/knex.js'));

class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

module.exports = {BaseModel};
