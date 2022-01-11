// Board
import {TrainColor} from '../models/train-color';

export const BOARD_WIDTH = 838
export const BOARD_HEIGHT = 526
export const BOARD_COLOR = '#c0c0c0'

// Paths
export const PATH_PIECE_HEIGHT = 10
export const PATH_PIECE_WIDTH = 28
export const PATH_PIECE_LINE_WIDTH = 2
export const PATHS: any[] = [
    // vancouver - calgary
    {
        id: 0,
        cityOneId: 33,
        cityTwoId: 2,
        trainColor: TrainColor.WILD,
        paths: [{x: 70, y: 48, degrees: -8},
            {x: 103, y: 43, degrees: -8},
            {x: 136, y: 39, degrees: -7}]
    },
    // vancouver - seatlle - 2
    {
        id: 1,
        cityOneId: 33,
        cityTwoId: 31,
        trainColor: TrainColor.WILD,
        paths: [{x: 39, y: 75, degrees: -87}]
    },
    // vancouver - seatlle - 2
    {
        id: 2,
        cityOneId: 33,
        cityTwoId: 31,
        trainColor: TrainColor.WILD,
        paths: [{x: 52, y: 76, degrees: -87}]
    },
    // seatle - calgary
    {
        id: 3,
        cityOneId: 31,
        cityTwoId: 2,
        trainColor: TrainColor.WILD,
        paths: [{x: 67, y: 99, degrees: -1},
            {x: 100, y: 96, degrees: -12},
            {x: 130, y: 82, degrees: -39},
            {x: 152, y: 57, degrees: -64}]
    },
    // seatle - portland - 2
    {
        id: 4,
        cityOneId: 31,
        cityTwoId: 24,
        trainColor: TrainColor.WILD,
        paths: [{x: 27, y: 119, degrees: -67}]
    },
    // seatle - portland - 2
    {
        id: 5,
        cityOneId: 31,
        cityTwoId: 24,
        trainColor: TrainColor.WILD,
        paths: [{x: 39, y: 124, degrees: -67}]
    },
    // portland - san fancisco
    {
        id: 6,
        cityOneId: 24,
        cityTwoId: 28,
        trainColor: TrainColor.PINK,
        paths: [{x: 21, y: 167, degrees: -78},
            {x: 14, y: 198, degrees: -78},
            {x: 8, y: 230, degrees: -85},
            {x: 7, y: 262, degrees: 87},
            {x: 11, y: 294, degrees: 80}]
    },
    // portland - san fancisco
    {
        id: 7,
        cityOneId: 24,
        cityTwoId: 28,
        trainColor: TrainColor.GREEN,
        paths: [{x: 8, y: 165, degrees: -76},
            {x: 0, y: 197, degrees: -79},
            {x: -5, y: 230, degrees: -85},
            {x: -6, y: 263, degrees: 89},
            {x: -3, y: 296, degrees: 81}]
    },
    // san francisco - los angeles - 2
    {
        id: 8,
        cityOneId: 28,
        cityTwoId: 14,
        trainColor: TrainColor.YELLOW,
        paths: [{x: 16, y: 342, degrees: 59},
            {x: 35, y: 369, degrees: 52},
            {x: 56, y: 394, degrees: 47}]
    },
    // san francisco - los angeles - 2
    {
        id: 9,
        cityOneId: 28,
        cityTwoId: 14,
        trainColor: TrainColor.PINK,
        paths: [{x: 27, y: 334, degrees: 58},
            {x: 46, y: 361, degrees: 51},
            {x: 67, y: 386, degrees: 48}]
    },
    // los angeles - phoenix
    {
        id: 10,
        cityOneId: 14,
        cityTwoId: 22,
        trainColor: TrainColor.WILD,
        paths: [{x: 101, y: 400, degrees: -17},
            {x: 134, y: 394, degrees: -1},
            {x: 167, y: 400, degrees: 21}]
    },
    // phoenix - el paso
    {
        id: 11,
        cityOneId: 22,
        cityTwoId: 8,
        trainColor: TrainColor.WILD,
        paths: [{x: 206, y: 421, degrees: 18},
            {x: 237, y: 431, degrees: 18},
            {x: 268, y: 441, degrees: 17}]
    },
    // los angeles - el paso
    {
        id: 12,
        cityOneId: 14,
        cityTwoId: 8,
        trainColor: TrainColor.BLACK,
        paths: [{x: 97, y: 427, degrees: 45},
            {x: 125, y: 446, degrees: 25},
            {x: 157, y: 457, degrees: 13},
            {x: 190, y: 462, degrees: 4},
            {x: 224, y: 463, degrees: -1},
            {x: 258, y: 460, degrees: -9}]
    },
    // san francisco - salt lake city - 2
    {
        id: 13,
        cityOneId: 28,
        cityTwoId: 27,
        trainColor: TrainColor.ORANGE,
        paths: [{x: 36, y: 295, degrees: -22},
            {x: 67, y: 283, degrees: -20},
            {x: 99, y: 273, degrees: -18},
            {x: 131, y: 264, degrees: -15},
            {x: 163, y: 256, degrees: -13}]
    },
    // san francisco - salt lake city - 2
    {
        id: 14,
        cityOneId: 28,
        cityTwoId: 27,
        trainColor: TrainColor.WHITE,
        paths: [{x: 165, y: 269, degrees: -14},
            {x: 133, y: 277, degrees: -16},
            {x: 102, y: 286, degrees: -17},
            {x: 71, y: 296, degrees: -19},
            {x: 40, y: 308, degrees: -22}]
    },
    // portland - salt lake city
    {
        id: 15,
        cityOneId: 24,
        cityTwoId: 27,
        trainColor: TrainColor.BLUE,
        paths: [{x: 46, y: 148, degrees: 9},
            {x: 79, y: 154, degrees: 12},
            {x: 111, y: 165, degrees: 24},
            {x: 140, y: 183, degrees: 39},
            {x: 164, y: 206, degrees: 51},
            {x: 181, y: 236, degrees: 70}]
    },
    // los angeles - las vegas
    {
        id: 16,
        cityOneId: 14,
        cityTwoId: 12,
        trainColor: TrainColor.WILD,
        paths: [{x: 93, y: 380, degrees: -68},
            {x: 114, y: 357, degrees: -7}]
    },
    // las vegas - salt lake city
    {
        id: 17,
        cityOneId: 12,
        cityTwoId: 27,
        trainColor: TrainColor.ORANGE,
        paths: [{x: 157, y: 343, degrees: -35},
            {x: 180, y: 318, degrees: -62},
            {x: 188, y: 285, degrees: -89}]
    },
    // seattle - helena
    {
        id: 18,
        cityOneId: 31,
        cityTwoId: 9,
        trainColor: TrainColor.YELLOW,
        paths: [{x: 67, y: 115, degrees: 14},
            {x: 99, y: 122, degrees: 11},
            {x: 131, y: 128, degrees: 11},
            {x: 163, y: 134, degrees: 10},
            {x: 195, y: 140, degrees: 10},
            {x: 227, y: 146, degrees: 10}]
    },
    // calgary - helena
    {
        id: 19,
        cityOneId: 2,
        cityTwoId: 9,
        trainColor: TrainColor.WILD,
        paths: [{x: 180, y: 50, degrees: 45},
            {x: 202, y: 75, degrees: 51},
            {x: 223, y: 102, degrees: 53},
            {x: 242, y: 129, degrees: 57}]
    },
    // salt lake city - helena
    {
        id: 20,
        cityOneId: 27,
        cityTwoId: 9,
        trainColor: TrainColor.PINK,
        paths: [{x: 205, y: 231, degrees: -59},
            {x: 222, y: 202, degrees: -59},
            {x: 239, y: 173, degrees: -60}]
    },
    // helena - winnipeg
    {
        id: 21,
        cityOneId: 9,
        cityTwoId: 35,
        trainColor: TrainColor.BLUE,
        paths: [{x: 272, y: 132, degrees: -42},
            {x: 296, y: 110, degrees: -43},
            {x: 320, y: 87, degrees: -44},
            {x: 343, y: 64, degrees: -45}]
    },
    // calgary - winnipeg
    {
        id: 22,
        cityOneId: 2,
        cityTwoId: 35,
        trainColor: TrainColor.WHITE,
        paths: [{x: 181, y: 24, degrees: -22},
            {x: 212, y: 14, degrees: -14},
            {x: 245, y: 9, degrees: -4},
            {x: 278, y: 9, degrees: 3},
            {x: 311, y: 15, degrees: 17},
            {x: 341, y: 30, degrees: 34}]
    },
    // salt lake city - denver
    {
        id: 23,
        cityOneId: 27,
        cityTwoId: 6,
        trainColor: TrainColor.RED,
        paths: [{x: 217, y: 256, degrees: 13},
            {x: 249, y: 264, degrees: 15},
            {x: 281, y: 273, degrees: 15}]
    },
    // salt lake city - denver
    {
        id: 24,
        cityOneId: 27,
        cityTwoId: 6,
        trainColor: TrainColor.YELLOW,
        paths: [{x: 213, y: 269, degrees: 12},
            {x: 245, y: 277, degrees: 14},
            {x: 277, y: 286, degrees: 15}]
    },
    // phoenix - denver
    {
        id: 25,
        cityOneId: 22,
        cityTwoId: 6,
        trainColor: TrainColor.WHITE,
        paths: [{x: 194, y: 393, degrees: -71},
            {x: 204, y: 361, degrees: -72},
            {x: 218, y: 330, degrees: -55},
            {x: 246, y: 310, degrees: -17},
            {x: 279, y: 304, degrees: -7}]
    },
    // phoenix - santa fe
    {
        id: 26,
        cityOneId: 22,
        cityTwoId: 29,
        trainColor: TrainColor.WILD,
        paths: [{x: 214, y: 401, degrees: -26},
            {x: 243, y: 387, degrees: -25},
            {x: 272, y: 374, degrees: -23}]
    },
    // helena - duluth
    {
        id: 27,
        cityOneId: 9,
        cityTwoId: 7,
        trainColor: TrainColor.ORANGE,
        paths: [{x: 271, y: 153, degrees: 1},
            {x: 304, y: 153, degrees: -1},
            {x: 337, y: 152, degrees: -1},
            {x: 370, y: 151, degrees: -2},
            {x: 403, y: 150, degrees: -2},
            {x: 436, y: 149, degrees: -2}]
    },
    // winnipeg - duluth
    {
        id: 28,
        cityOneId: 35,
        cityTwoId: 7,
        trainColor: TrainColor.BLACK,
        paths: [{x: 376, y: 60, degrees: 41},
            {x: 400, y: 82, degrees: 43},
            {x: 423, y: 104, degrees: 45},
            {x: 445, y: 127, degrees: 46}]
    },
    // duluth - omaha
    {
        id: 29,
        cityOneId: 7,
        cityTwoId: 21,
        trainColor: TrainColor.WILD,
        paths: [{x: 443, y: 173, degrees: -70},
            {x: 432, y: 203, degrees: -70}]
    },
    // duluth - omaha
    {
        id: 30,
        cityOneId: 7,
        cityTwoId: 21,
        trainColor: TrainColor.WILD,
        paths: [{x: 455, y: 177, degrees: -70},
            {x: 444, y: 207, degrees: -70}]
    },
    // denver - omaha
    {
        id: 31,
        cityOneId: 6,
        cityTwoId: 21,
        trainColor: TrainColor.PINK,
        paths: [{x: 314, y: 268, degrees: -56},
            {x: 341, y: 247, degrees: -20},
            {x: 374, y: 240, degrees: -3},
            {x: 407, y: 237, degrees: -11}]
    },
    // santa fe - denver
    {
        id: 32,
        cityOneId: 29,
        cityTwoId: 6,
        trainColor: TrainColor.WILD,
        paths: [{x: 301, y: 312, degrees: -85},
            {x: 298, y: 344, degrees: -85}]
    },
    // santa fe - el paso
    {
        id: 33,
        cityOneId: 29,
        cityTwoId: 8,
        trainColor: TrainColor.WILD,
        paths: [{x: 293, y: 391, degrees: -87},
            {x: 291, y: 423, degrees: -87}]
    },
    // omaha - kansas city
    {
        id: 34,
        cityOneId: 21,
        cityTwoId: 11,
        trainColor: TrainColor.WILD,
        paths: [{x: 448, y: 247, degrees: 70}]
    },
    // omaha - kansas city
    {
        id: 35,
        cityOneId: 21,
        cityTwoId: 11,
        trainColor: TrainColor.WILD,
        paths: [{x: 436, y: 251, degrees: 70}]
    },
    // denver - kansas city
    {
        id: 36,
        cityOneId: 6,
        cityTwoId: 11,
        trainColor: TrainColor.BLACK,
        paths: [{x: 327, y: 289, degrees: 1},
            {x: 360, y: 288, degrees: -4},
            {x: 392, y: 284, degrees: -10},
            {x: 424, y: 277, degrees: -14}]
    },
    // denver - kansas city
    {
        id: 37,
        cityOneId: 6,
        cityTwoId: 11,
        trainColor: TrainColor.ORANGE,
        paths: [{x: 326, y: 302, degrees: 1},
            {x: 359, y: 301, degrees: -4},
            {x: 391, y: 297, degrees: -10},
            {x: 423, y: 290, degrees: -14}]
    },
    // kansas city - oklahoma city
    {
        id: 38,
        cityOneId: 11,
        cityTwoId: 20,
        trainColor: TrainColor.WILD,
        paths: [{x: 445, y: 294, degrees: -79},
            {x: 438, y: 325, degrees: -77}]
    },
    // kansas city - oklahoma city
    {
        id: 39,
        cityOneId: 11,
        cityTwoId: 20,
        trainColor: TrainColor.WILD,
        paths: [{x: 457, y: 295, degrees: -79},
            {x: 450, y: 326, degrees: -78}]
    },
    // denver - oklahoma city
    {
        id: 40,
        cityOneId: 6,
        cityTwoId: 20,
        trainColor: TrainColor.RED,
        paths: [{x: 321, y: 324, degrees: 54},
            {x: 346, y: 345, degrees: 21},
            {x: 377, y: 352, degrees: 3},
            {x: 409, y: 351, degrees: -5}]
    },
    // el paso - oklahoma city
    {
        id: 41,
        cityOneId: 8,
        cityTwoId: 20,
        trainColor: TrainColor.YELLOW,
        paths: [{x: 313, y: 443, degrees: -10},
            {x: 346, y: 436, degrees: -15},
            {x: 376, y: 422, degrees: -34},
            {x: 401, y: 399, degrees: -52},
            {x: 421, y: 372, degrees: -55}]
    },
    // santa fe - oklahoma city
    {
        id: 42,
        cityOneId: 29,
        cityTwoId: 20,
        trainColor: TrainColor.BLUE,
        paths: [{x: 321, y: 369, degrees: 2},
            {x: 357, y: 370, degrees: -1},
            {x: 393, y: 368, degrees: -6}]
    },
    // el paso - houston
    {
        id: 43,
        cityOneId: 8,
        cityTwoId: 10,
        trainColor: TrainColor.GREEN,
        paths: [{x: 307, y: 465, degrees: 28},
            {x: 337, y: 479, degrees: 21},
            {x: 369, y: 488, degrees: 11},
            {x: 402, y: 491, degrees: -1},
            {x: 435, y: 488, degrees: -9},
            {x: 466, y: 476, degrees: -31}]
    },
    // oklahoma city - dallas
    {
        id: 44,
        cityOneId: 20,
        cityTwoId: 5,
        trainColor: TrainColor.WILD,
        paths: [{x: 442, y: 371, degrees: 87},
            {x: 444, y: 403, degrees: 87}]
    },
    // oklahoma city - dallas
    {
        id: 45,
        cityOneId: 20,
        cityTwoId: 5,
        trainColor: TrainColor.WILD,
        paths: [{x: 454, y: 370, degrees: 87},
            {x: 456, y: 402, degrees: 87}]
    },
    // dallas - houston
    {
        id: 46,
        cityOneId: 5,
        cityTwoId: 10,
        trainColor: TrainColor.WILD,
        paths: [{x: 463, y: 448, degrees: 45}]
    },
    // dallas - houston
    {
        id: 47,
        cityOneId: 5,
        cityTwoId: 10,
        trainColor: TrainColor.WILD,
        paths: [{x: 472, y: 439, degrees: 45}]
    },
    // el paso - dallas
    {
        id: 48,
        cityOneId: 8,
        cityTwoId: 5,
        trainColor: TrainColor.RED,
        paths: [{x: 328, y: 454, degrees: -7},
            {x: 360, y: 449, degrees: -9},
            {x: 392, y: 443, degrees: -12},
            {x: 424, y: 435, degrees: -15}]
    },
    // helena - denver
    {
        id: 49,
        cityOneId: 9,
        trainColor: TrainColor.GREEN,
        cityTwoId: 6,
        paths: [{x: 258, y: 176, degrees: 87},
            {x: 260, y: 208, degrees: 86},
            {x: 269, y: 238, degrees: 48},
            {x: 292, y: 261, degrees: 39}]
    },
    // helena - omaha
    {
        id: 50,
        cityOneId: 9,
        cityTwoId: 21,
        trainColor: TrainColor.RED,
        paths: [{x: 284, y: 172, degrees: 21},
            {x: 315, y: 184, degrees: 22},
            {x: 346, y: 196, degrees: 21},
            {x: 377, y: 207, degrees: 19},
            {x: 408, y: 218, degrees: 20}]
    },
    // oklahoma city - little rock
    {
        id: 51,
        cityOneId: 20,
        cityTwoId: 13,
        trainColor: TrainColor.WILD,
        paths: [{x: 455, y: 348, degrees: 1},
            {x: 488, y: 350, degrees: 5}]
    },
    // dallas - little rock
    {
        id: 52,
        cityOneId: 5,
        cityTwoId: 13,
        trainColor: TrainColor.WILD,
        paths: [{x: 479, y: 406, degrees: -50},
            {x: 499, y: 377, degrees: -61}]
    },
    // houston - new orleans
    {
        id: 53,
        cityOneId: 10,
        cityTwoId: 18,
        trainColor: TrainColor.WILD,
        paths: [{x: 510, y: 458, degrees: -8},
            {x: 543, y: 453, degrees: -9}]
    },
    // new orleans - little rock
    {
        id: 54,
        cityOneId: 18,
        cityTwoId: 13,
        trainColor: TrainColor.GREEN,
        paths: [{x: 524, y: 373, degrees: 60},
            {x: 540, y: 401, degrees: 60},
            {x: 556, y: 429, degrees: 60}]
    },
    // new orleans - atlanta
    {
        id: 55,
        cityOneId: 18,
        cityTwoId: 0,
        trainColor: TrainColor.YELLOW,
        paths: [
            {x: 579, y: 430, degrees: -66},
            {x: 593, y: 402, degrees: -58},
            {x: 611, y: 376, degrees: -52},
            {x: 632, y: 352, degrees: -47}
        ]
    },
    // new orleans - atlanta
    {
        id: 56,
        cityOneId: 18,
        cityTwoId: 0,
        trainColor: TrainColor.ORANGE,
        paths: [{x: 589, y: 438, degrees: -66},
            {x: 603, y: 410, degrees: -58},
            {x: 621, y: 384, degrees: -52},
            {x: 642, y: 360, degrees: -46}]
    },
    // atlanta - miami
    {
        id: 57,
        cityOneId: 0,
        cityTwoId: 15,
        trainColor: TrainColor.BLUE,
        paths: [{x: 671, y: 361, degrees: 56},
            {x: 689, y: 388, degrees: 56},
            {x: 708, y: 414, degrees: 52},
            {x: 728, y: 439, degrees: 51},
            {x: 748, y: 464, degrees: 51}]
    },
    // miami - new orleans
    {
        id: 58,
        cityOneId: 15,
        cityTwoId: 18,
        trainColor: TrainColor.RED,
        paths: [{x: 743, y: 481, degrees: 45},
            {x: 720, y: 458, degrees: 45},
            {x: 696, y: 435, degrees: 42},
            {x: 664, y: 424, degrees: -1},
            {x: 632, y: 434, degrees: -34},
            {x: 605, y: 452, degrees: -34}]
    },
    // miami - charleston
    {
        id: 59,
        cityOneId: 15,
        cityTwoId: 3,
        trainColor: TrainColor.PINK,
        paths: [{x: 734, y: 370, degrees: 84},
            {x: 740, y: 402, degrees: 74},
            {x: 751, y: 433, degrees: 66},
            {x: 766, y: 462, degrees: 60}]
    },
    // atlanta - charleston
    {
        id: 60,
        cityOneId: 0,
        cityTwoId: 3,
        trainColor: TrainColor.WILD,
        paths: [{x: 679, y: 340, degrees: 11},
            {x: 712, y: 344, degrees: 3}]
    },
    // nashville - atlanta
    {
        id: 61,
        cityOneId: 17,
        cityTwoId: 0,
        trainColor: TrainColor.WILD,
        paths: [{x: 628, y: 322, degrees: 36}]
    },
    // atlanta - raleigh
    {
        id: 62,
        cityOneId: 0,
        cityTwoId: 25,
        trainColor: TrainColor.WILD,
        paths: [{x: 661, y: 313, degrees: -35},
            {x: 687, y: 295, degrees: -36}]
    },
    // atlanta - raleigh
    {
        id: 63,
        cityOneId: 0,
        cityTwoId: 25,
        trainColor: TrainColor.WILD,
        paths: [{x: 669, y: 322, degrees: -35},
            {x: 695, y: 304, degrees: -36}]
    },
    // nashville - raleigh
    {
        id: 64,
        cityOneId: 17,
        cityTwoId: 25,
        trainColor: TrainColor.BLACK,
        paths: [{x: 619, y: 285, degrees: -43},
            {x: 650, y: 270, degrees: -9},
            {x: 684, y: 271, degrees: 12}]
    },
    // little rock - nashville
    {
        id: 65,
        cityOneId: 13,
        cityTwoId: 17,
        trainColor: TrainColor.WHITE,
        paths: [{x: 532, y: 345, degrees: -15},
            {x: 563, y: 336, degrees: -17},
            {x: 592, y: 322, degrees: -41}]
    },
    // saint louis - nashville
    {
        id: 66,
        cityOneId: 26,
        cityTwoId: 17,
        trainColor: TrainColor.WILD,
        paths: [{x: 549, y: 292, degrees: 24},
            {x: 581, y: 302, degrees: 13}]
    },
    // saint louis - little rock
    {
        id: 67,
        cityOneId: 26,
        cityTwoId: 13,
        trainColor: TrainColor.WILD,
        paths: [{x: 524, y: 297, degrees: -82},
            {x: 515, y: 329, degrees: -68}]
    },
    // kansas city - saint louis
    {
        id: 68,
        cityOneId: 11,
        cityTwoId: 26,
        trainColor: TrainColor.PINK,
        paths: [{x: 471, y: 274, degrees: 4},
            {x: 503, y: 276, degrees: 3}]
    },
    // kansas city - saint louis
    {
        id: 69,
        cityOneId: 11,
        cityTwoId: 26,
        trainColor: TrainColor.BLUE,
        paths: [{x: 474, y: 261, degrees: 4},
            {x: 506, y: 263, degrees: 3}]
    },
    // raleigh - charleston
    {
        id: 70,
        cityOneId: 25,
        cityTwoId: 3,
        trainColor: TrainColor.WILD,
        paths: [{x: 732, y: 304, degrees: 36},
            {x: 746, y: 325, degrees: -55}]
    },
    // omaha - chicago
    {
        id: 71,
        cityOneId: 21,
        cityTwoId: 4,
        trainColor: TrainColor.BLUE,
        paths: [{x: 464, y: 209, degrees: -55},
            {x: 484, y: 183, degrees: -49},
            {x: 514, y: 180, degrees: 25},
            {x: 543, y: 194, degrees: 25}]
    },
    // duluth - chicago
    {
        id: 72,
        cityOneId: 7,
        cityTwoId: 4,
        trainColor: TrainColor.RED,
        paths: [{x: 481, y: 157, degrees: 7},
            {x: 514, y: 165, degrees: 21},
            {x: 546, y: 179, degrees: 23}]
    },
    // saint louis - chicago
    {
        id: 73,
        cityOneId: 26,
        cityTwoId: 4,
        trainColor: TrainColor.GREEN,
        paths: [{x: 531, y: 245, degrees: -50},
            {x: 552, y: 220, degrees: -50}]
    },
    // saint louis - chicago
    {
        id: 74,
        cityOneId: 26,
        trainColor: TrainColor.WHITE,
        cityTwoId: 4,
        paths: [{x: 541, y: 253, degrees: -51},
            {x: 562, y: 228, degrees: -51}]
    },
    // saint louis - pittsburgh
    {
        id: 75,
        cityOneId: 26,
        cityTwoId: 23,
        trainColor: TrainColor.GREEN,
        paths: [{x: 551, y: 266, degrees: -32},
            {x: 578, y: 250, degrees: -33},
            {x: 605, y: 233, degrees: -33},
            {x: 632, y: 216, degrees: -34},
            {x: 658, y: 198, degrees: -34}]
    },
    // nashville - pittsburgh
    {
        id: 76,
        cityOneId: 17,
        cityTwoId: 23,
        trainColor: TrainColor.YELLOW,
        paths: [{x: 601, y: 284, degrees: -60},
            {x: 622, y: 259, degrees: -40},
            {x: 646, y: 237, degrees: -44},
            {x: 668, y: 213, degrees: -50}]
    },
    // raleigh - pittsburgh
    {
        id: 77,
        cityOneId: 25,
        cityTwoId: 23,
        trainColor: TrainColor.WILD,
        paths: [{x: 691, y: 224, degrees: 70},
            {x: 703, y: 256, degrees: 70}]
    },
    // raleigh - washington
    {
        id: 78,
        cityOneId: 25,
        cityTwoId: 34,
        trainColor: TrainColor.WILD,
        paths: [{x: 743, y: 242, degrees: -52},
            {x: 723, y: 267, degrees: -50}]
    },
    // raleigh - washington
    {
        id: 79,
        cityOneId: 25,
        cityTwoId: 34,
        trainColor: TrainColor.WILD,
        paths: [{x: 752, y: 250, degrees: -52},
            {x: 732, y: 275, degrees: -50}]
    },
    // pittsburgh - washington
    {
        id: 80,
        cityOneId: 23,
        cityTwoId: 34,
        trainColor: TrainColor.WILD,
        paths: [{x: 708, y: 205, degrees: 20},
            {x: 739, y: 216, degrees: 20}]
    },
    // chicago - pittsburgh
    {
        id: 81,
        cityOneId: 4,
        cityTwoId: 23,
        trainColor: TrainColor.BLACK,
        paths: [{x: 588, y: 194, degrees: -12},
            {x: 621, y: 187, degrees: -12},
            {x: 653, y: 181, degrees: -10}]
    },
    // chicago - pittsburgh
    {
        id: 82,
        cityOneId: 4,
        cityTwoId: 23,
        trainColor: TrainColor.ORANGE,
        paths: [{x: 585, y: 182, degrees: -12},
            {x: 618, y: 175, degrees: -12},
            {x: 651, y: 169, degrees: -9}]
    },
    // washington - new york
    {
        id: 83,
        cityOneId: 34,
        cityTwoId: 19,
        trainColor: TrainColor.ORANGE,
        paths: [{x: 761, y: 205, degrees: 83},
            {x: 757, y: 173, degrees: 84}]
    },
    // washington - new york
    {
        id: 84,
        cityOneId: 34,
        cityTwoId: 19,
        trainColor: TrainColor.BLACK,
        paths: [{x: 774, y: 206, degrees: 83},
            {x: 770, y: 174, degrees: 84}]
    },
    // new york - boston
    {
        id: 85,
        cityOneId: 19,
        cityTwoId: 1,
        trainColor: TrainColor.YELLOW,
        paths: [{x: 785, y: 100, degrees: -55},
            {x: 766, y: 127, degrees: -56}]
    },
    // new york - boston
    {
        id: 86,
        cityOneId: 19,
        cityTwoId: 1,
        trainColor: TrainColor.RED,
        paths: [{x: 779, y: 131, degrees: -56},
            {x: 798, y: 104, degrees: -56}]
    },
    // boston - montreal
    {
        id: 87,
        cityOneId: 1,
        cityTwoId: 16,
        trainColor: TrainColor.WILD,
        paths: [{x: 757, y: 48, degrees: 40},
            {x: 782, y: 69, degrees: 39}]
    },
    // boston - montreal
    {
        id: 88,
        cityOneId: 1,
        cityTwoId: 16,
        trainColor: TrainColor.WILD,
        paths: [{x: 765, y: 38, degrees: 40},
            {x: 790, y: 59, degrees: 39}]
    },
    // new york - montreal
    {
        id: 89,
        cityOneId: 19,
        cityTwoId: 16,
        trainColor: TrainColor.BLUE,
        paths: [{x: 735, y: 56, degrees: 89},
            {x: 737, y: 90, degrees: 84},
            {x: 743, y: 123, degrees: 77}]
    },
    // toronto - montreal
    {
        id: 90,
        cityOneId: 32,
        cityTwoId: 16,
        trainColor: TrainColor.WILD,
        paths: [{x: 670, y: 85, degrees: -70},
            {x: 687, y: 56, degrees: -50},
            {x: 714, y: 36, degrees: -20}]
    },
    // sault st. marie - montreal
    {
        id: 91,
        cityOneId: 30,
        cityTwoId: 16,
        trainColor: TrainColor.BLACK,
        paths: [{x: 587, y: 69, degrees: -45},
            {x: 610, y: 45, degrees: -46},
            {x: 638, y: 24, degrees: -30},
            {x: 671, y: 14, degrees: -4},
            {x: 705, y: 16, degrees: 11}]
    },
    // duluth - toronto
    {
        id: 92,
        cityOneId: 7,
        cityTwoId: 32,
        trainColor: TrainColor.PINK,
        paths: [{x: 481, y: 141, degrees: -9},
            {x: 513, y: 136, degrees: -9},
            {x: 545, y: 131, degrees: -9},
            {x: 578, y: 125, degrees: -10},
            {x: 611, y: 119, degrees: -10},
            {x: 643, y: 113, degrees: -11}]
    },
    // chicago - toronto
    {
        id: 93,
        cityOneId: 4,
        cityTwoId: 32,
        trainColor: TrainColor.WHITE,
        paths: [{x: 567, y: 163, degrees: -70},
            {x: 591, y: 141, degrees: -18},
            {x: 622, y: 133, degrees: -11},
            {x: 654, y: 125, degrees: -18}]
    },
    // toronto - pittsburgh
    {
        id: 94,
        cityOneId: 32,
        cityTwoId: 23,
        trainColor: TrainColor.WILD,
        paths: [{x: 678, y: 130, degrees: 83},
            {x: 678, y: 164, degrees: -86}]
    },
    // pittsburgh - new york
    {
        id: 95,
        cityOneId: 23,
        cityTwoId: 19,
        trainColor: TrainColor.WHITE,
        paths: [{x: 700, y: 169, degrees: -30},
            {x: 728, y: 152, degrees: -32}]
    },
    // pittsburgh - new york
    {
        id: 96,
        cityOneId: 23,
        cityTwoId: 19,
        trainColor: TrainColor.GREEN,
        paths: [{x: 706, y: 180, degrees: -29},
            {x: 734, y: 163, degrees: -32}]
    },
    // sault st. marie - toronto
    {
        id: 97,
        cityOneId: 30,
        cityTwoId: 32,
        trainColor: TrainColor.WILD,
        paths: [{x: 602, y: 93, degrees: 7},
            {x: 635, y: 97, degrees: 6}]
    },
    // duluth - sault st. marie
    {
        id: 98,
        cityOneId: 7,
        cityTwoId: 30,
        trainColor: TrainColor.WILD,
        paths: [{x: 480, y: 126, degrees: -20},
            {x: 512, y: 114, degrees: -21},
            {x: 544, y: 101, degrees: -23}]
    },
    // winnipeg - sault st. marie
    {
        id: 99,
        cityOneId: 35,
        cityTwoId: 30,
        trainColor: TrainColor.WILD,
        paths: [{x: 385, y: 44, degrees: 14},
            {x: 417, y: 53, degrees: 14},
            {x: 449, y: 61, degrees: 13},
            {x: 481, y: 69, degrees: 13},
            {x: 513, y: 76, degrees: 12},
            {x: 545, y: 82, degrees: 10}]
    }
]

