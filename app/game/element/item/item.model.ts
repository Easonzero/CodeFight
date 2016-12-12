/**
 * Created by septemberhx on 16-12-6.
 */

export class ItemModel {
    sprite: PIXI.Sprite;

    constructor(x: number, y: number, r: number, t: PIXI.Texture) {
        this.sprite = new PIXI.Sprite(t);

        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.sprite.rotation = r;
    }

    getRect() {
        return this.sprite.getBounds();
    }
}