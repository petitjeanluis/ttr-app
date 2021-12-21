import {PlayerColor} from '../models/player-color';

export class PlayerSummaryState {
    id: number
    name: string
    color: PlayerColor
    trainCardCount: number
    destinationCardCount: number
    trainCount: number
    pathScore: number
}
