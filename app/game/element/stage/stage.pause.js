"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by eason on 16-9-22.
 */
var stage_interface_1 = require("./stage.interface");
var PauseStage = (function (_super) {
    __extends(PauseStage, _super);
    function PauseStage() {
        _super.apply(this, arguments);
    }
    PauseStage.prototype.onCreate = function (eventService) {
    };
    PauseStage.prototype.onLooper = function () { };
    PauseStage.prototype.onSwitch = function (fn) {
        fn();
    };
    PauseStage.prototype.afterSwitch = function (msg) {
    };
    PauseStage.prototype.onDestory = function () {
    };
    return PauseStage;
}(stage_interface_1.Stage));
exports.PauseStage = PauseStage;
//# sourceMappingURL=stage.pause.js.map