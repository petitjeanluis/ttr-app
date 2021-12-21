import {Point} from '../models/point'
import {Touchable} from './touchable'
import {Entity} from './entity'

export abstract class TouchableEntity extends Entity implements Touchable {

    protected constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    abstract isTouched(point: Point): boolean

}
