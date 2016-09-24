"use strict";
/**
 * Created by eason on 16-9-23.
 */
var WebWorker = (function () {
    function WebWorker() {
        this.AIs = [];
    }
    WebWorker.prototype.createAI = function (code) {
        var codeBlob = new Blob([code]);
        var worker = new Worker(window.URL.createObjectURL(codeBlob));
        this.AIs.push(worker);
    };
    WebWorker.prototype.addAIListener = function (listener) {
        var _loop_1 = function(i) {
            this_1.AIs[i].onmessage = function (event) {
                listener(i, event.data);
            };
        };
        var this_1 = this;
        for (var i in this.AIs) {
            _loop_1(i);
        }
    };
    return WebWorker;
}());
exports.WebWorker = WebWorker;
//# sourceMappingURL=origin.webworker.js.map