/**
 * Created by eason on 16-9-22.
 */
import {EventService,EventCode} from "../../../event/index";

export abstract class Stage {
    protected stage : PIXI.Container = new PIXI.Container();
    //场景创建
    abstract onCreate(eventService:EventService);
    //场景绘制期
    abstract onLooper();
    //场景被切换
    abstract onSwitch(fn:()=>void);
    //切换到该场景
    abstract afterSwitch(msg:any);
    //场景销毁期
    abstract onDestory();

    toModel():PIXI.Container {
        return this.stage;
    };
}