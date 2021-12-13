import fs from 'fs';
import fetch from 'node-fetch';

const {
  FAUNA_GRAPHQL_DOMAIN,
  FAUNA_HTTPS,
  FAUNA_SECRET,
} = process.env;

// This script migrates the database schema to the database server
const run = async () => {
  // Establish connection with database
  console.info('Connecting to database...');
    
  console.info('Migrating schema...');
  // Read the schema from the .graphql file
  const stream = fs.createReadStream('schema.graphql');
  // Import schema into Fauna GraphQL
  await fetch(`http${FAUNA_HTTPS === true ? 's' : ''}://${FAUNA_GRAPHQL_DOMAIN}/import`, {
    method: 'POST',
    body: stream,
    headers: {
      'Authorization': `Bearer ${FAUNA_SECRET}`,
      'Content-Type': 'application/octet-stream',
    }
  });
}

// Run main process
run().catch((err) => {
  console.error(err);
  process.exit(1);
});
