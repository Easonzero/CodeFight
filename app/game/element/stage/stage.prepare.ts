/**
 * Created by eason on 16-9-22.
 */
import {Stage} from "./stage.interface";
import {AI} from "../ai/ai.container";

export class PrepareStage extends Stage{
    onCreate() {
        let text = new PIXI.Text('Prepare...',{fill : 0xffffff, align : 'center'});
        text.x = 390;
        text.y = 200;
        this.stage.addChild(text);
    }

    onSwitch(fn:()=>void) {
        fn();
    }

    afterSwitch() {

    }

    onDestory() {

    }

}