import {GamingStage} from "../stage/stage.gaming";
/**
 * Created by eason on 16-11-29.
 */

export class Model {
    history:any = {};
    spine:PIXI.spine.Spine;
    life:number=100;//生命值

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