import {PlayerColor} from '../models/player-color';
import { PlayerID } from '../models/types';

export class Opponent {
    id: PlayerID
    name: string
    color: PlayerColor
    trainCardCount: number
    destinationCardCount: number
    trainCount: number
    pathScore: number
}
