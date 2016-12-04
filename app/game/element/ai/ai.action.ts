import {View} from "./ai.view";
import {Model} from "./ai.model";
import {MathUtils} from "../../../utils/utils.math";
/**
 * Created by eason on 16-9-22.
 */

export class Action {
    constructor(protected model:Model,protected view:View){
        this.model.sprite.position.y = 250;
        this.model.sprite.position.x = 400;
    }

    ahead(){
        let sprite = this.model.sprite;

        this.model.history.x = sprite.position.x;
        this.model.history.y = sprite.position.y;

        sprite.position.x+=Math.cos(sprite.rotation);
        sprite.position.y+=Math.sin(sprite.rotation);
    }

    rotation(deg){
        this.model.history.rotation = this.model.sprite.rotation;
        this.model.sprite.rotation+=deg;
    }

    back(){
        let sprite = this.model.sprite;

        this.model.history.x = sprite.position.x;
        this.model.history.y = sprite.position.y;

        sprite.position.x+=Math.cos(sprite.rotation+Math.PI);
        sprite.position.y+=Math.sin(sprite.rotation+Math.PI);
    }
}