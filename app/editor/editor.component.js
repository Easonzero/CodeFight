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
var EditorComponent = (function () {
    function EditorComponent(eventService) {
        eventService.subscribe(index_1.EventCode.TEST_EVENT, function (msg) {
            console.log('Editor of module gets a test msg:' + msg);
        });
    }
    ;
    EditorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'view-editor',
            template: '<h2>this is a editor</h2>'
        }), 
        __metadata('design:paramtypes', [index_1.EventService])
    ], EditorComponent);
    return EditorComponent;
}());
exports.EditorComponent = EditorComponent;
//# sourceMappingURL=editor.component.js.map