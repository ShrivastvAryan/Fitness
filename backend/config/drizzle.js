require('dotenv').config();

// Check if the database URL is set
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in the .env file');
}

/** @type { import("drizzle-kit").Config } */
module.exports = {
  schema: './lib/schema.js', // Make sure this path points to your schema file
  out: './drizzle',
  driver: 'pg', // 'pg' for PostgreSQL, which Supabase uses
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
};
