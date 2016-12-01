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
var index_1 = require("../ai/index");
var index_2 = require("../../define/index");
var index_3 = require("../map/index");
var element_raytracer_1 = require("../element.raytracer");
var utils_math_1 = require("../../../utils/utils.math");
var GamingStage = (function (_super) {
    __extends(GamingStage, _super);
    function GamingStage() {
        _super.apply(this, arguments);
    }
    GamingStage.prototype.onCreate = function (eventService) {
        this.ais = [];
        this.map = new index_3.BaseMap(index_2.Config.WIDTH, index_2.Config.HEIGHT);
        this.rayTracing = new element_raytracer_1.RayTracer();
        this.stage.addChild(this.map.toModel());
        this.stage.addChild(this.rayTracing.toModel());
    };
    GamingStage.prototype.onLooper = function () {
        for (var _i = 0, _a = this.ais; _i < _a.length; _i++) {
            var ai = _a[_i];
            ai.lifeCycle('LOOP');
            this.rayTracing.clear();
            for (var _b = 0, _c = this.map.walls; _b < _c.length; _b++) {
                var wall = _c[_b];
                for (var _d = 0, _e = wall.points; _d < _e.length; _d++) {
                    var point = _e[_d];
                    var dir = new PIXI.Point(point.x - ai.toModel().position.x, point.y - ai.toModel().position.y);
                    var isvec = this.rayTracing.trace(ai.emitRay(dir), this.map);
                    if (isvec) {
                        this.rayTracing.trace(ai.emitRay(utils_math_1.MathUtils.rotation(dir, 0.001)), this.map);
                        this.rayTracing.trace(ai.emitRay(utils_math_1.MathUtils.rotation(dir, -0.001)), this.map);
                    }
                }
            }
        }
    };
    GamingStage.prototype.onSwitch = function (fn) {
        fn();
    };
    GamingStage.prototype.afterSwitch = function (msg) {
        var ai = new index_1.AI();
        //测试代码
        ai.lifeCycle('CREATE', "({onStart:function(){\n            console.log('on start');},\n            onLooper:function(){\n            this.ahead();\n            this.rotation(0.001);\n            this.life=1000;\n            }})");
        this.stage.addChild(ai.toModel());
        this.ais.push(ai);
        ai.lifeCycle('START');
    };
    GamingStage.prototype.onDestory = function () {
    };
    return GamingStage;
}(stage_interface_1.Stage));
exports.GamingStage = GamingStage;
//# sourceMappingURL=stage.gaming.js.map