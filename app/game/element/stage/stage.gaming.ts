/**
 * Created by eason on 16-9-22.
 */
import {Stage} from "./stage.interface";

export class GamingStage extends Stage{
    onCreate() {
    }

    onSwitch(fn:()=>void) {
        fn();
    }

    afterSwitch() {
    }

    onDestory() {
    }
}