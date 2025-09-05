import { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  const hashedPassword = await bcrypt.hash('password123', 10);
  await knex('users').insert([
    {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    },
  ]);
}
