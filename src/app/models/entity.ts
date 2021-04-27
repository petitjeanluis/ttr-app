import {Drawable} from "./drawable";
import {Point} from "./point";

export abstract class Entity implements Drawable {

    protected constructor(protected location: Point) {
    }

    abstract draw(ctx: CanvasRenderingContext2D): void

    getLocation() {
        return this.location
    }

}