// Cities
export const CITY_RADIUS = 5
export const CITY_FONT = 'normal 12px serif'
export const CITY_COLOR = 'black'
export const CITY_LINE_WIDTH = 1
export const CITIES: any[] = [
    {
        x:  667,
        y:  343,
        labelX: 692,
        labelY: 337,
        name: 'Atlanta'
    },
    {
        x:  815,
        y:  88,
        labelX: 767,
        labelY: 91,
        name: 'Boston'
    },
    {
        x:  176,
        y:  41,
        labelX: 143,
        labelY: 28,
        name: 'Calgary'
    },
    {
        x:  750,
        y:  350,
        labelX: 760,
        labelY: 350,
        name: 'Charleston'
    },
    {
        x:  580,
        y:  206,
        labelX: 584,
        labelY: 217,
        name: 'Chicago'
    },
    {
        x:  464,
        y:  431,
        labelX: 492,
        labelY: 434,
        name: 'Dallas'
    },
    {
        x:  316,
        y:  293,
        labelX: 338,
        labelY: 283,
        name: 'Denver'
    },
    {
        x:  473,
        y:  151,
        labelX: 424,
        labelY: 142,
        name: 'Duluth'
    },
    {
        x:  305,
        y:  452,
        labelX: 280,
        labelY: 480,
        name: 'El Paso'
    },
    {
        x:  264,
        y:  156,
        labelX: 218,
        labelY: 166,
        name: 'Helena'
    },
    {
        x:  500,
        y:  466,
        labelX: 506,
        labelY: 482,
        name: 'Houston'
    },
    {
        x:  464,
        y:  277,
        labelX: 478,
        labelY: 300,
        name: 'Kansas City'
    },
    {
        x:  152,
        y:  362,
        labelX: 157,
        labelY: 375,
        name: 'Las Vegas'
    },
    {
        x:  526,
        y:  357,
        labelX: 540,
        labelY: 365,
        name: 'Little Rock'
    },
    {
        x:  95,
        y:  413,
        labelX: 28,
        labelY: 426,
        name: 'Los Angeles'
    },
    {
        x:  778,
        y:  487,
        labelX: 786,
        labelY: 494,
        name: 'Miami'
    },
    {
        x:  753,
        y:  36,
        labelX: 743,
        labelY: 24,
        name: 'Montreal'
    },
    {
        x:  623,
        y:  312,
        labelX: 630,
        labelY: 312,
        name: 'Nashville'
    },
    {
        x:  582,
        y:  454,
        labelX: 576,
        labelY: 480,
        name: 'New Orleans'
    },
    {
        x:  769,
        y:  153,
        labelX: 786,
        labelY: 161,
        name: 'New York'
    },
    {
        x:  446,
        y:  353,
        labelX: 370,
        labelY: 340,
        name: 'Oklahoma City'
    },
    {
        x:  445,
        y:  232,
        labelX: 464,
        labelY: 238,
        name: 'Omaha'
    },
    {
        x:  200,
        y:  419,
        labelX: 154,
        labelY: 427,
        name: 'Phoenix'
    },
    {
        x:  695,
        y:  193,
        labelX: 718,
        labelY: 202,
        name: 'Pittsburgh'
    },
    {
        x:  38,
        y:  148,
        labelX: 46,
        labelY: 172,
        name: 'Portland'
    },
    {
        x:  725,
        y:  292,
        labelX: 750,
        labelY: 298,
        name: 'Raleigh'
    },
    {
        x:  540,
        y:  279,
        labelX: 558,
        labelY: 290,
        name: 'Saint Louis'
    },
    {
        x:  201,
        y:  265,
        labelX: 120,
        labelY: 249,
        name: 'Salt Lake City'
    },
    {
        x:  27,
        y:  321,
        labelX: 48,
        labelY: 332,
        name: 'San Francisco'
    },
    {
        x:  309,
        y:  372,
        labelX: 261,
        labelY: 363,
        name: 'Santa Fe'
    },
    {
        x:  584,
        y:  93,
        labelX: 525,
        labelY: 70,
        name: 'Sault St. Marie'
    },
    {
        x:  58,
        y:  104,
        labelX: 13,
        labelY: 102,
        name: 'Seattle'
    },
    {
        x:  680,
        y:  113,
        labelX: 690,
        labelY: 110,
        name: 'Toronto'
    },
    {
        x:  61,
        y:  56,
        labelX: 21,
        labelY: 45,
        name: 'Vancouver'
    },
    {
        x:  777,
        y:  233,
        labelX: 780,
        labelY: 246,
        name: 'Washington'
    },
    {
        x:  374,
        y:  50,
        labelX: 374,
        labelY: 37,
        name: 'Winnipeg'
    }
]

export const ID_CITY_MAP = {
    0: 'Atlanta',
    1: 'Boston',
    2: 'Calgary',
    3: 'Charleston',
    4: 'Chicago',
    5: 'Dallas',
    6: 'Denver',
    7: 'Duluth',
    8: 'El Paso',
    9: 'Helena',
    10: 'Houston',
    11: 'Kansas City',
    12: 'Las Vegas',
    13: 'Little Rock',
    14: 'Los Angeles',
    15: 'Miami',
    16: 'Montreal',
    17: 'Nashville',
    18: 'New Orleans',
    19: 'New York',
    20: 'Oklahoma City',
    21: 'Omaha',
    22: 'Phoenix',
    23: 'Pittsburgh',
    24: 'Portland',
    25: 'Raleigh',
    26: 'Saint Louis',
    27: 'Salt Lake City',
    28: 'San Francisco',
    29: 'Santa Fe',
    30: 'Sault St. Marie',
    31: 'Seattle',
    32: 'Toronto',
    33: 'Vancouver',
    34: 'Washington',
    35: 'Winnipeg'
}
