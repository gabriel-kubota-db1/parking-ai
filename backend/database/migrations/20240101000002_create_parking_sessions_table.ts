import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('parking_sessions', (table) => {
    table.increments('id').primary();
    table
      .integer('spot_id')
      .unsigned()
      .references('id')
      .inTable('parking_spots')
      .onDelete('CASCADE');
    table.string('vehicle_plate').notNullable();
    table.timestamp('check_in_time').defaultTo(knex.fn.now());
    table.timestamp('check_out_time').nullable();
    table.decimal('hourly_rate', 8, 2).notNullable();
    table.decimal('total_cost', 8, 2).nullable();
    table.boolean('is_active').defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('parking_sessions');
}
