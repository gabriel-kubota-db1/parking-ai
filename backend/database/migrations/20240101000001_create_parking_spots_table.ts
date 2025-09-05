import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('parking_spots', (table) => {
    table.increments('id').primary();
    table.integer('spot_number').notNullable().unique();
    table.boolean('is_occupied').defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('parking_spots');
}
