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
        this.graphics.lineStyle(1, 0xffffff);
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
                .lineTo(isect.x, isect.y);
        }
    };
    RayTracer.prototype.clear = function () {
        this.graphics.clear();
        this.graphics.lineStyle(1, 0xffffff);
    };
    RayTracer.prototype.toModel = function () {
        return this.graphics;
    };
    return RayTracer;
}());
exports.RayTracer = RayTracer;
//# sourceMappingURL=element.raytracer.js.map