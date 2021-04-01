import { faunaQuery } from '$lib/services/query';

const MATCHES_QUERY = `
query {
  getAllMatches(_size: 1000) {
    data {
      _id
      timestamp
    	winner {
        _id
        name
      }
      loser {
        name
        _id
      }
    }
  }
}
`;

export async function get() {
    const result = await faunaQuery({
        query: MATCHES_QUERY
    });

    return {
        body: result.data.getAllMatches.data
    };
}

const CREATE_MATCH_QUERY = `
mutation($winnerId: ID!, $loserId: ID!, $timestamp: Time!) {
  createMatch(data: {
    timestamp: $timestamp
    loser: {
      connect: $loserId
    }
    winner: {
      connect: $winnerId
    }
  }) {
    _id
  }
}
`;

export async function post({ body }) {
    await faunaQuery({
        query: CREATE_MATCH_QUERY,
        variables: {
            timestamp: new Date().toISOString(),
            loserId: body.loser,
            winnerId: body.winner
        }
    });

    return {
        body: {}
    };
}
