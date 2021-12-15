import { Handler } from "@netlify/functions";
import fetch from 'node-fetch';

const {
  FAUNA_HTTPS,
  FAUNA_GRAPHQL_DOMAIN,
  FAUNA_SECRET
} = process.env;

class BadRequestException extends Error {
  private reason: string;

  constructor(reason?: string) {
    super();
    this.reason = reason;
  }

  generateResponse = () => {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: this.reason || 'Bad request.'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
}

/**
 * Handles any GraphQL requests and dispatches them to the actual GraphQL API
 */
export const handler: Handler = async (event, context) => {
  try {
    // Check if body is empty
    if (typeof event.body === 'undefined') {
      throw new BadRequestException('Body is empty.');
    }

    const { query, variables } = JSON.parse(event.body);

    // Check if query is present in request body
    if (typeof query === 'undefined') {
      throw new BadRequestException('Query is missing.');
    }

    // Dispatch GraphQL request to Fauna server
    const response = await fetch(`http${FAUNA_HTTPS === 'true' ? 's' : ''}://${FAUNA_GRAPHQL_DOMAIN}/graphql`, {
      method: 'POST',
      body: JSON.stringify({
        query,
        variables,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FAUNA_SECRET}`,
      }
    });

    // Retrieve response body as text
    const body = await response.text();

    // Return Fauna server response to client
    return {
      statusCode: response.status,
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
  catch(error) {
    if (error instanceof BadRequestException) {
      return error.generateResponse();
    }
    throw error;
  }
}