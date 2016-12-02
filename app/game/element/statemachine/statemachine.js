/**
 * Created by septemberhx on 16-11-30.
 */
"use strict";
var State = (function () {
    function State(stateName, beforeSwitchFunc, afterSwitchFunc, beforeOnSwitchFunc, afterOnSwitchFunc) {
        if (beforeSwitchFunc === void 0) { beforeSwitchFunc = null; }
        if (afterSwitchFunc === void 0) { afterSwitchFunc = null; }
        if (beforeOnSwitchFunc === void 0) { beforeOnSwitchFunc = null; }
        if (afterOnSwitchFunc === void 0) { afterOnSwitchFunc = null; }
        this._name = stateName;
        this._beforeSwitch = beforeSwitchFunc;
        this._afterSwitch = afterSwitchFunc;
        this._beforeOnSwitch = beforeOnSwitchFunc;
        this._afterOnSwitch = afterOnSwitchFunc;
    }
    Object.defineProperty(State.prototype, "afterOnSwitch", {
        get: function () {
            return this._afterOnSwitch;
        },
        set: function (value) {
            this._afterOnSwitch = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "beforeOnSwitch", {
        get: function () {
            return this._beforeOnSwitch;
        },
        set: function (value) {
            this._beforeOnSwitch = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "beforeSwitch", {
        get: function () {
            return this._beforeSwitch;
        },
        set: function (value) {
            this._beforeSwitch = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "afterSwitch", {
        get: function () {
            return this._afterSwitch;
        },
        set: function (value) {
            this._afterSwitch = value;
        },
        enumerable: true,
        configurable: true
    });
    return State;
}());
var Statemachine = (function () {
    function Statemachine() {
        this.stateList = [];
        this.switchTable = {};
    }
    Statemachine.prototype._addState = function (stateName, beforeSwitchFunc, afterSwitchFunc) {
        if (beforeSwitchFunc === void 0) { beforeSwitchFunc = null; }
        if (afterSwitchFunc === void 0) { afterSwitchFunc = null; }
        if (this.ifStateExists(stateName)) {
            return -1;
        }
        this.stateList.push(new State(stateName, beforeSwitchFunc, afterSwitchFunc));
        var tmp = this.stateList.length - 1;
        this.switchTable[tmp] = {};
        return tmp;
    };
    Statemachine.prototype.getStateIndex = function (stateName) {
        return this.stateList.findIndex(function (x) { return x.name === stateName; });
    };
    Statemachine.prototype.currState = function () {
        return this.stateList[this._currState].name;
    };
    Statemachine.prototype.setState = function (stateName) {
        var tmpIndex = this.getStateIndex(stateName);
        if (tmpIndex === -1) {
            this._currState = this._addState(stateName);
        }
        else {
            this._currState = tmpIndex;
        }
    };
    Statemachine.prototype.addState = function (stateName, beforeSwitchFunc, afterSwitchFunc) {
        if (beforeSwitchFunc === void 0) { beforeSwitchFunc = null; }
        if (afterSwitchFunc === void 0) { afterSwitchFunc = null; }
        return this._addState(stateName, beforeSwitchFunc, afterSwitchFunc) != -1;
    };
    Statemachine.prototype.removeState = function (stateName) {
        var tmpIndex = this.getStateIndex(stateName);
        if (tmpIndex === -1) {
            return false;
        }
        else {
            this.stateList.splice(tmpIndex, 1);
            delete this.switchTable[tmpIndex]; // 清除这个状态的转换表
            for (var startKey in this.switchTable) {
                var singleSwitchTable = this.switchTable[startKey];
                for (var toKey in singleSwitchTable) {
                    if (singleSwitchTable[toKey] === tmpIndex) {
                        delete this.switchTable[startKey][toKey];
                    }
                }
            }
            return true;
        }
    };
    Statemachine.prototype.ifStateExists = function (stateName) {
        return this.getStateIndex(stateName) !== -1;
    };
    Statemachine.prototype.setBeforeFunc = function (stateName, beforeSwitchFunc) {
        var tmpIndex = this.getStateIndex(stateName);
        if (tmpIndex != -1) {
            this.stateList[tmpIndex].beforeSwitch = beforeSwitchFunc;
        }
    };
    Statemachine.prototype.setAfterFunc = function (stateName, afterSwitchFunc) {
        var tmpIndex = this.getStateIndex(stateName);
        if (tmpIndex != -1) {
            this.stateList[tmpIndex].afterSwitch = afterSwitchFunc;
        }
    };
    Statemachine.prototype.setBeforeOnFunc = function (stateName, beforeOnSwitchFunc) {
        var tmpIndex = this.getStateIndex(stateName);
        if (tmpIndex != -1) {
            this.stateList[tmpIndex].beforeOnSwitch = beforeOnSwitchFunc;
        }
    };
    Statemachine.prototype.setAfterOnFunc = function (stateName, afterOnSwitchFunc) {
        var tmpIndex = this.getStateIndex(stateName);
        if (tmpIndex != -1) {
            this.stateList[tmpIndex].afterOnSwitch = afterOnSwitchFunc;
        }
    };
    Statemachine.prototype.addSwitch = function (fromStateName, toStateName, msg) {
        if (!this.ifStateExists(fromStateName)) {
            this.addState(fromStateName);
        }
        if (!this.ifStateExists(toStateName)) {
            this.addState(toStateName);
        }
        var fromStateIndex = this.getStateIndex(fromStateName);
        var toStateIndex = this.getStateIndex(toStateName);
        this.switchTable[fromStateIndex][msg] = toStateIndex;
    };
    Statemachine.prototype.removeSwitchByMsg = function (fromStateName, msg) {
        var fromStateIndex = this.getStateIndex(fromStateName);
        delete this.switchTable[fromStateIndex][msg];
    };
    Statemachine.prototype.removeSwitchByState = function (fromStateName, toStateName) {
        var fromStateIndex = this.getStateIndex(fromStateName);
        var toStateIndex = this.getStateIndex(toStateName);
        if (fromStateIndex === -1 || toStateIndex === -1) {
            return;
        }
        for (var key in this.switchTable[fromStateIndex]) {
            if (this.switchTable[fromStateIndex][key] === toStateIndex) {
                delete this.switchTable[fromStateIndex][key];
            }
        }
    };
    Statemachine.prototype.removeSwitch = function (fromStateName, msg, toStateName) {
        var fromStateIndex = this.getStateIndex(fromStateName);
        var toStateIndex = this.getStateIndex(toStateName);
        if (fromStateIndex === -1 || toStateIndex === -1) {
            return;
        }
        if (msg in this.switchTable[fromStateIndex] &&
            this.switchTable[fromStateIndex][msg] === toStateIndex) {
            delete this.switchTable[fromStateIndex][msg];
        }
    };
    Statemachine.prototype.switchState = function (msg) {
        if (this.switchTable[this._currState].hasOwnProperty(msg)) {
            if (typeof (this.stateList[this._currState].beforeSwitch) === 'function') {
                this.stateList[this._currState].beforeSwitch(arguments);
            }
            var nextState = this.switchTable[this._currState][msg];
            if (typeof (this.stateList[this._currState].afterSwitch) === 'function') {
                this.stateList[this._currState].afterSwitch(arguments);
            }
            if (typeof (this.stateList[nextState].beforeOnSwitch) === 'function') {
                this.stateList[nextState].beforeOnSwitch(arguments);
            }
            this._currState = nextState;
            if (typeof (this.stateList[this._currState].afterOnSwitch) === 'function') {
                this.stateList[this._currState].afterOnSwitch(arguments);
            }
            return true;
        }
        return false;
    };
    return Statemachine;
}());
exports.Statemachine = Statemachine;
//# sourceMappingURL=statemachine.js.map