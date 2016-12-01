"use strict";
/**
 * Created by eason on 16-12-1.
 */
var MathUtils = (function () {
    function MathUtils() {
    }
    MathUtils.computeIntersection = function (p1, p2, start, dir) {
        var k = 0, t = 0;
        if (p2.x !== p1.x) {
            t = (p2.y - p1.y) / (p2.x - p1.x);
            k = (p1.y + t * (start.x - p1.x) - start.y) / (dir.y - t * dir.x);
        }
        else {
            k = (p1.x - start.x) / dir.x;
        }
        return { x: start.x + k * dir.x, y: start.y + k * dir.y };
    };
    return MathUtils;
}());
exports.MathUtils = MathUtils;
//# sourceMappingURL=utils.math.js.map