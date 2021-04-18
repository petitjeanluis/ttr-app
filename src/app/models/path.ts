import { Drawable } from "../resources/drawable"
import { PathPiece } from "./path_piece";
import {Point} from "./point";

export class Path implements Drawable {

    playerId: number
    cityOneId: number
    cityTwoId: number
    pathPieces: PathPiece[]

    constructor(cityOneId: number, cityTwoId: number, pathPieces: PathPiece[], playerId?: number) {
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

    public isInPath(point: Point): boolean {
        for (let i = 0; i < this.pathPieces.length; i++) {
            if (this.pathPieces[i].isInPathPiece(point)) {
                return true
            }
        }
        return false
    }

}


