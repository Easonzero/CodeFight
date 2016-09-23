"use strict";
var ai_action_1 = require("./ai.action");
var ai_model_1 = require("./ai.model");
var ai_view_1 = require("./ai.view");
/**
 * Created by eason on 16-9-22.
 */
var AI = (function () {
    function AI() {
        this.model = new ai_model_1.Model();
        this.view = new ai_view_1.View(this.model);
        this.action = new ai_action_1.Action(this.model, this.view);
    }
    AI.prototype.call = function (fn, argvs) {
        var arr = fn.split('/');
        if (arr.length > 3 || arr[1] == 'model')
            return;
        this[arr[1]][arr[2]](argvs);
    };
    return AI;
}());
exports.AI = AI;
//# sourceMappingURL=ai.container.js.map