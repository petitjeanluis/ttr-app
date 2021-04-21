import { Drawable } from "../models/drawable"
import {CITY_COLOR, CITY_FONT, CITY_RADIUS, CITY_LINE_WIDTH} from "../resources/constants"
import {StaticEntity} from "../models/static-entity";

export class City implements StaticEntity{
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
        ctx.font = CITY_FONT
        ctx.fillStyle = CITY_COLOR
        ctx.lineWidth = CITY_LINE_WIDTH
        ctx.beginPath()
        ctx.arc(this.x,this.y,CITY_RADIUS, 0,2*Math.PI)
        ctx.fillText(this.name,this.labelX,this.labelY)
        ctx.stroke()
        ctx.restore()
    }
}
