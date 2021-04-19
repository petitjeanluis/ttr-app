import { DestinationCard } from "./destinationCard"
import { TrainCard } from "./trainCard"
import { PlayerColor } from "../resources/playerColor";

export class Player {
    id: number
    destinationCards: DestinationCard[]
    trainsCards: TrainCard[]
    pathScore: number
    destinationScore: number
    availableTrains: []
    color: PlayerColor
}
