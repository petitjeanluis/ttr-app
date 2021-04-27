import {Entity} from "../models/entity";
import {Point} from "../models/point";
import {CITY_COLOR, CITY_FONT, CITY_LINE_WIDTH, CITY_RADIUS} from "../resources/board-constants";

export class City extends Entity{
    labelX: number
    labelY: number
    name: string

    constructor(location: Point, labelX: number, labelY: number, name: string) {
        super(location)
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
        ctx.arc(this.location.x,this.location.y,CITY_RADIUS, 0,2*Math.PI)
        ctx.fillText(this.name,this.labelX,this.labelY)
        ctx.stroke()
        ctx.restore()
    }
}
