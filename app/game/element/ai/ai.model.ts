import {GamingStage} from "../stage/stage.gaming";
import {Spine} from "./ai.spine";
/**
 * Created by eason on 16-11-29.
 */

export class Model {
    history:any = {};
    spine:Spine;
    life:number=100;//生命值
    rotation:number=0;
    weapon_rotation:number=0;
    state:any = {
        isHitWall : false
    };

    stage: GamingStage;
    fireInterval: number;

    constructor(stage: GamingStage) {
        this.stage = stage;
        this.fireInterval = 500;
    }
}