"use strict";
/**
 * Created by eason on 16-9-20.
 */
(function (Stage) {
    Stage[Stage["PREPARE"] = 0] = "PREPARE";
    Stage[Stage["GAMING"] = 1] = "GAMING";
    Stage[Stage["PAUSE"] = 2] = "PAUSE";
    Stage[Stage["END"] = 3] = "END";
})(exports.Stage || (exports.Stage = {}));
var Stage = exports.Stage;
//# sourceMappingURL=Stage.js.map