'use strict';

const _ = require('lodash');
const moment = require('moment');

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
      required: ['truckType', 'start', 'end', 'reportedAt'],
      properties: {
        truckType: {enum: TRUCK_TYPES.values},
        start: {
          required: ['lat', 'lon'],
          lat: {type: 'number', minimum: -90, maximum: 90},
          lon: {type: 'number', minimum: -180, maximum: 180},
        },
        end: {
          required: ['lat', 'lon'],
          lat: {type: 'number', minimum: -90, maximum: 90},
          lon: {type: 'number', minimum: -180, maximum: 180},
        },
        idlingDuration: {type: 'number', minimum: 0, maximum: ONE_DAY},
        reportedAt: {type: 'number', minimum: 0, maximum: UNIX_EPOCH_MAX},
      }
    };
  }

  $formatDatabaseJson(json) {
    json = super.$formatDatabaseJson(json);

    const formatted = _.pick(json, ['truck_type', 'idling_duration', 'reported_at']);
    formatted.start_lat = _.get(json, 'start.lat');
    formatted.start_lon = _.get(json, 'start.lon');
    formatted.end_lat = _.get(json, 'end.lat');
    formatted.end_lon =  _.get(json, 'end.lon');

    // convert unix timestamps into ISO 8601 strings for postgres
    formatted.reported_at = moment.unix(json.reported_at).format();

    return formatted;
  }

  $parseDatabaseJson(json) {
    json = super.$parseDatabaseJson(json);

    const formatted = _.pick(json, ['id', 'truckType', 'idlingDuration']);
    formatted.start = {
      lat: parseFloat(json.startLat),
      lon: parseFloat(json.startLon),
    };
    formatted.end = {
      lat: parseFloat(json.endLat),
      lon: parseFloat(json.endLon),
    };
    formatted.reportedAt = moment(json.reportedAt).unix();
    formatted.createdAt = moment(json.createdAt).unix();
    formatted.updatedAt = moment(json.updatedAt).unix();

    return formatted;
  }

}

module.exports = Incident;
