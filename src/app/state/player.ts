import {PlayerColor} from '../models/player-color';
import {TrainColor} from '../models/train-color';
import {Destination} from '../models/destination';

export class Player {
    id: number
    name: string
    color: PlayerColor
    trainCards: TrainColor[]
    destinationCards: number[]
    destinationOptionSet: number[]
    trainCount: number
    pathScore: number
}
