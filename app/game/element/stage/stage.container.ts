/**
 * Created by eason on 16-9-22.
 */
import {State} from '../../define/index';
import {Stage} from './stage.interface';
import {PrepareStage} from "./stage.prepare";
import {GamingStage} from "./stage.gaming";
import {PauseStage} from "./stage.pause";
import {EndStage} from "./stage.end";
import {EventService,EventCode} from "../../../event/index";

export class StageContainer {
    private state : State = State.PREPARE;
    private stages : Stage[] = [
        new PrepareStage(),new GamingStage(),new PauseStage(),new EndStage()
    ];

    constructor(eventService:EventService){
        for(let i : number = State.PREPARE;i < State.END+1;i++){
            this.stages[i].onCreate(eventService);
        }
    }

    destory(){
        for(let i : number = State.PREPARE;i < State.END+1;i++){
            this.stages[i].onDestory();
        }
    }

    switch(state,msg){
        if(this.state==state) return;

        let current : Stage = this.stages[this.state];
        let next : Stage = this.stages[state];
        current.onSwitch(()=>{
            this.state = state;
            next.afterSwitch(msg);
        });
    }

    looper(){
        this.stages[this.state].onLooper();
    }

    getCurrentModel() : any{
        return this.stages[this.state].toModel();
    }
}