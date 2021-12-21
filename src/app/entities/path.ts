import { PathPiece } from './path-piece';
import {Point} from '../models/point';
import {TrainColor} from '../models/train-color';
import {TouchableEntity} from '../interfaces/touchable-entity';
import {PathID} from '../models/types';

export class Path extends TouchableEntity {
    private id: PathID
    private owned: boolean
    private trainColor: TrainColor
    private playerId: number
    private cityOneId: number
    private cityTwoId: number
    private readonly pathPieces: PathPiece[]


    constructor(path: any, ctx: CanvasRenderingContext2D, playerId?: number) {
        super(ctx)
        this.id = path.id
        this.owned = false
        this.trainColor = path.trainColor
        this.cityOneId = path.cityOneId
        this.cityTwoId = path.cityTwoId
        this.pathPieces = []

        playerId ? this.playerId = playerId : this.playerId = null

        path.paths.forEach(pathPiece => {
            this.pathPieces.push(new PathPiece(new Point(pathPiece.x, pathPiece.y), pathPiece.degrees, this.ctx))
        })
    }

    public draw(): void {
      this.pathPieces.forEach(
        piece => {
            piece.owned = this.owned
            piece.trainColor = this.trainColor
            piece.draw()
        }
      )
    }

    public setOwner(trainType: TrainColor): void {
        this.owned = true;
        this.trainColor = trainType
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


