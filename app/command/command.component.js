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
var CommandComponent = (function () {
    function CommandComponent() {
    }
    ;
    CommandComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'view-command',
            template: '<h2>this is a command</h2>'
        }), 
        __metadata('design:paramtypes', [])
    ], CommandComponent);
    return CommandComponent;
}());
exports.CommandComponent = CommandComponent;
//# sourceMappingURL=command.component.js.map