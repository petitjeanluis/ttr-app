import {Drawable} from './drawable'

export abstract class Entity implements Drawable {
    protected readonly ctx: CanvasRenderingContext2D

    protected constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }

    abstract draw(data?: any): void

}
