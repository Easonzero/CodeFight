/**
 * Created by eason on 16-11-30.
 */
export class Wall{
    private sprite:PIXI.Sprite;
    constructor(x:number,y:number,width:number,height:number){
        let graphics : PIXI.Graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000);
        graphics.drawRect(0,0,width,height);
        this.sprite = new PIXI.Sprite(graphics.generateCanvasTexture(1,1));

        this.sprite.position.x=x;
        this.sprite.position.y=y;
    }

    toModel():PIXI.Sprite{
        return this.sprite;
    }
}