/**
 * Created by eason on 16-11-29.
 */
"use strict";
var Model = (function () {
    function Model() {
        this.history = {};
        this.life = 100; //生命值
        this.dir = new PIXI.Point(1, 0);
    }
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=ai.model.js.map