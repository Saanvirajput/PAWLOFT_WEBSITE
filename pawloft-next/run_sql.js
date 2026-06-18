const { Client } = require('pg');
const fs = require('fs');

async function run() {
  const connectionString = 'postgresql://postgres:Saanvi%409204@db.rajkojkgmpumneqgsavs.supabase.co:5432/postgres';
  
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to Supabase DB.');
    
    const sql = fs.readFileSync('../supabase_schema.sql', 'utf8');
    await client.query(sql);
    console.log('Schema executed successfully!');
  } catch (error) {
    console.error('Error executing schema:', error);
  } finally {
    await client.end();
  }
}

run();
