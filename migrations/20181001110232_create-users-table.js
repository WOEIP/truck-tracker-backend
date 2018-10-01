'use strict';

async function up(knex) {
  await knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('username').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').unique().notNullable();
    table.string('zipcode').notNullable();
    table.string('address');
    table.string('local_resident_p').notNullable().defaultTo(true);
    table.boolean('active_p').notNullable().defaultTo(true);
    table.string('pw_hash').notNullable();
    table.boolean('admin_p').notNullable().defaultTo(false);
    table.timestamp('date_registered').notNullable().defaultTo(knex.fn.now());
    table.timestamp('last_login').notNullable().defaultTo(knex.fn.now());

    table.timestamps(true, true);
  });
}

async function down(knex) {
  await knex.schema.dropTable('users');
}

module.exports = {up, down};
