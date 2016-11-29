import {Action} from "./ai.action";
import {View} from "./ai.view";
import {Model} from "./ai.model";
/**
 * Created by eason on 16-9-22.
 */

export class AI{
    private action : Action;//涉及ai行为的api
    private model : Model;//ai在pixi中的数据结构
    private view : View;//涉及ai绘制的api
    private worker : Worker;//ai用户线程
    constructor(){
        this.model = new Model();
        this.view = new View(this.model);
        this.action = new Action(this.model,this.view);
        //初始化用户线程
        this.worker = new Worker('./app/remote/ai.remote.js');
        this.worker.onmessage = this.call(this);
    }
    //ai生命周期方法
    lifeCycle(event,...argvs){
        this.worker.postMessage({
            'e':event,
            'ai':{
                life:this.model.life
            },
            'argvs':argvs
        });
    }
    //ai用户线程调用api的方法
    call(self:AI){
        return (oEvent:any)=>{
            let arr:string[] = oEvent.data.fn.split('/');
            if(arr.length>3||arr[1]=='model') return;//model禁止访问
            if(arr[2].startsWith('__')) return;//私有方法禁止访问
            self[arr[1]][arr[2]](...oEvent.data.argvs);
        }
    }

    toModel():PIXI.Sprite {
        return this.model.sprite;
    };
}