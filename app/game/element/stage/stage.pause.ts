/**
 * Created by eason on 16-9-22.
 */
import {Stage} from "./stage.interface";
import {EventService,EventCode} from "../../../event/index";

export class PauseStage extends Stage{
    onCreate(eventService:EventService) {
    }

    onLooper(){}

    onSwitch(fn:()=>void) {
        fn();
    }

    afterSwitch(msg:any) {
    }

    onDestory() {
    }

}