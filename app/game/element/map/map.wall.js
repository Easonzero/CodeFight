"use strict";
/**
 * Created by eason on 16-11-30.
 */
var Wall = (function () {
    function Wall(x, y, width, height) {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000);
        graphics.drawRect(0, 0, width, height);
        this.sprite = new PIXI.Sprite(graphics.generateCanvasTexture(1, 1));
        this.sprite.position.x = x;
        this.sprite.position.y = y;
    }
    Wall.prototype.toModel = function () {
        return this.sprite;
    };
    return Wall;
}());
exports.Wall = Wall;
//# sourceMappingURL=map.wall.js.map