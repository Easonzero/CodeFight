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
var Subject_1 = require('rxjs/Subject');
//利用rxjs模块实现的事件通知注册机制
var EventService = (function () {
    function EventService() {
        this.eventSource = new Subject_1.Subject();
        this.event$ = this.eventSource.asObservable();
    }
    //事件通知方法
    EventService.prototype.publish = function (event) {
        this.eventSource.next(event);
    };
    //注册事件方法
    EventService.prototype.subscribe = function (event, fn) {
        this.event$.subscribe(function (e) {
            if (e.eventCode !== event)
                return;
            fn(e.eventMsg);
        });
    };
    EventService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map