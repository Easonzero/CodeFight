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
var EndStage = (function (_super) {
    __extends(EndStage, _super);
    function EndStage() {
        _super.apply(this, arguments);
    }
    EndStage.prototype.onCreate = function (eventService) {
    };
    EndStage.prototype.onLooper = function () { };
    EndStage.prototype.onSwitch = function (msg, fn) {
        fn();
    };
    EndStage.prototype.afterSwitch = function () {
    };
    EndStage.prototype.onDestory = function () {
    };
    return EndStage;
}(stage_interface_1.Stage));
exports.EndStage = EndStage;
//# sourceMappingURL=stage.end.js.map