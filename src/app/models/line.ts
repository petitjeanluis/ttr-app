import {Point} from "./point";

export class Line {

    // y = mx + b
    m: number
    b: number

    static fromPoints(point1: Point, point2: Point): Line {
        let slope = (point2.y - point1.y) / (point2.x - point1.x)
        let intercept = point1.y - slope*point1.x
        return new Line(slope,intercept)
    }

    static fromSlopeAndIntercept(slope: number, intercept: number): Line {
        return new Line(slope,intercept)
    }

    private constructor(m: number, b: number) {
        this.m = m
        this.b = b
    }

    public isPointBelowLine(point: Point): boolean {
        return point.y >= this.m*point.x + this.b
    }

    public isPointAboveLine(point: Point): boolean {
        return point.y <= this.m*point.x + this.b
    }

}
