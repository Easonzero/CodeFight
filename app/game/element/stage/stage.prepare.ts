/**
 * Created by eason on 16-9-22.
 */
import {Stage} from "./stage.interface";
import {AI} from "../ai/ai.container";

export class PrepareStage extends Stage{
    onCreate() {
        let ai = new AI();
        ai.call('/view/test',{});
        ai.call('/action/test',{});
        ai.call('/view/test',{});
    }

    onSwitch(fn:()=>void) {
        fn();
    }

    afterSwitch() {
    }

    onDestory() {
    }

}