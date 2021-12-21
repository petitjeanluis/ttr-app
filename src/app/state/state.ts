import {PlayerSummaryState} from './player-summary-state';
import {PlayerID, PathID} from '../models/types';
import {TrainColor} from '../models/train-color';

export class State {
    pathOwnership: Map<PathID, PlayerID>
    playerDetails: Map<PlayerID, PlayerSummaryState>
    availableCards: TrainColor[]
    currentGameState: any
}
