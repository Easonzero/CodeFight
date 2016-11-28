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
        this.worker = new Worker('./app/remote/ai.remote.js');
        this.worker.postMessage("({onStart:function(){\n            console.log('on start');\n            this.test(0);\n        }})");
        this.worker.onmessage = this.call(this);
    }
    AI.prototype.call = function (self) {
        return function (oEvent) {
            console.log(oEvent.data);
            var o = eval(oEvent.data);
            var arr = o.fn.split('/');
            if (arr.length > 3 || arr[1] == 'model')
                return;
            (_a = self[arr[1]])[arr[2]].apply(_a, o.argvs);
            var _a;
        };
    };
    return AI;
}());
exports.AI = AI;
//# sourceMappingURL=ai.container.js.map