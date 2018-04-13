'use strict';

const {Model} = require('objection');

// Probide the knex instance to objection
Model.knex(require('../lib/knex'));

class BaseModel extends Model {

  static get modelPaths() {
    return [__dirname];
  }

}

module.exports = {BaseModel};
