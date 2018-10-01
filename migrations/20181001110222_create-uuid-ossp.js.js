'use strict';

async function up(knex) {
  try {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  } catch (e) {
    if (!e.message.includes('could not open extension control file')) {
      throw e;
    }

    throw new Error(`
This application requires that the "uuid-ossp" PostgreSQL
 extension be available to install.
`);
  }
}

async function down(knex) {
  await knex.schema.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
}

module.exports = {up, down};
