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
 * Created by eason on 16-9-19.
 */
var core_1 = require('@angular/core');
var index_1 = require("../event/index");
var game_service_1 = require("./game.service");
var GameComponent = (function () {
    function GameComponent(eventService, gameService) {
        this.gameService = gameService;
        eventService.publish(new index_1.EventModal(index_1.EventCode.TEST_EVENT, 'this is a msg from Game of module'));
    }
    ;
    GameComponent.prototype.ngAfterViewInit = function () {
        this.myCanvas.nativeElement.appendChild(this.gameService.getDomView());
        this.gameService.gameLoop();
    };
    __decorate([
        core_1.ViewChild("myCanvas"), 
        __metadata('design:type', Object)
    ], GameComponent.prototype, "myCanvas", void 0);
    GameComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'view-game',
            template: '<section #myCanvas></section>',
            providers: [game_service_1.GameService]
        }), 
        __metadata('design:paramtypes', [index_1.EventService, game_service_1.GameService])
    ], GameComponent);
    return GameComponent;
}());
exports.GameComponent = GameComponent;
//# sourceMappingURL=game.component.js.map