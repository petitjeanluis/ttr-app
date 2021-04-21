import {
    LINE_WIDTH,
    PATH_EMPTY_COLOR,
    PATH_PIECE_HEIGHT,
    PATH_PIECE_WIDTH
} from "../resources/constants";
import {Drawable} from "../models/drawable";
import {Point} from "../models/point";
import {Line} from "../models/line";
import {DynamicEntity} from "../models/dynamic-entity";

export class PathPiece implements  DynamicEntity {

    // top left corner
    x: number
    y: number
    width: number
    height: number
    degrees: number
    color: string

    topLeftPoint: Point
    topRightPoint: Point
    bottomLeftPoint: Point
    bottomRightPoint: Point

    topLine: Line
    rightLine: Line
    bottomLine: Line
    leftLine: Line


    constructor(x:number, y:number, degrees: number) {
        this.x = x
        this.y = y
        this.width = PATH_PIECE_WIDTH
        this.height = PATH_PIECE_HEIGHT
        this.degrees = degrees
        this.color = PATH_EMPTY_COLOR

        let shiftX = this.x + PATH_PIECE_WIDTH/2
        let shiftY = this.y + PATH_PIECE_HEIGHT/2

        this.topLeftPoint = new Point(-PATH_PIECE_WIDTH/2,-PATH_PIECE_HEIGHT/2)
        this.topLeftPoint.rotatePoint(this.degrees)
        this.topLeftPoint.translatePoint(shiftX,shiftY)

        this.topRightPoint = new Point(PATH_PIECE_WIDTH/2,-PATH_PIECE_HEIGHT/2)
        this.topRightPoint.rotatePoint(this.degrees)
        this.topRightPoint.translatePoint(shiftX,shiftY)

        this.bottomLeftPoint = new Point(-PATH_PIECE_WIDTH/2,PATH_PIECE_HEIGHT/2)
        this.bottomLeftPoint.rotatePoint(this.degrees)
        this.bottomLeftPoint.translatePoint(shiftX,shiftY)

        this.bottomRightPoint = new Point(PATH_PIECE_WIDTH/2,PATH_PIECE_HEIGHT/2)
        this.bottomRightPoint.rotatePoint(this.degrees)
        this.bottomRightPoint.translatePoint(shiftX,shiftY)

        this.topLine = Line.fromPoints(this.topLeftPoint,this.topRightPoint)
        this.rightLine = Line.fromPoints(this.topRightPoint,this.bottomRightPoint)
        this.bottomLine = Line.fromPoints(this.bottomLeftPoint,this.bottomRightPoint)
        this.leftLine = Line.fromPoints(this.topLeftPoint,this.bottomLeftPoint)
    }


    public draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.strokeStyle = this.color
        ctx.lineWidth = LINE_WIDTH
        ctx.translate(this.x+this.width/2, this.y+this.height/2)
        ctx.rotate((Math.PI/180)*this.degrees)
        ctx.strokeRect(-this.width/2,-this.height/2,this.width,this.height)
        ctx.restore()
    }

    isTouched(point: Point): boolean {
        if (this.degrees > 90) {
            return (this.topLine.isPointAboveLine(point) &&
                this.rightLine.isPointAboveLine(point) &&
                this.bottomLine.isPointBelowLine(point) &&
                this.leftLine.isPointBelowLine(point))
        }
        else if (this.degrees >= 0) {
            return (this.topLine.isPointBelowLine(point) &&
                this.rightLine.isPointAboveLine(point) &&
                this.bottomLine.isPointAboveLine(point) &&
                this.leftLine.isPointBelowLine(point))
        }
        else if (this.degrees < -90) {
            return (
                this.topLine.isPointAboveLine(point) &&
                this.rightLine.isPointBelowLine(point) &&
                this.bottomLine.isPointBelowLine(point) &&
                this.leftLine.isPointAboveLine(point))
        }
        else if (this.degrees < 0) {
            return (
                this.topLine.isPointBelowLine(point) &&
                this.rightLine.isPointBelowLine(point) &&
                this.bottomLine.isPointAboveLine(point) &&
                this.leftLine.isPointAboveLine(point))
        }

        return false
    }

}
