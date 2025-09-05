import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('parking_spots').del();

  // Inserts seed entries
  const spots = Array.from({ length: 20 }, (_, i) => ({
    spot_number: i + 1,
    is_occupied: false,
  }));

  await knex('parking_spots').insert(spots);
}
