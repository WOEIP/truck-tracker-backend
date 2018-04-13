'use strict';

const {TRUCK_TYPES} = require('../lib/constants');

async function up(knex) {

  await knex.schema.createTable('incident', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.enum('truck_type', TRUCK_TYPES.values).notNullable();

    /**
     * LAT-LONG are stored with 9 degrees of precision and a scale of 6
     *
     * This provides enough precision to be able to distinguish
     * individual people
     *
     * @see https://www.postgresql.org/docs/9.5/static/datatype-numeric.html#DATATYPE-NUMERIC-DECIMAL
     * @see https://en.wikipedia.org/wiki/Decimal_degrees
     */
    table.decimal('start_lat', 9, 6).notNullable();
    table.decimal('start_lon', 9, 6).notNullable();
    table.decimal('end_lat', 9, 6).notNullable();
    table.decimal('end_lon', 9, 6).notNullable();

    table.integer('idling_duration');
    table.timestamp('reported_at').notNullable();

    table.timestamps(true, true);
  });

}

async function down(knex) {
  await knex.schema.dropTable('incident');
}

module.exports = {up, down};
