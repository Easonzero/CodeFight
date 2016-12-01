"use strict";
/**
 * Created by eason on 16-12-1.
 */
var Ray = (function () {
    function Ray(start, dir) {
        this.start = start;
        this.dir = dir;
    }
    return Ray;
}());
exports.Ray = Ray;
var RayTracer = (function () {
    function RayTracer() {
        this.graphics = new PIXI.Graphics();
        this.points = [];
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.beginFill(0xeeeeee);
    }
    RayTracer.prototype.intersections = function (ray, map) {
        var closest = 100000;
        var closestInter;
        for (var i in map.walls) {
            var inter = map.walls[i].intersect(ray);
            if (inter && inter.dist < closest) {
                closestInter = inter;
                closest = inter.dist;
            }
        }
        return closestInter;
    };
    RayTracer.prototype.trace = function (ray, map) {
        var isect = this.intersections(ray, map);
        if (isect) {
            this.graphics.moveTo(ray.start.x, ray.start.y)
                .lineTo(isect.point.x, isect.point.y);
            this.points.push(isect.point);
            return isect.point.x - ray.start.x == ray.dir.x &&
                isect.point.y - ray.start.y == ray.dir.y;
        }
        return false;
    };
    RayTracer.prototype.clear = function () {
        this.graphics.clear();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.beginFill(0xeeeeee);
        this.points.length = 0;
    };
    RayTracer.prototype.toModel = function () {
        return this.graphics;
    };
    return RayTracer;
}());
exports.RayTracer = RayTracer;
//# sourceMappingURL=element.raytracer.js.map