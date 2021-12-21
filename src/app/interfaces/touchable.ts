import {Point} from '../models/point'

export interface Touchable {
    isTouched(point: Point): boolean
}
