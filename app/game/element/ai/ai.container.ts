import {Action} from "./ai.action";
import {Model} from "./ai.model";
import {View} from "./ai.view";
/**
 * Created by eason on 16-9-22.
 */

export class AI{
    private action : Action;
    private model : Model;
    private view : View;
    constructor(){
        this.model = new Model();
        this.view = new View(this.model);
        this.action = new Action(this.model,this.view);
    }

    call(fn:string,argvs:any){
        let arr:string[] = fn.split('/');
        if(arr.length>3||arr[1]=='model') return;
        this[arr[1]][arr[2]](argvs);
    }
}