"use strict";
/**
 * Created by eason on 16-9-20.
 */
(function (State) {
    State[State["PREPARE"] = 0] = "PREPARE";
    State[State["GAMING"] = 1] = "GAMING";
    State[State["PAUSE"] = 2] = "PAUSE";
    State[State["END"] = 3] = "END";
})(exports.State || (exports.State = {}));
var State = exports.State;
//# sourceMappingURL=define.stage.js.map