import {Point} from "./point";
import {Touchable} from "./touchable";
import {Entity} from "./entity";

export abstract class InteractiveEntity extends Entity implements Touchable {

    protected constructor(location: Point) {
        super(location);
    }

    abstract isTouched(point: Point): boolean

}
