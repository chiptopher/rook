import { faunaQuery } from '$lib/services/query';

const PLAYERS_QUERY = `
query {
  getAllPlayers {
    data {
      _id
      name
    }
  }
}
`;

export async function get() {
    const result = await faunaQuery({
        query: PLAYERS_QUERY
    });

    return {
        body: result.data.getAllPlayers.data
    };
}

const CREATE_PLAYER_QUERY = `
mutation($name: String!) {
  createPlayer(data: {name: $name}) {
    _id
  }
}
`;

export async function post({ body }) {
    const { name } = body;
    await faunaQuery({ query: CREATE_PLAYER_QUERY, variables: { name } });
    return {
        status: 201,
        body: {}
    };
}
