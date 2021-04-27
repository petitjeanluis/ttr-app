import {
    TRAIN_CARD_HEIGHT,
    TRAIN_CARD_PILE_X, TRAIN_CARD_PILE_Y, TRAIN_CARD_SPACING,
    TRAIN_CARD_WIDTH,
} from "./game-cards-constants";
import {SIDE_PANEL_WIDTH} from "./constants";
import {BOARD_HEIGHT} from "./board-constants";

export const PLAYER_CARD_FONT_COLOR = "black"
export const FONT_MARGIN = 5
export const PLAYER_CARD_WIDTH = 110
export const PLAYER_CARD_HEIGHT = 80

export const OPPONENT_CARD_SPACING = TRAIN_CARD_SPACING
export const OPPONENT_CARD_X = (SIDE_PANEL_WIDTH-PLAYER_CARD_WIDTH) / 2
export const OPPONENT_CARD_Y = OPPONENT_CARD_SPACING
export const OPPONENT_CARD_COLOR = "#D3D3D3"

