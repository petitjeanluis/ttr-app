import { DestinationCard } from "./destination-card"
import { TrainCard } from "./train-card"
import { PlayerColor } from "./player-color";

export class Player {
    id: number
    destinationCards: DestinationCard[]
    trainsCards: TrainCard[]
    pathScore: number
    destinationScore: number
    availableTrains: []
    color: PlayerColor
}
