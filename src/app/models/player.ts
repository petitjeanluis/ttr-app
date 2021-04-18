import { DestinationCard } from "./destination_card"
import { TrainCard } from "./train_card"
import { Color } from "../resources/color";

export class Player {
    id: number
    destinationCards: DestinationCard[]
    trainsCards: TrainCard[]
    pathScore: number
    destinationScore: number
    availableTrains: []
    color: Color
}
