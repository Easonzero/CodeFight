"use strict";
/**
 * Created by eason on 16-9-22.
 */
var View = (function () {
    function View(model) {
        this.model = model;
        this.model.sprite = new PIXI.Sprite(this.__draw());
    }
    View.prototype.__draw = function () {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xffffff);
        graphics.drawCircle(5, 5, 5);
        return graphics.generateCanvasTexture(1, 1);
    };
    return View;
}());
exports.View = View;
//# sourceMappingURL=ai.view.js.map