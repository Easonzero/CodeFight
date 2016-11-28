"use strict";
/**
 * Created by eason on 16-9-22.
 */
var Action = (function () {
    function Action(model, view) {
        this.model = model;
        this.view = view;
    }
    Action.prototype.test = function (argvs) {
        console.log(argvs);
        this.model.position.x = 0;
        this.model.position.y = 1;
        console.log('test action call\n modify model data');
    };
    return Action;
}());
exports.Action = Action;
//# sourceMappingURL=ai.action.js.map