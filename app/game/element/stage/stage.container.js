"use strict";
/**
 * Created by eason on 16-9-22.
 */
var index_1 = require('../../define/index');
var stage_interface_1 = require('./stage.interface');
var stage_prepare_1 = require("./stage.prepare");
var stage_gaming_1 = require("./stage.gaming");
var stage_pause_1 = require("./stage.pause");
var stage_end_1 = require("./stage.end");
var StageContainer = (function () {
    function StageContainer() {
        this.state = index_1.State.PREPARE;
        this.stages = [
            new stage_prepare_1.PrepareStage(), new stage_gaming_1.GamingStage(), new stage_pause_1.PauseStage(), new stage_end_1.EndStage()
        ];
        for (var i = index_1.State.PREPARE; i < index_1.State.END + 1; i++) {
            this.stages[i].onCreate();
        }
    }
    StageContainer.prototype.destory = function () {
        for (var i = index_1.State.PREPARE; i < index_1.State.END + 1; i++) {
            this.stages[i].onDestory();
        }
    };
    StageContainer.prototype.switch = function (state) {
        var _this = this;
        var current = stage_interface_1.Stage[this.state];
        var next = stage_interface_1.Stage[state];
        current.onSwitch(function () {
            _this.state = state;
            next.afterSwitch();
        });
    };
    StageContainer.prototype.getCurrentModel = function () {
        return this.stages[this.state].toModel();
    };
    return StageContainer;
}());
exports.StageContainer = StageContainer;
//# sourceMappingURL=stage.container.js.map