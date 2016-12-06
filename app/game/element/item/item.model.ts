/**
 * Created by septemberhx on 16-12-6.
 */

export class ItemModel {
    sprite: PIXI.Graphics;

    constructor(x: number, y: number, r: number) {

        let graphics : PIXI.Graphics = new PIXI.Graphics;
        graphics.beginFill(0xff0000);
        graphics.drawPolygon([
            new PIXI.Point(0,0),
            new PIXI.Point(15,15),
            new PIXI.Point(0,30)
        ]);

        this.sprite = graphics;

        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.sprite.rotation = r;
    }

    getRect() {
        return this.sprite.getBounds();
    }
}