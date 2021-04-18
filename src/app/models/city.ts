import { Drawable } from "../resources/drawable"
import {CITY_COLOR, CITY_FONT, CITY_RADIUS_S, LINE_WIDTH, SCALE} from "../resources/constants"

export class City implements Drawable{
    x: number
    y: number
    labelX: number
    labelY: number
    name: string

    constructor(x: number, y: number, labelX: number, labelY: number, name: string) {
        this.x = x*SCALE
        this.y = y*SCALE
        this.labelX = labelX*SCALE
        this.labelY = labelY*SCALE
        this.name = name
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.font = CITY_FONT
        ctx.fillStyle = CITY_COLOR
        ctx.lineWidth = LINE_WIDTH
        ctx.beginPath()
        ctx.arc(this.x,this.y,CITY_RADIUS_S, 0,2*Math.PI)
        ctx.fillText(this.name,this.labelX,this.labelY)
        ctx.stroke()
        ctx.restore()
    }
}
