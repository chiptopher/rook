import { calculateNewRank, Result } from './elo';

export interface PlayerRanking {
    name: string;
    rank: number;
    wins: number;
    losses: number;
}

type Match = any;
type Player = any;

export async function leaderboard(): Promise<Match[]> {
    const players = await fetch('/api/players').then((res) => res.json());
    return fetch('/api/matches')
        .then((res) => res.json())
        .then(sortMatchesByDate)
        .then((matches) => buildPlayerRankings(matches, players))
        .then(sortPlayersMyRankingDescending);
}

function sortMatchesByDate(matches: Match[]) {
    return matches.sort(
        (a, b) => new Date(a.timestamp).getMilliseconds() - new Date(b.timestamp).getMilliseconds()
    );
}

function buildPlayerRankings(matches: Match[], players: Player[]): PlayerRanking[] {
    const playerMap = initializePlayerMap(players);
    matches.forEach((match) => {
        const winner = playerMap.get(match.winner.name);
        const loser = playerMap.get(match.loser.name);

        const outputWinner = {
            ...winner,
            rank: calculateNewRank(winner.rank, loser.rank, Result.WIN),
            wins: winner.wins + 1
        };

        const outputLoser = {
            ...loser,
            rank: calculateNewRank(loser.rank, winner.rank, Result.LOSE),
            losses: loser.losses + 1
        };

        playerMap.set(winner.name, outputWinner);
        playerMap.set(loser.name, outputLoser);
    });

    return Array.from(playerMap.values());
}

function sortPlayersMyRankingDescending(players: PlayerRanking[]) {
    return players.sort((a, b) => a.rank - b.rank).reverse();
}

function initializePlayerMap(players: Player[]) {
    const map = new Map<string, PlayerRanking>();
    players.forEach((player) => {
        map.set(player.name, {
            name: player.name,
            rank: 1500,
            wins: 0,
            losses: 0
        });
    });
    return map;
}
