import {InteractiveEntity} from "../models/interactive-entity";
import {Point} from "../models/point";

export class DestinationCard extends InteractiveEntity {

    constructor(location: Point) {
        super(location)
    }

    draw(ctx: CanvasRenderingContext2D): void {
    }

    isTouched(point: Point): boolean {
        return false;
    }

}
