'use strict';

const {BaseModel} = require('.');
const {TRUCK_TYPES} = require('../lib/constants');

const ONE_DAY =  60 * 24;           // 60 minute/hour * 24 hour/day
const UNIX_EPOCH_MAX = 2147483647;  // 2^31 - 1

class Incident extends BaseModel {

  static get tableName() {
    return 'incident';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['truckType', 'startLat', 'startLon', 'endLat', 'endLon', 'reportedAt'],
      properties: {
        truckType: {enum: TRUCK_TYPES.values},
        startLat: {type: 'number', minimum: -90, maximum: 90},
        startLon: {type: 'number', minimum: -180, maximum: 180},
        endLat: {type: 'number', minimum: -90, maximum: 90},
        endLon: {type: 'number', minimum: -180, maximum: 180},
        idlingDuration: {type: 'number', minimum: 0, maximum: ONE_DAY},
        reportedAt: {type: 'number', minimum: 0, maximum: UNIX_EPOCH_MAX},
      }
    };
  }

}

module.exports = Incident;
