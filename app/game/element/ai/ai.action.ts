import {View} from "./ai.view";
import {Model} from "./ai.model";
/**
 * Created by eason on 16-9-22.
 */

export class Action {
    constructor(protected model:Model,protected view:View){}

    test(argvs:{}){
        console.log(argvs);
        this.model.position.x = 0;
        this.model.position.y = 1;
        console.log('test action call\n modify model data');
    }
}