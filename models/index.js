'use strict';

const {Model, snakeCaseMappers} = require('objection');

// Probide the knex instance to objection
Model.knex(require('../lib/knex'));

class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

module.exports = {BaseModel};
