"use strict";
var utils_math_1 = require("../../../utils/utils.math");
/**
 * Created by eason on 16-9-22.
 */
var Action = (function () {
    function Action(model, view) {
        this.model = model;
        this.view = view;
        this.model.sprite.position.y = 250;
        this.model.sprite.position.x = 400;
    }
    Action.prototype.ahead = function () {
        var sprite = this.model.sprite;
        this.model.history.x = sprite.position.x;
        this.model.history.y = sprite.position.y;
        sprite.position.x += Math.cos(sprite.rotation);
        sprite.position.y += Math.sin(sprite.rotation);
    };
    Action.prototype.rotation = function (deg) {
        this.model.sprite.rotation += deg;
        this.model.dir = utils_math_1.MathUtils.rotation(this.model.dir, -deg);
    };
    return Action;
}());
exports.Action = Action;
//# sourceMappingURL=ai.action.js.map