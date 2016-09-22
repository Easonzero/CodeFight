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
var GamingStage = (function (_super) {
    __extends(GamingStage, _super);
    function GamingStage() {
        _super.apply(this, arguments);
    }
    GamingStage.prototype.onCreate = function () {
    };
    GamingStage.prototype.onSwitch = function (fn) {
        fn();
    };
    GamingStage.prototype.afterSwitch = function () {
    };
    GamingStage.prototype.onDestory = function () {
    };
    return GamingStage;
}(stage_interface_1.Stage));
exports.GamingStage = GamingStage;
//# sourceMappingURL=stage.gaming.js.map