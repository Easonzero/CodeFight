import {Model} from "./ai.model";
/**
 * Created by eason on 16-9-22.
 */

export class View {
    constructor(protected model:Model){
        this.model.sprite = new PIXI.Sprite(this.__draw());
    }
    //模型绘制方法
    __draw() : PIXI.Texture{
        let graphics : PIXI.Graphics = new PIXI.Graphics();
        graphics.beginFill(0xffffff);
        graphics.drawCircle(5,5,5);
        return graphics.generateCanvasTexture(1,1);
    }
}