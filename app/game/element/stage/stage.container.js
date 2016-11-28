"use strict";
/**
 * Created by eason on 16-9-22.
 */
var index_1 = require('../../define/index');
var stage_prepare_1 = require("./stage.prepare");
var stage_gaming_1 = require("./stage.gaming");
var stage_pause_1 = require("./stage.pause");
var stage_end_1 = require("./stage.end");
var StageContainer = (function () {
    function StageContainer(eventService) {
        this.state = index_1.State.PREPARE;
        this.stages = [
            new stage_prepare_1.PrepareStage(), new stage_gaming_1.GamingStage(), new stage_pause_1.PauseStage(), new stage_end_1.EndStage()
        ];
        for (var i = index_1.State.PREPARE; i < index_1.State.END + 1; i++) {
            this.stages[i].onCreate(eventService);
        }
    }
    StageContainer.prototype.destory = function () {
        for (var i = index_1.State.PREPARE; i < index_1.State.END + 1; i++) {
            this.stages[i].onDestory();
        }
    };
    StageContainer.prototype.switch = function (state, msg) {
        var _this = this;
        var current = this.stages[this.state];
        var next = this.stages[state];
        current.onSwitch(msg, function () {
            _this.state = state;
            next.afterSwitch();
        });
    };
    StageContainer.prototype.looper = function () {
        this.stages[this.state].onLooper();
    };
    StageContainer.prototype.getCurrentModel = function () {
        return this.stages[this.state].toModel();
    };
    return StageContainer;
}());
exports.StageContainer = StageContainer;
//# sourceMappingURL=stage.container.js.map