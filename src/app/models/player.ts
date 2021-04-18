import { DestinationCard } from "./destination_card"
import { TrainCard } from "./train_card"

export class Player {
    id: number
    destinationCards: DestinationCard[]
    trainsCards: TrainCard[]
    pathScore: number
    destinationScore: number
    availableTrains: []
}