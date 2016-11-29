/**
 * Created by eason on 16-9-22.
 */
import {Stage} from "./stage.interface";
import {EventService,EventCode} from "../../../event/index";
import {AI} from "../ai/ai.container";

export class GamingStage extends Stage{
    ais : AI[];
    onCreate(eventService:EventService) {
        this.ais = [];
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

        ai.lifeCycle('CREATE',`({onStart:function(){
            console.log('on start');},
            onLooper:function(){
            this.up();
            this.life=1000;
            }})`);

        this.stage.addChild(ai.toModel());
        this.ais.push(ai);
        ai.lifeCycle('START');
    }

    onDestory() {

    }
}