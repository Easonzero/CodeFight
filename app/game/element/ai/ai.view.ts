import {Model} from "./ai.model";
/**
 * Created by eason on 16-9-22.
 */

export class View {
    constructor(protected model:Model){}

    test(angvs:{}){
        console.log('test view call\n get model('+this.model.position.x+','+this.model.position.y+')');
    }
}