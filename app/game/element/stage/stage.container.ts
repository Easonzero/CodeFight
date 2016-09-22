/**
 * Created by eason on 16-9-22.
 */
import {State} from '../../define/index';
import {Stage} from './stage.interface';
import {PrepareStage} from "./stage.prepare";
import {GamingStage} from "./stage.gaming";
import {PauseStage} from "./stage.pause";
import {EndStage} from "./stage.end";

export class StageContainer {
    private state : State = State.PREPARE;
    private stages : Stage[] = [new PrepareStage(),new GamingStage(),new PauseStage(),new EndStage()];

    constructor(){
        for(let i : number = State.PREPARE;i < State.END+1;i++){
            this.stages[i].onCreate();
        }
    }

    destory(){
        for(let i : number = State.PREPARE;i < State.END+1;i++){
            this.stages[i].onDestory();
        }
    }

    switch(state){
        let current : Stage = Stage[this.state];
        let next : Stage = Stage[state];
        current.onSwitch(()=>{
            this.state = state;
            next.afterSwitch();
        });
    }

    getCurrentModel() : any{
        return this.stages[this.state].toModel();
    }
}