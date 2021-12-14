const graphqlFetch = (query: string) => 
  fetch(`/.netlify/functions/graphql`, {
    method: 'POST',
    body: JSON.stringify({
      query
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())

export default graphqlFetch;
