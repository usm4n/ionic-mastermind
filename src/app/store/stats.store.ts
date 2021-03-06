import { BaseStore } from './base.store';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/pluck';

import { Stats, GameStats } from '../models/stats';

const defaultTime = {
    min: 0,
    sec: 0,
    micSec: 0,
    counter: 1e20
};

const defaultStats: Stats = {
    numberOfGames: 0,
    bestTime: defaultTime
}

const STATS: GameStats = {
    easy: {...defaultStats},
    hard: {...defaultStats},
    medium: {...defaultStats}
};

@Injectable()
export class StatsStore extends BaseStore<GameStats> {
    constructor(storage: Storage) {
        super(storage, STATS, '__stats');
    }
}
