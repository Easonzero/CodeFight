"use strict";
/**
 * Created by eason on 16-9-22.
 */
var View = (function () {
    function View(model) {
        this.model = model;
    }
    View.prototype.test = function (angvs) {
        console.log('test view call\n get model(' + this.model.position.x + ',' + this.model.position.y + ')');
    };
    return View;
}());
exports.View = View;
//# sourceMappingURL=ai.view.js.map