import {Point} from "./point";

export interface Touchable {
    isTouched(point: Point): boolean
}
