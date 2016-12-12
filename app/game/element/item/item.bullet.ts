import {Item} from "./item.interface";
import {AI} from "../ai/ai.container";
/**
 * Created by septemberhx on 16-12-6.
 */

export class Bullet extends Item {
    static get texture(): PIXI.Texture {
        if (! this._texture) {
            let graphics : PIXI.Graphics = new PIXI.Graphics();
            graphics.beginFill(0xff0000);
            graphics.drawPolygon([
                new PIXI.Point(0,0),
                new PIXI.Point(15,15),
                new PIXI.Point(0,30)
            ]);

            this._texture = graphics.generateCanvasTexture(1, 1);
        }

        return this._texture;
    }

    get damage(): number {
        return this._damage;
    }

    get owner(): AI {
        return this._owner;
    }

    private _owner: AI;
    private v: number; // 速度
    private _damage: number;

    private static _texture: PIXI.Texture;

    constructor(x: number, y: number, r: number, owner: AI) {
        super(x, y, r, Bullet.texture);
        this._owner = owner;

        this.v = 6;
        this._damage = 10;
    }

    ahead() {
        let sprite = this.model.sprite;
        sprite.position.x += Math.cos(sprite.rotation) * this.v;
        sprite.position.y += Math.sin(sprite.rotation) * this.v;
    }

    toModel() {
        return this.model.sprite;
    }

    rect() {
        return this.model.getRect();
    }
}
