'use strict';

const _ = require('lodash');
const moment = require('moment');

const {TRUCK_TYPES} = require('../lib/constants');
const {BaseModel} = require('.');

const ONE_DAY = 60 * 24; // 60 minute/hour * 24 hour/day
const UNIX_EPOCH_MAX = 2147483647; // 2^31 - 1

class Reports extends BaseModel {
  static get tableName() {
    return 'reports';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['truckType',
                 'truckSeenAt',
                 'start',
                 'end',
                 'reporterId'],
      properties: {
        truckType: {enum: TRUCK_TYPES.values},
        truckSeenAt: {type: 'number', minimum: 0, maximum: UNIX_EPOCH_MAX},
        reporterId: {type: 'string', format: 'uuid'},
        reportedAt: {type: 'number', minimum: 0, maximum: UNIX_EPOCH_MAX},
        wasIdlingP: {type: 'boolean'},
        idlingDurationMins: {type: 'number', minimum: 0, maximum: ONE_DAY},
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
        licensePlate: {type: 'string'},
        transportCompanyName:  {type: 'string'},
        photoFolderUrl:  {type: 'string'},
      },
    };
  }

  $formatDatabaseJson(json) {
    json = super.$formatDatabaseJson(json);

    /* eslint-disable camelcase */
    const formatted = _.pick(json, [
      'truck_type',
      'reporter_id',
      'was_idling_p',
      'idling_duration_mins ',
      'license_plate',
      'transport_company_name',
      'photo_folder_url'
    ]);
    formatted.start_lat = _.get(json, 'start.lat');
    formatted.start_lon = _.get(json, 'start.lon');
    formatted.end_lat = _.get(json, 'end.lat');
    formatted.end_lon = _.get(json, 'end.lon');

    // convert unix timestamps into ISO 8601 strings for postgres
    formatted.truck_seen_at = moment.unix(json.truck_seen_at).format();
    formatted.reported_at = moment.unix(json.reported_at).format();
    formatted.created_at = moment.unix(json.created_at).format();
    formatted.updated_at = moment.unix(json.updated_at).format();
   /* eslint-enable */

    return formatted;
  }

  $parseDatabaseJson(json) {
    json = super.$parseDatabaseJson(json);

    const formatted = _.pick(json, [
      'truckType',
      'reporterId',
      'wasIdlingP',
      'idlingDurationMins',
      'licensePlate',
      'transportCompanyName',
      'photoFolderUrl']);
    formatted.start = {
      lat: parseFloat(json.startLat),
      lon: parseFloat(json.startLon),
    };
    formatted.end = {
      lat: parseFloat(json.endLat),
      lon: parseFloat(json.endLon),
    };
    formatted.truckSeenAt = moment(json.truckSeenAt).unix();
    formatted.reportedAt = moment(json.reportedAt).unix();
    formatted.createdAt = moment(json.createdAt).unix();
    formatted.updatedAt = moment(json.updatedAt).unix();

    return formatted;
  }
}

module.exports = Reports;
