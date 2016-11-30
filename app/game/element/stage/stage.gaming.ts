/**
 * Created by eason on 16-9-22.
 */
import {Stage} from "./stage.interface";
import {EventService,EventCode} from "../../../event/index";
import {AI} from "../ai/index";
import {Config} from "../../define/index";
import {BaseMap} from "../map/index";

export class GamingStage extends Stage{
    ais : AI[];//ai数组
    map : BaseMap;
    onCreate(eventService:EventService) {
        this.ais = [];
        this.map = new BaseMap(Config.WIDTH,Config.HEIGHT);
        this.stage.addChild(this.map.toModel());
    }

    onLooper(){
        for(let ai of this.ais){
            ai.lifeCycle('LOOP');
        }
    }

    onSwitch(fn:()=>void) {
        fn();
    }

    afterSwitch(msg:any) {
        let ai : AI = new AI();
        //测试代码
        ai.lifeCycle('CREATE',`({onStart:function(){
            console.log('on start');},
            onLooper:function(){
            this.ahead();
            this.life=1000;
            }})`);

        this.stage.addChild(ai.toModel());
        this.ais.push(ai);
        ai.lifeCycle('START');
    }

    onDestory() {

    }
}