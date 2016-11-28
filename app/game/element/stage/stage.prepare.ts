/**
 * Created by eason on 16-9-22.
 */
import {Stage} from "./stage.interface";
import {AI} from "../ai/ai.container";
import {EventService,EventCode} from "../../../event/index";

export class PrepareStage extends Stage{
    onCreate(eventService:EventService) {
        let text = new PIXI.Text('Prepare...',{fill : 0xffffff, align : 'center'});
        text.x = 390;
        text.y = 200;
        this.stage.addChild(text);
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