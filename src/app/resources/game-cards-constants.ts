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

export const TRAIN_CARDS = [
    {
        trainColor: TrainColor.BLACK,
        count: 12
    },
    {
        trainColor: TrainColor.WHITE,
        count: 12
    },
    {
        trainColor: TrainColor.RED,
        count: 12
    },
    {
        trainColor: TrainColor.GREEN,
        count: 12
    },
    {
        trainColor: TrainColor.BLUE,
        count: 12
    },
    {
        trainColor: TrainColor.YELLOW,
        count: 12
    },
    {
        trainColor: TrainColor.PINK,
        count: 12
    },
    {
        trainColor: TrainColor.ORANGE,
        count: 12
    },
    {
        trainColor: TrainColor.WILD,
        count: 14
    }
]

export const DESTINATION_CARDS: any[] = [
    {
        city1: 1,
        city2: 15,
        value: 12
    },
    {
        city1: 2,
        city2: 22,
        value: 13
    },
    {
        city1: 2,
        city2: 27,
        value: 7
    },
    {
        city1: 4,
        city2: 18,
        value: 7
    },
    {
        city1: 4,
        city2: 29,
        value: 9
    },
    {
        city1: 5,
        city2: 19,
        value: 11
    },
    {
        city1: 6,
        city2: 8,
        value: 4
    },
    {
        city1: 6,
        city2: 23,
        value: 11
    },
    {
        city1: 7,
        city2: 8,
        value: 10
    },
    {
        city1: 7,
        city2: 10,
        value: 8
    },
    {
        city1: 9,
        city2: 14,
        value: 8
    },
    {
        city1: 11,
        city2: 10,
        value: 5
    },
    {
        city1: 14,
        city2: 4,
        value: 16
    },
    {
        city1: 14,
        city2: 15,
        value: 20
    },
    {
        city1: 14,
        city2: 19,
        value: 21
    },
    {
        city1: 16,
        city2: 0,
        value: 9
    },
    {
        city1: 16,
        city2: 18,
        value: 13
    },
    {
        city1: 19,
        city2: 0,
        value: 6
    },
    {
        city1: 24,
        city2: 17,
        value: 17
    },
    {
        city1: 24,
        city2: 22,
        value: 11
    },
    {
        city1: 28,
        city2: 0,
        value: 17
    },
    {
        city1: 30,
        city2: 17,
        value: 8
    },
    {
        city1: 30,
        city2: 20,
        value: 9
    },
    {
        city1: 31,
        city2: 14,
        value: 9
    },
    {
        city1: 31,
        city2: 19,
        value: 22
    },
    {
        city1: 32,
        city2: 15,
        value: 10
    },
    {
        city1: 33,
        city2: 16,
        value: 20
    },
    {
        city1: 33,
        city2: 29,
        value: 13
    },
    {
        city1: 35,
        city2: 10,
        value: 12
    },
    {
        city1: 35,
        city2: 13,
        value: 11
    }
]
