import {Drawable} from "./drawable";
import {Point} from "./point";
import {Touchable} from "./touchable";

export interface DynamicEntity extends Drawable, Touchable {

    draw(ctx: CanvasRenderingContext2D): void

    isTouched(point: Point): boolean
}
