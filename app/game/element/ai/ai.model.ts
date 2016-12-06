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
}