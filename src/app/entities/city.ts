import {Entity} from '../interfaces/entity'
import {Point} from '../models/point'
import {CITY_COLOR, CITY_FONT, CITY_LINE_WIDTH, CITY_RADIUS} from '../resources/board-constants'

export class City extends Entity{
    private readonly labelX: number
    private readonly labelY: number
    private readonly name: string
    private readonly point: Point

    constructor(point: Point, labelX: number, labelY: number, name: string, ctx: CanvasRenderingContext2D) {
        super(ctx)
        this.point = point
        this.labelX = labelX
        this.labelY = labelY
        this.name = name
    }

    public draw(): void {
        this.ctx.save()
        this.ctx.font = CITY_FONT
        this.ctx.fillStyle = CITY_COLOR
        this.ctx.lineWidth = CITY_LINE_WIDTH
        this.ctx.beginPath()
        this.ctx.arc(this.point.x, this.point.y, CITY_RADIUS, 0, 2 * Math.PI)
        this.ctx.fillText(this.name, this.labelX, this.labelY)
        this.ctx.stroke()
        this.ctx.restore()
    }
}
