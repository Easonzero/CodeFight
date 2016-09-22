"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by eason on 16-9-20.
 */
var core_1 = require('@angular/core');
var index_1 = require("./element/stage/index");
var GameService = (function () {
    function GameService() {
        this.container = new index_1.StageContainer();
        this.renderer = PIXI.autoDetectRenderer(900, 500);
    }
    GameService.prototype.getDomView = function () {
        return this.renderer.view;
    };
    GameService.prototype.gameLoop = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.gameLoop(); });
        this.renderer.render(this.container.getCurrentModel());
    };
    GameService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map