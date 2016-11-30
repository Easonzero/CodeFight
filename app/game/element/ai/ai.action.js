"use strict";
/**
 * Created by eason on 16-9-22.
 */
var Action = (function () {
    function Action(model, view) {
        this.model = model;
        this.view = view;
        this.model.sprite.position.y = 100;
    }
    Action.prototype.ahead = function () {
        var sprite = this.model.sprite;
        sprite.position.x += Math.cos(sprite.rotation);
        sprite.position.y += Math.sin(sprite.rotation);
    };
    Action.prototype.rotation = function (deg) {
        this.model.sprite.rotation += deg;
    };
    return Action;
}());
exports.Action = Action;
//# sourceMappingURL=ai.action.js.map