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

        spine.position.x+=Math.cos(this.model.rotation);
        spine.position.y+=Math.sin(this.model.rotation);
    }

    rotation(deg){
        this.model.history.rotation = this.model.rotation;

        this.model.rotation+=deg;
        this.model.spine.r(this.model.rotation);
        this.model.spine.rweapon(this.model.rotation);
    }

    rotationWeapon(deg){
        this.model.weapon_rotation+=deg;
        this.model.spine.rweapon(this.model.weapon_rotation);
    }

    back(){
        let spine = this.model.spine;

        this.model.history.x = spine.position.x;
        this.model.history.y = spine.position.y;

        spine.position.x+=Math.cos(this.model.rotation+Math.PI);
        spine.position.y+=Math.sin(this.model.rotation+Math.PI);
    }
}