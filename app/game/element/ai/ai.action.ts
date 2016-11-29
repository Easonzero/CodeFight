import {View} from "./ai.view";
import {Model} from "./ai.model";
/**
 * Created by eason on 16-9-22.
 */

export class Action {
    constructor(protected model:Model,protected view:View){
        this.model.sprite.position.y = 100;
    }

    up(){
        if(this.model.sprite.position.y>0)
            this.model.sprite.position.y--;
    }
}