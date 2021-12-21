import {TouchableEntity} from '../interfaces/touchable-entity'
import {Point} from '../models/point'

export class DestinationCard extends TouchableEntity {

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx)
    }

    draw(): void {
    }

    isTouched(point: Point): boolean {
        return false;
    }

}
