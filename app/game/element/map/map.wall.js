"use strict";
var utils_math_1 = require("../../../utils/utils.math");
/**
 * Created by eason on 16-11-30.
 */
var Wall = (function () {
    function Wall(x, y, width, height) {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000);
        graphics.lineStyle(1, 0xffffff);
        graphics.drawRect(0, 0, width, height);
        this.sprite = new PIXI.Sprite(graphics.generateCanvasTexture(1, 1));
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.points = [];
        this.points.push(new PIXI.Point(x, y));
        this.points.push(new PIXI.Point(x + width, y));
        this.points.push(new PIXI.Point(x + width, y + height));
        this.points.push(new PIXI.Point(x, y + height));
    }
    Wall.prototype.intersect = function (ray) {
        var vecs = [], result = [];
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            vecs.push({ x: point.x - ray.start.x, y: point.y - ray.start.y });
        }
        var flag = false;
        for (var i = 0; i < vecs.length; i++) {
            var next = i == vecs.length - 1 ? 0 : i + 1;
            if (utils_math_1.MathUtils.multi(ray.dir, vecs[i]) == 0) {
                flag = true;
                result.push(this.points[i]);
            }
            else if (utils_math_1.MathUtils.multi(ray.dir, vecs[i]) * utils_math_1.MathUtils.multi(ray.dir, vecs[next]) < 0) {
                flag = true;
                result.push(utils_math_1.MathUtils.computeIntersection(this.points[i], this.points[next], ray.start, ray.dir));
            }
        }
        if (flag) {
            var closest = 100000;
            var closePoint = void 0;
            var rect = this.sprite.getLocalBounds();
            rect.x = this.sprite.x;
            rect.y = this.sprite.y;
            for (var i = 0; i < result.length; i++) {
                var k = ray.dir.x !== 0 ? (result[i].x - ray.start.x) / ray.dir.x : (result[i].y - ray.start.y) / ray.dir.y;
                if (closest > k && k > 0) {
                    if (!closePoint)
                        closePoint = {};
                    closePoint.point = result[i];
                    closePoint.dist = k;
                    closest = k;
                }
            }
            return closePoint;
        }
        else {
            return undefined;
        }
    };
    Wall.prototype.toModel = function () {
        return this.sprite;
    };
    return Wall;
}());
exports.Wall = Wall;
//# sourceMappingURL=map.wall.js.map