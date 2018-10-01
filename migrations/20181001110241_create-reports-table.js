'use strict';

const {TRUCK_TYPES} = require('../lib/constants');

async function up(knex) {
  await knex.schema.createTable('reports', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.enum('truck_type', TRUCK_TYPES.values).notNullable();
    table.timestamp('truck_seen_at').notNullable();
    table.foreign('reporter_id').references('users.id');
    table.timestamp('reported_at').notNullable().defaultTo(knex.fn.now());
    table.boolean('was_idling_p').notNullable().defaultTo(false);
    table.integer('idling_duration_mins').defaultTo(0);
    table.decimal('start_lat', 9, 6).notNullable();
    table.decimal('start_lon', 9, 6).notNullable();
    table.decimal('end_lat', 9, 6).notNullable();
    table.decimal('end_lon', 9, 6).notNullable();
    table.string('license_plate');
    table.string('transport_company_name');
    table.string('photo_folder_url');
    table.timestamps(true, true);
  });
}

async function down(knex) {
  await knex.schema.dropTable('reports');
}

module.exports = {up, down};
