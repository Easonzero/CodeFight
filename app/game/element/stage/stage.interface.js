"use strict";
/**
 * Created by eason on 16-9-22.
 */
var PIXI = require('pixi.js');
var Stage = (function () {
    function Stage() {
        this.stage = new PIXI.Container();
    }
    Stage.prototype.toModel = function () {
        return this.stage;
    };
    ;
    return Stage;
}());
exports.Stage = Stage;
//# sourceMappingURL=stage.interface.js.map