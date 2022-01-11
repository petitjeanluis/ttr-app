import { PathPiece } from './path-piece';
import {Point} from '../models/point';
import {TrainColor} from '../models/train-color';
import {TouchableEntity} from '../interfaces/touchable-entity';
import {PathID} from '../models/types';
import { PlayerColor } from '../models/player-color';

export class Path extends TouchableEntity {
    id: PathID
    trainColor: TrainColor
    private playerColor: PlayerColor
    private readonly pathPieces: PathPiece[]


    constructor(path: any, ctx: CanvasRenderingContext2D) {
        super(ctx)
        this.id = path.id
        this.playerColor = null
        this.trainColor = path.trainColor
        this.pathPieces = []

        path.paths.forEach(pathPiece => {
            this.pathPieces.push(new PathPiece(new Point(pathPiece.x, pathPiece.y), pathPiece.degrees, this.trainColor, this.ctx))
        })
    }

    public getLength() {
        return this.pathPieces.length
    }

    public draw(): void {
      this.pathPieces.forEach(
        piece => {
            piece.draw(this.playerColor)
        }
      )
    }

    public setPlayerColor(playerColor: PlayerColor): void {
        this.playerColor = playerColor
    }

    public hasPlayerColor(): boolean {
        return this.playerColor != null
    }

    isTouched(point: Point): boolean {
        for (const pathPiece of this.pathPieces) {
            if (pathPiece.isTouched(point)) {
                return true
            }
        }
        return false
    }

}


