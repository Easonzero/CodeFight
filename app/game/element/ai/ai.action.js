"use strict";
/**
 * Created by eason on 16-9-22.
 */
var Action = (function () {
    function Action(model, view) {
        this.model = model;
        this.view = view;
    }
    Action.prototype.up = function () {
        if (this.model.position.y > 0)
            this.model.position.y--;
    };
    return Action;
}());
exports.Action = Action;
//# sourceMappingURL=ai.action.js.map