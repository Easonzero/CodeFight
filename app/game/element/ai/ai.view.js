"use strict";
/**
 * Created by eason on 16-9-22.
 */
var View = (function () {
    function View(model) {
        this.model = model;
        this.model.sprite = new PIXI.Sprite(this.__draw());
        this.model.sprite.x += this.model.sprite.width / 2;
        this.model.sprite.y += this.model.sprite.height / 2;
        this.model.sprite.anchor.x = .5;
        this.model.sprite.anchor.y = .5;
        this.model.sprite.rotation = Math.PI / 4;
    }
    //模型绘制方法
    View.prototype.__draw = function () {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xff0000);
        graphics.drawPolygon([
            new PIXI.Point(0, 0),
            new PIXI.Point(15, 15),
            new PIXI.Point(0, 30)
        ]);
        return graphics.generateCanvasTexture(1, 1);
    };
    return View;
}());
exports.View = View;
//# sourceMappingURL=ai.view.js.map