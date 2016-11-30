import {View} from "./ai.view";
import {Model} from "./ai.model";
/**
 * Created by eason on 16-9-22.
 */

export class Action {
    constructor(protected model:Model,protected view:View){
        this.model.sprite.position.y = 100;
    }

    ahead(){
        let sprite = this.model.sprite;
        sprite.position.x+=Math.cos(sprite.rotation);
        sprite.position.y+=Math.sin(sprite.rotation);
    }

    rotation(deg){
        this.model.sprite.rotation+=deg;
    }
}