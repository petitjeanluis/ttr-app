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

        const pivotX = this.point.x + PATH_PIECE_WIDTH / 2
        const pivotY = this.point.y + PATH_PIECE_HEIGHT / 2

        this.topLeftPoint = new Point(this.point.x, this.point.y)
        this.topLeftPoint.rotateAroundPivotPoint(this.degrees, pivotX, pivotY)

        this.topRightPoint = new Point(this.point.x + PATH_PIECE_WIDTH, this.point.y)
        this.topRightPoint.rotateAroundPivotPoint(this.degrees, pivotX, pivotY)

        this.bottomLeftPoint = new Point(this.point.x, this.point.y + PATH_PIECE_HEIGHT)
        this.bottomLeftPoint.rotateAroundPivotPoint(this.degrees, pivotX, pivotY)

        this.bottomRightPoint = new Point(this.point.x + PATH_PIECE_WIDTH, this.point.y + PATH_PIECE_HEIGHT)
        this.bottomRightPoint.rotateAroundPivotPoint(this.degrees, pivotX, pivotY)

        this.topLine = Line.fromPoints(this.topLeftPoint, this.topRightPoint)
        this.rightLine = Line.fromPoints(this.topRightPoint, this.bottomRightPoint)
        this.bottomLine = Line.fromPoints(this.bottomLeftPoint, this.bottomRightPoint)
        this.leftLine = Line.fromPoints(this.topLeftPoint, this.bottomLeftPoint)
    }

    public drawTestPoints() {
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.topLeftPoint.x, this.topLeftPoint.y, 3, 3)
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.topRightPoint.x, this.topRightPoint.y, 3, 3)
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.bottomLeftPoint.x, this.bottomLeftPoint.y, 3, 3)
        this.ctx.fillRect(this.bottomRightPoint.x, this.bottomRightPoint.y, 3, 3)
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
        if (this.degrees >= 0) {
            return (this.topLine.isPointBelowLine(point) &&
                this.rightLine.isPointAboveLine(point) &&
                this.bottomLine.isPointAboveLine(point) &&
                this.leftLine.isPointBelowLine(point))
        }
        else {
            return (
                this.topLine.isPointBelowLine(point) &&
                this.rightLine.isPointBelowLine(point) &&
                this.bottomLine.isPointAboveLine(point) &&
                this.leftLine.isPointAboveLine(point))
        }
    }

    setTrainType(trainType: TrainColor) {
        this.trainColor = trainType
    }

}
