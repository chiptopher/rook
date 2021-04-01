import fetch from 'node-fetch';

export async function faunaQuery<T>(props: { query: string; variables?: T }): Promise<any> {
    const { query, variables } = props;
    return await fetch('https://graphql.fauna.com/graphql', {
        body: JSON.stringify({
            query,
            variables
        }),
        headers: {
            Authorization: `Bearer ${process.env['DB_KEY']}`
        },
        method: 'POST'
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.errors) throw new Error(JSON.stringify(res.errors, null, 2));
            return res;
        });
}
