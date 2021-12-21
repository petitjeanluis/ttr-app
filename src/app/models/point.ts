export class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    /**
     * Rotation Matrix
     * x' = x*cos(d) - y*sin(d)
     * y' = y*cos(d) + x*sin(d)
     */
    public rotatePoint(degrees: number): void {
        this.x = this.x * Math.cos((Math.PI / 180) * degrees) - this.y * Math.sin((Math.PI / 180) * degrees)
        this.y = this.y * Math.cos((Math.PI / 180) * degrees) + this.x * Math.sin((Math.PI / 180) * degrees)
    }

    public translatePoint(x: number, y: number): void {
        this.x = this.x + x
        this.y = this.y + y
    }
}
