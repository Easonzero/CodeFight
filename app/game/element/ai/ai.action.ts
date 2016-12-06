import {View} from "./ai.view";
import {Model} from "./ai.model";
import {MathUtils} from "../../../utils/utils.math";
/**
 * Created by eason on 16-9-22.
 */

export class Action {
    constructor(protected model:Model,protected view:View){
        this.model.spine.position.y = 250;
        this.model.spine.position.x = 400;
    }

    ahead(){
        let spine = this.model.spine;

        this.model.history.x = spine.position.x;
        this.model.history.y = spine.position.y;

        spine.position.x+=Math.cos(spine.rotation);
        spine.position.y+=Math.sin(spine.rotation);
    }

    rotation(deg){
        this.model.history.rotation = this.model.spine.rotation;
        this.model.spine.rotation+=deg;
    }

    back(){
        let spine = this.model.spine;

        this.model.history.x = spine.position.x;
        this.model.history.y = spine.position.y;

        spine.position.x+=Math.cos(spine.rotation+Math.PI);
        spine.position.y+=Math.sin(spine.rotation+Math.PI);
    }
}