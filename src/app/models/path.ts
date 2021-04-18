import { PATH_PIECE_HEIGHT, PATH_PIECE_WIDTH, SCALE } from "../resources/constants"
import { Drawable } from "../resources/drawable"

export class PathPiece {
    x: number
    y: number
    degrees: number
    topLeftX: number
    topLeftY: number
    topRightX: number
    topRightY: number
    bottomRightX: number
    bottomRightY: number
    bottomLeftX: number
    bottomLeftY: number
    topSlope: number
    topB: number
    rightSlope: number
    rightB: number
    bottomSlope: number
    bottomB: number
    leftSlope: number
    leftB: number

    constructor(x:number, y:number, degrees: number) {
        this.x = x
        this.y = y
        this.degrees = degrees
        let tempX = 0
        let tempY = 0

        /**
         * Rotation Matrix
         * x' = x*cos(d) - y*sin(d)
         * y' = y*cos(d) + x*sin(d)
        */

         tempX =  -PATH_PIECE_WIDTH*SCALE/2
         tempY =  -PATH_PIECE_HEIGHT*SCALE/2
         this.topLeftX = tempX*Math.cos((Math.PI/180)*this.degrees) - tempY*Math.sin((Math.PI/180)*this.degrees)
         this.topLeftY = tempY*Math.cos((Math.PI/180)*this.degrees) + tempX*Math.sin((Math.PI/180)*this.degrees)
         this.topLeftX = this.topLeftX + this.x*SCALE + PATH_PIECE_WIDTH*SCALE/2
         this.topLeftY = this.topLeftY + this.y*SCALE + PATH_PIECE_HEIGHT*SCALE/2

         tempX = -PATH_PIECE_WIDTH*SCALE/2
         tempY = PATH_PIECE_HEIGHT*SCALE/2
         this.bottomLeftX = tempX*Math.cos((Math.PI/180)*this.degrees) - tempY*Math.sin((Math.PI/180)*this.degrees)
         this.bottomLeftY = tempY*Math.cos((Math.PI/180)*this.degrees) + tempX*Math.sin((Math.PI/180)*this.degrees)
         this.bottomLeftX = this.bottomLeftX + this.x*SCALE + PATH_PIECE_WIDTH*SCALE/2
         this.bottomLeftY = this.bottomLeftY + this.y*SCALE + PATH_PIECE_HEIGHT*SCALE/2

         tempX = PATH_PIECE_WIDTH*SCALE/2
         tempY = -PATH_PIECE_HEIGHT*SCALE/2
         this.topRightX = tempX*Math.cos((Math.PI/180)*this.degrees) - tempY*Math.sin((Math.PI/180)*this.degrees)
         this.topRightY = tempY*Math.cos((Math.PI/180)*this.degrees) + tempX*Math.sin((Math.PI/180)*this.degrees)
         this.topRightX = this.topRightX + this.x*SCALE + PATH_PIECE_WIDTH*SCALE/2
         this.topRightY = this.topRightY + this.y*SCALE + PATH_PIECE_HEIGHT*SCALE/2

         tempX = PATH_PIECE_WIDTH*SCALE/2
         tempY = PATH_PIECE_HEIGHT*SCALE/2
         this.bottomRightX = tempX*Math.cos((Math.PI/180)*this.degrees) - tempY*Math.sin((Math.PI/180)*this.degrees)
         this.bottomRightY = tempY*Math.cos((Math.PI/180)*this.degrees) + tempX*Math.sin((Math.PI/180)*this.degrees)
         this.bottomRightX = this.bottomRightX + this.x*SCALE + PATH_PIECE_WIDTH*SCALE/2
         this.bottomRightY = this.bottomRightY + this.y*SCALE + PATH_PIECE_HEIGHT*SCALE/2

        this.topSlope = (this.topLeftY-this.topRightY)/(this.topLeftX-this.topRightX)
        this.topB = this.topLeftY - this.topSlope*this.topLeftX

        this.leftSlope = (this.topLeftY-this.bottomLeftY)/(this.topLeftX-this.bottomLeftX)
        this.leftB = this.topLeftY - this.leftSlope*this.topLeftX

        this.rightSlope = (this.topRightY-this.bottomRightY)/(this.topRightX-this.bottomRightX)
        this.rightB = this.topRightY - this.rightSlope*this.topRightX

        this.bottomSlope = (this.bottomLeftY-this.bottomRightY)/(this.bottomLeftX-this.bottomRightX)
        this.bottomB = this.bottomLeftY - this.bottomSlope*this.bottomLeftX
    }

}

export class Path implements Drawable {

    playerId: number
    cityOneId: number
    cityTwoId: number
    pathPieces: PathPiece[]
    color: string

    constructor(cityOneId: number, cityTwoId: number, pathPieces: PathPiece[], playerId?: number) {
        this.cityOneId = cityOneId
        this.cityTwoId = cityTwoId
        this.pathPieces = pathPieces
        playerId ? this.playerId = playerId : this.playerId = null
        this.color = 'black'
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.pathPieces.forEach(
            piece => {
                this.drawRotatedRectangle(ctx,piece.x,piece.y,PATH_PIECE_WIDTH,PATH_PIECE_HEIGHT,piece.degrees)
            }
        )
    }

    private drawRotatedRectangle(ctx: CanvasRenderingContext2D,x:number, y:number, width:number, height:number, degrees:number) {
        ctx.save()
        ctx.strokeStyle = this.color
        let x_draw = x*SCALE
        let y_draw = y*SCALE
        width = width*SCALE
        height = height*SCALE
        ctx.lineWidth = 1*SCALE
        ctx.translate(x_draw+width/2, y_draw+height/2)
        ctx.rotate((Math.PI/180)*degrees)
        ctx.strokeRect(-width/2,-height/2,width,height)
        ctx.restore()
    }

    public isInPath(x:number, y:number) {
        for (let i = 0; i < this.pathPieces.length; i++) {
            if (this.isInPathPiece(x,y,this.pathPieces[i])) {
                this.color = this.color == 'black' ? 'blue': 'black'
                alert('in path')
                return true;
            }
        }
    }
    // y < mx + b
    // y > mx + b
    // x > mx + b
    // x < mx + b
    private isInPathPiece(x:number,y:number,piece:PathPiece) {
        if (
            true &&
            true &&
            true &&
            true
        ) {

        }
        return false
    }
}
