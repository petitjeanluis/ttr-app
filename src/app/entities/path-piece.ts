import {Point} from '../models/point'
import {Line} from '../models/line'
import {TouchableEntity} from '../interfaces/touchable-entity'
import {
    PATH_PIECE_HEIGHT,
    PATH_PIECE_LINE_WIDTH,
    PATH_PIECE_WIDTH
} from '../resources/board-constants'
import {TrainColor} from '../models/train-color';
import { COLOR_MAP } from '../resources/constants';
import { PlayerColor } from '../models/player-color';

export class PathPiece extends TouchableEntity {

    private point: Point
    private readonly width: number
    private readonly height: number
    private readonly degrees: number
    public trainColor: TrainColor

    private readonly topLeftPoint: Point
    private readonly topRightPoint: Point
    private readonly bottomLeftPoint: Point
    private readonly bottomRightPoint: Point

    private readonly topLine: Line
    private readonly rightLine: Line
    private readonly bottomLine: Line
    private readonly leftLine: Line


    constructor(point: Point, degrees: number, trainColor: TrainColor, ctx: CanvasRenderingContext2D) {
        super(ctx)
        this.width = PATH_PIECE_WIDTH
        this.height = PATH_PIECE_HEIGHT
        this.degrees = degrees
        this.point = point
        this.trainColor = trainColor

        const shiftX = this.point.x + PATH_PIECE_WIDTH / 2
        const shiftY = this.point.y + PATH_PIECE_HEIGHT / 2

        this.topLeftPoint = new Point(-PATH_PIECE_WIDTH / 2, - PATH_PIECE_HEIGHT / 2)
        this.topLeftPoint.rotatePoint(this.degrees)
        this.topLeftPoint.translatePoint(shiftX, shiftY)

        this.topRightPoint = new Point(PATH_PIECE_WIDTH / 2, - PATH_PIECE_HEIGHT / 2)
        this.topRightPoint.rotatePoint(this.degrees)
        this.topRightPoint.translatePoint(shiftX, shiftY)

        this.bottomLeftPoint = new Point(-PATH_PIECE_WIDTH / 2, PATH_PIECE_HEIGHT / 2)
        this.bottomLeftPoint.rotatePoint(this.degrees)
        this.bottomLeftPoint.translatePoint(shiftX, shiftY)

        this.bottomRightPoint = new Point(PATH_PIECE_WIDTH / 2, PATH_PIECE_HEIGHT / 2)
        this.bottomRightPoint.rotatePoint(this.degrees)
        this.bottomRightPoint.translatePoint(shiftX, shiftY)

        this.topLine = Line.fromPoints(this.topLeftPoint, this.topRightPoint)
        this.rightLine = Line.fromPoints(this.topRightPoint, this.bottomRightPoint)
        this.bottomLine = Line.fromPoints(this.bottomLeftPoint, this.bottomRightPoint)
        this.leftLine = Line.fromPoints(this.topLeftPoint, this.bottomLeftPoint)
    }


    public draw(playerColor: PlayerColor): void {
        this.ctx.save()

        this.ctx.translate(this.point.x + this.width / 2, this.point.y + this.height / 2)
        this.ctx.rotate((Math.PI / 180) * this.degrees)

        if (playerColor) {
            this.ctx.fillStyle = COLOR_MAP[playerColor]
            this.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
        }
        else {
            this.ctx.lineWidth = PATH_PIECE_LINE_WIDTH
            this.ctx.strokeStyle = COLOR_MAP[this.trainColor]
            this.ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height)
        }

        this.ctx.restore()
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

    setTrainType(trainType: TrainColor) {
        this.trainColor = trainType
    }

}
