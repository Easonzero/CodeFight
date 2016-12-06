import {Model} from "./ai.model";
/**
 * Created by eason on 16-9-22.
 */

export class View {
    constructor(protected model:Model){
        this.model.spine = new PIXI.spine.Spine(PIXI.loader.resources['spineboy'].spineData);
        this.model.spine.scale.set(0.1);
        this.model.spine.position.x+=this.model.spine.width/2;
        this.model.spine.position.y+=this.model.spine.height/2;
        this.model.spine.pivot.x = this.model.spine.width/2;
        this.model.spine.pivot.y = this.model.spine.height/2;
        this.model.spine.state.setAnimationByName(0, 'jump', true);
    }
    //模型绘制方法
    __draw() : PIXI.Texture{
        let graphics : PIXI.Graphics = new PIXI.Graphics();
        graphics.beginFill(0xff0000);
        graphics.drawPolygon([
            new PIXI.Point(0,0),
            new PIXI.Point(15,15),
            new PIXI.Point(0,30)
        ]);
        return graphics.generateCanvasTexture(1,1);
    }
}