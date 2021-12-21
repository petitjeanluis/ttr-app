import { Destination } from './destination'
import { PlayerColor } from './player-color'
import {TrainCard} from '../entities/train-card'

export class Player {
    id: number
    name: string
    color: PlayerColor
    trainsCards: TrainCard[]
    destinationCards: Destination[]
    trainCount: number
    score?: number
}
