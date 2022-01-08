import { Player } from "./player"
import { TrainColor } from "../models/train-color"
import { GameState } from "./game-state"
import { Opponent } from "./opponent"

export class StateUpdate {
    pathOwnership: object
    availableCards: TrainColor[]
    player: Player
    activePlayerId: string
    gameState: GameState
    gameId: number
    hostId: number
    opponents: Opponent[]
}