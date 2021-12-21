import {PlayerColor} from '../models/player-color';
import {TrainColor} from '../models/train-color';
import {Destination} from '../models/destination';

export class PlayerState {
    id: number
    name: string
    color: PlayerColor
    trainCards: TrainColor[]
    destinationCards: Destination[]
    trainCount: number
    pathScore: number
}
