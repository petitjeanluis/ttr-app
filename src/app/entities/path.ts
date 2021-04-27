import { Drawable } from "../models/drawable"
import { PathPiece } from "./path-piece";
import {Point} from "../models/point";

export class Path implements Drawable{
    id: number
    playerId: number
    cityOneId: number
    cityTwoId: number
    pathPieces: PathPiece[]

    constructor(id: number, cityOneId: number, cityTwoId: number, pathPieces: PathPiece[], playerId?: number) {
        this.id = id
        this.cityOneId = cityOneId
        this.cityTwoId = cityTwoId
        this.pathPieces = pathPieces
        playerId ? this.playerId = playerId : this.playerId = null
    }

    public draw(ctx: CanvasRenderingContext2D) {
      this.pathPieces.forEach(
        piece => {
          piece.draw(ctx)
        }
      )
    }

    public setColor(color: string) {
        this.pathPieces.forEach(p => p.color = color)
    }

    isTouched(point: Point): boolean {
        for (let i = 0; i < this.pathPieces.length; i++) {
            if (this.pathPieces[i].isTouched(point)) {
                return true
            }
        }
        return false
    }

}


