import {Action} from "./ai.action";
import {View} from "./ai.view";
import {Model} from "./ai.model";
import {Ray} from "../element.raytracer";
import {MathUtils} from "../../../utils/utils.math";
import {Stage} from "../stage/stage.interface";
import {GamingStage} from "../stage/stage.gaming";
/**
 * Created by eason on 16-9-22.
 */

export class AI{
    private action : Action;//涉及ai行为的api
    private model : Model;//ai在pixi中的数据结构
    private view : View;//涉及ai绘制的api
    private worker : Worker;//ai用户线程

    constructor(stage: GamingStage){
        this.model = new Model(stage);
        this.view = new View(this.model);
        this.action = new Action(this.model, this.view, this);
        //初始化用户线程
        this.worker = new Worker('./app/remote/remote.ai.js');
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

    emitRay(direction:PIXI.Point,offset:PIXI.Point=new PIXI.Point(0,0)):Ray{
        return new Ray(
            new PIXI.Point(this.model.spine.x+offset.x,this.model.spine.y+offset.y), direction
        );
    }

    position(offset:PIXI.Point=new PIXI.Point(0,0)){
        return new PIXI.Point(this.model.spine.x+offset.x,this.model.spine.y+offset.y);
    }

    get rect():PIXI.Rectangle{
        let rect = this.model.spine.getBounds();
        return rect;
    }

    backup(){
        this.model.spine.position.x = this.model.history.x;
        this.model.spine.position.y = this.model.history.y;
    }

    setState(key:string,value){
        this.model.state[key] = value;
    }

    getState(key:string){
        return this.model.state[key];
    }

    toModel():PIXI.Container {
        return this.model.spine;
    };
}