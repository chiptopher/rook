const K_FACTOR = 32;

export enum Result {
    LOSE = 0,
    DRAW = 0.5,
    WIN = 1
}

export function calculateNewRank(forPlayer: number, againstPlayer: number, status: Result): number {
    return (
        forPlayer +
        Math.round(K_FACTOR * (status - 1 / (1 + Math.pow(10, (againstPlayer - forPlayer) / 400))))
    );
}
