"use strict";
var map_wall_1 = require("./map.wall");
/**
 * Created by eason on 16-11-30.
 */
var BaseMap = (function () {
    function BaseMap(width, height) {
        this.container = new PIXI.Container();
        this.walls = [];
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000);
        graphics.drawRect(0, 0, width, height);
        this.container.addChild(graphics);
        for (var i = 0; i < 5; i++) {
            var wall = new map_wall_1.Wall(i * width / 5, Math.random() * (height - 100), 100, 100);
            this.container.addChild(wall.toModel());
            this.walls.push(wall);
        }
    }
    BaseMap.prototype.toModel = function () {
        return this.container;
    };
    return BaseMap;
}());
exports.BaseMap = BaseMap;
//# sourceMappingURL=map.base.js.map