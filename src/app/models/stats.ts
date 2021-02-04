export interface Stats {
    numberOfGames: number;
    bestTime: any;
}

export interface GameStats {
    easy: Stats;
    medium: Stats;
    hard: Stats;
}
