import fs from 'fs';
import fetch from 'node-fetch';
import faunaClient from './fauna-client.mjs';
import faunadb from 'faunadb';
const fql = faunadb.query;

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

  // Create custom indexes
  console.info('Creating custom indexes...');
  await faunaClient.query(
    fql.If(
      fql.Exists(
        fql.Index('questionByQuizAndOrder')
      ),
      fql.Delete(fql.Index('questionByQuizAndOrder')),
      null
    )
  );

  await faunaClient.query(
    fql.CreateIndex({
      name: 'questionByQuizAndOrder',
      source: fql.Collection('Question'),
      terms: [
        { field: ['data', 'quiz'] },
        { field: ['data', 'order'] },
      ],
      unique: true,
    })
  );

  // Create custom resolvers
  console.info('Creating custom resolvers...');
  await faunaClient.query(
    fql.Update(
      fql.Function('questionByQuizIdAndOrder'),
      {
        body: fql.Query(
          fql.Lambda(
            ["quizId", "order"],
            fql.Let(
              {
                array: fql.Map(
                  fql.Paginate(
                    fql.Match(fql.Index("questionByQuizAndOrder"), [
                      fql.Ref(fql.Collection("Quiz"), fql.Var("quizId")),
                      fql.Var("order")
                    ])
                  ),
                  fql.Lambda("ref", fql.Get(fql.Var("ref")))
                )
              },
              fql.If(
                fql.IsEmpty(fql.Var("array")),
                null,
                fql.Select(
                  ['data', 0],
                  fql.Var('array')
                )
              )
            )
          )
        )
      }
    )
  )
}

// Run main process
run().catch((err) => {
  console.error(err);
  process.exit(1);
});
