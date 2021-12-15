const graphqlFetch = (query: string, variables?: Record<string, string | number | boolean>) => 
  fetch(`/.netlify/functions/graphql`, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())

export default graphqlFetch;
