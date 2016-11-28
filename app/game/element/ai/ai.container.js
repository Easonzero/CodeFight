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
        this.worker.postMessage({
            'e': 'CREATE',
            'msg': "({onStart:function(){\n            console.log('on start');},\n            onLooper:function(){\n            this.up();\n            this.position.x=0;\n            }})"
        });
        this.worker.onmessage = this.call(this);
    }
    AI.prototype.lifeCycle = function (event) {
        this.worker.postMessage({
            'e': event,
            'msg': {
                position: this.model.position
            }
        });
    };
    AI.prototype.call = function (self) {
        return function (oEvent) {
            var arr = oEvent.data.fn.split('/');
            if (arr.length > 3 || arr[1] == 'model')
                return;
            (_a = self[arr[1]])[arr[2]].apply(_a, oEvent.data.argvs);
            var _a;
        };
    };
    return AI;
}());
exports.AI = AI;
//# sourceMappingURL=ai.container.js.map