import { Drawable } from "../definitions/drawable"
import { SCALE } from "../definitions/constants"

export class City implements Drawable{
    x: number
    y: number
    labelX: number
    labelY: number
    name: string

    constructor(x: number, y: number, labelX: number, labelY: number, name: string) {
        this.x = x
        this.y = y
        this.labelX = labelX
        this.labelY = labelY
        this.name = name
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.font = 'normal 12px serif'
        ctx.fillStyle = 'black'
        ctx.lineWidth = 1*SCALE
        let radius = 5*SCALE
        let x_draw = this.x*SCALE
        let y_draw = this.y*SCALE
        let labelX = this.labelX*SCALE
        let labelY = this.labelY*SCALE
        ctx.beginPath()
        ctx.arc(x_draw,y_draw,radius, 0,2*Math.PI)
        ctx.fillText(this.name,labelX,labelY)
        ctx.stroke()
        ctx.restore()
    }
}