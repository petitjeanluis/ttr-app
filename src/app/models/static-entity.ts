import {Drawable} from "./drawable";

export interface StaticEntity extends Drawable {

    draw(ctx: CanvasRenderingContext2D): void

}
