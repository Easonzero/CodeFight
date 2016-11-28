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

        this.worker.postMessage({
            'e':'CREATE',
            'msg':`({onStart:function(){
            console.log('on start');},
            onLooper:function(){
            this.up();
            this.position.x=0;
            }})`
        });

        this.worker.onmessage = this.call(this);
    }

    lifeCycle(event){
        this.worker.postMessage({
            'e':event,
            'msg':{
                position:this.model.position
            }
        });
    }

    call(self:AI){
        return (oEvent:any)=>{
            let arr:string[] = oEvent.data.fn.split('/');
            if(arr.length>3||arr[1]=='model') return;
            self[arr[1]][arr[2]](...oEvent.data.argvs);
        }
    }
}