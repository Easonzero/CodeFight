"use strict";
var ai_action_1 = require("./ai.action");
var ai_view_1 = require("./ai.view");
var ai_model_1 = require("./ai.model");
/**
 * Created by eason on 16-9-22.
 */
var AI = (function () {
    function AI() {
        this.model = new ai_model_1.Model();
        this.view = new ai_view_1.View(this.model);
        this.action = new ai_action_1.Action(this.model, this.view);
        //初始化用户线程
        this.worker = new Worker('./app/remote/ai.remote.js');
        this.worker.onmessage = this.call(this);
    }
    //ai生命周期方法
    AI.prototype.lifeCycle = function (event) {
        var argvs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argvs[_i - 1] = arguments[_i];
        }
        this.worker.postMessage({
            'e': event,
            'ai': {
                life: this.model.life
            },
            'argvs': argvs
        });
    };
    //ai用户线程调用api的方法
    AI.prototype.call = function (self) {
        return function (oEvent) {
            var arr = oEvent.data.fn.split('/');
            if (arr.length > 3 || arr[1] == 'model')
                return; //model禁止访问
            if (arr[2].startsWith('__'))
                return; //私有方法禁止访问
            (_a = self[arr[1]])[arr[2]].apply(_a, oEvent.data.argvs);
            var _a;
        };
    };
    AI.prototype.toModel = function () {
        return this.model.sprite;
    };
    ;
    return AI;
}());
exports.AI = AI;
//# sourceMappingURL=ai.container.js.map