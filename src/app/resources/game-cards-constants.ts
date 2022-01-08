import {TrainColor} from '../models/train-color'
import {CARD_SPACING, SIDE_PANEL_WIDTH} from './constants';

export const NUMBER_OF_TOP_CARDS = 5
export const TRAIN_CARD_WIDTH = 100 // 84/55
export const TRAIN_CARD_HEIGHT = 65

export const TRAIN_CARD_X = (SIDE_PANEL_WIDTH - TRAIN_CARD_WIDTH) / 2
export const TRAIN_CARD_Y = CARD_SPACING + TRAIN_CARD_HEIGHT + CARD_SPACING * 2

export const TRAIN_CARD_PILE_X = (SIDE_PANEL_WIDTH - TRAIN_CARD_WIDTH) / 2
export const TRAIN_CARD_PILE_Y = CARD_SPACING

export const DESTINATION_CARD_PILE_X = TRAIN_CARD_X
export const DESTINATION_CARD_PILE_Y = TRAIN_CARD_Y  + (TRAIN_CARD_HEIGHT+CARD_SPACING) * 5 + CARD_SPACING

export const PILE_CARD_FONT = 'bold 13px serif'
export const PILE_CARD_FONT_COLOR = 'black'
