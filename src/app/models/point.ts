export class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    /**
     * Rotation Matrix
     * x' = (x-px)*cos(d) - (y-py)*sin(d) + px
     * y' = (x-px)*sin(d) + (y-py)*cos(d) + py
     */
    public rotateAroundPivotPoint(degrees: number, px: number, py: number): void {
        const dx = this.x - px
        const dy = this.y - py

        this.x = dx * Math.cos((Math.PI / 180) * degrees) - dy * Math.sin((Math.PI / 180) * degrees) + px
        this.y = dx * Math.sin((Math.PI / 180) * degrees) + dy * Math.cos((Math.PI / 180) * degrees) + py
    }
    
}
