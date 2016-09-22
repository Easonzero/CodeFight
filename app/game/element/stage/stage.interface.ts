/**
 * Created by eason on 16-9-22.
 */
import PIXI = require('pixi.js');

export abstract class Stage {
    protected stage : PIXI.Container = new PIXI.Container();

    abstract onCreate();

    abstract onSwitch();

    abstract afterSwitch();

    abstract onDestory();

    toModel():PIXI.Container {
        return this.stage;
    };
}