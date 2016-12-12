import {View} from "./ai.view";
import {Model} from "./ai.model";
import {MathUtils} from "../../../utils/utils.math";
import {Bullet} from "../item/item.bullet";
import {AI} from "./ai.container";
/**
 * Created by eason on 16-9-22.
 */

export class Action {
    constructor(protected model:Model,protected view:View, protected owner: AI){
        this.model.spine.position.y = 250;
        this.model.spine.position.x = 400;

        this.model.history.lastFireTime = 0;
    }

    ahead(){
        let spine = this.model.spine;

        this.model.history.x = spine.position.x;
        this.model.history.y = spine.position.y;

        spine.position.x+=Math.cos(this.model.rotation);
        spine.position.y+=Math.sin(this.model.rotation);
    }

    rotation(deg){
        this.model.history.rotation = this.model.rotation;

        this.model.rotation+=deg;
        this.model.spine.r(this.model.rotation);
        this.model.spine.rweapon(this.model.rotation);
    }

    rotationWeapon(deg){
        this.model.weapon_rotation+=deg;
        this.model.spine.rweapon(this.model.weapon_rotation);
    }

    back(){
        let spine = this.model.spine;

        this.model.history.x = spine.position.x;
        this.model.history.y = spine.position.y;

        spine.position.x+=Math.cos(this.model.rotation+Math.PI);
        spine.position.y+=Math.sin(this.model.rotation+Math.PI);
    }

    fire() {
        if (this.model.history.lastFireTime + this.model.fireInterval <= Date.now()) {
            let rect = this.model.spine.getBounds();
            let bullet = new Bullet(
                (rect.left + rect.right) / 2,
                (rect.top + rect.bottom) / 2,
                this.model.spine.rotation,
                this.owner);

            this.model.stage.bullets.push(bullet);
            this.model.stage.addChild(bullet.toModel());
            this.model.history.lastFireTime = Date.now();
        }
    }
}