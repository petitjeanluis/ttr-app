import {Point} from "./point";
import {EntityContainer} from "./entity-container";

export interface InteractiveEntityContainer extends EntityContainer {

    // returns key of entity touched
    entityTouched(point: Point): number;
}
