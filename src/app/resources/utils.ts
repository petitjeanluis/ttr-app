import {TRAIN_CARD_HEIGHT, TRAIN_CARD_WIDTH} from './game-cards-constants';
import {Point} from '../models/point';

export class Utils {

    private constructor() {
    }

    // Fisher-Yates Shuffle Algorithm
    static shuffleArray(arr: any[]): void {
        const n = arr.length;
        let temp
        let j
        for (let i = n; i > 0; i--) {
            j = Math.floor(Math.random() * i)
            temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }

    static rectangleTouched(point: Point, x, y, w, h): boolean{
        const xMax = x + w
        const yMax = y + h

        if (
            point.x >= x &&
            point.x <= xMax &&
            point.y >= y &&
            point.y <= yMax
        ) {
            return true
        } else {
            return false
        }
    }

}

