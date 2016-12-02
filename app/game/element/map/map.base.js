"use strict";
var map_wall_1 = require("./map.wall");
/**
 * Created by eason on 16-11-30.
 */
var BaseMap = (function () {
    function BaseMap(width, height) {
        this.container = new PIXI.Container();
        this.walls = [];
        var wall = new map_wall_1.Wall(0, 0, width, height);
        this.container.addChild(wall.toModel());
        this.walls.push(wall);
        for (var i = 0; i < 5; i++) {
            var wall_1 = new map_wall_1.Wall(10 + i * width / 5, Math.random() * (height - 110), 100, 100);
            this.container.addChild(wall_1.toModel());
            this.walls.push(wall_1);
        }
    }
    BaseMap.prototype.toModel = function () {
        return this.container;
    };
    return BaseMap;
}());
exports.BaseMap = BaseMap;
//# sourceMappingURL=map.base.js.map