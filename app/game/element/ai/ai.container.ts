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
    private worker : Worker;
    constructor(){
        this.model = new Model();
        this.view = new View(this.model);
        this.action = new Action(this.model,this.view);

        this.worker = new Worker('./app/remote/ai.remote.js');

        this.worker.postMessage(`({onStart:function(){
            console.log('on start');
            this.test(0);
        }})`);

        this.worker.onmessage = this.call(this);
    }

    call(self:AI){
        return (oEvent:any)=>{
            console.log(oEvent.data)
            let o = eval(oEvent.data);
            let arr:string[] = o.fn.split('/');
            if(arr.length>3||arr[1]=='model') return;
            self[arr[1]][arr[2]](...o.argvs);
        }
    }
}