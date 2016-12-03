/**
 * Created by septemberhx on 16-11-30.
 */

class State {
    get afterOnSwitch(): any {
        return this._afterOnSwitch;
    }

    set afterOnSwitch(value: any) {
        this._afterOnSwitch = value;
    }

    get beforeOnSwitch(): any {
        return this._beforeOnSwitch;
    }

    set beforeOnSwitch(value: any) {
        this._beforeOnSwitch = value;
    }
    get stateObj(): any {
        return this._stateObj;
    }

    set stateObj(value: any) {
        this._stateObj = value;
    }
    get beforeSwitch(): any {
        return this._beforeSwitch;
    }

    set beforeSwitch(value: any) {
        this._beforeSwitch = value;
    }
    get afterSwitch(): any {
        return this._afterSwitch;
    }

    set afterSwitch(value: any) {
        this._afterSwitch = value;
    }

    private _stateObj: any;
    private _beforeSwitch: any;
    private _afterSwitch: any;
    private _beforeOnSwitch: any;
    private _afterOnSwitch: any;

    constructor(stateName:any, beforeSwitchFunc: any = null, afterSwitchFunc: any = null,
                beforeOnSwitchFunc: any = null, afterOnSwitchFunc: any = null) {
        this._stateObj = stateName;
        this._beforeSwitch = beforeSwitchFunc;
        this._afterSwitch = afterSwitchFunc;
        this._beforeOnSwitch = beforeOnSwitchFunc;
        this._afterOnSwitch = afterOnSwitchFunc;
    }
}

class ObjListManager {
    objList: any[];
    objEqualFunc: any;  // 判断两个obj相等的函数

    constructor(newEqualFunc: any = null) {
        this.objEqualFunc = newEqualFunc;
        this.objList = [];
    }

    add(newObj: any) : number {
        if (this.ifExists(newObj)) {
            return -1;
        } else {
            this.objList.push(newObj);
            return this.objList.length - 1;
        }
    }

    get(objIndex: number) : any {
        if (objIndex < this.objList.length) {
            return this.objList[objIndex];
        } else {
            return null;
        }
    }

    remove(objToRemove: any) {
        let tmpindex = this.getIndex(objToRemove);

        if (tmpindex !== -1) {
            this.objList.splice(tmpindex, 1);
        }
    }

    ifExists(objToFind: any) : boolean {
        return this.getIndex(objToFind) !== -1;
    }

    getIndex(objToFind: any) {
        if (typeof(this.objEqualFunc) === 'function') {
            return this.objList.findIndex((x) => this.objEqualFunc(x) == this.objEqualFunc(objToFind));
        } else {
            return this.objList.findIndex((x: any) => x == objToFind);
        }
    }
}

export class Statemachine {

    private _currState: number;

    private stateManager: ObjListManager;
    private msgManager: ObjListManager;
    private switchTable: { [stateIndex: number] : { [msgIndex: number] : number } };

    constructor() {
        this.stateManager = new ObjListManager((x: State) => x.stateObj);
        this.msgManager = new ObjListManager();
        this.switchTable = {};
    }

    currState(): any {
        return this.stateManager.get(this._currState).stateObj;
    }

    setState(stateObj: any){
        let tmpStateObj = new State(stateObj);
        let tmpIndex = this.stateManager.getIndex(tmpStateObj);

        if(tmpIndex === -1) {
            this._currState = this.stateManager.add(tmpStateObj);
        } else {
            this._currState = tmpIndex;
        }
    }

    addState(stateObj: any, beforeSwitchFunc: any = null, afterSwitchFunc: any = null,
             beforeOnSwitchFunc: any = null, afterOnSwitchFunc: any = null) {
        let tmpStateObj = new State(stateObj, beforeSwitchFunc, afterSwitchFunc, beforeOnSwitchFunc, afterOnSwitchFunc);

        let tmpIndex = this.stateManager.add(tmpStateObj);
        this.switchTable[tmpIndex] = {};
    }

    removeState(stateObj: any) : boolean {
        let tmpStateObj = new State(stateObj);
        let tmpIndex = this.stateManager.getIndex(tmpStateObj);
        if (tmpIndex === -1) {
            return false;
        } else {
            this.stateManager.remove(tmpStateObj);
            delete this.switchTable[tmpIndex];  // 清除这个状态的转换表

            for (let startKey in this.switchTable) {  // 清除其他状态转换到将要删除状态的转换表项
                let singleSwitchTable = this.switchTable[startKey];
                for (let toKey in singleSwitchTable) {
                    if (singleSwitchTable[toKey] === tmpIndex) {
                        delete this.switchTable[startKey][toKey];
                    }
                }
            }

            return true;
        }
    }

    setBeforeFunc(stateObj: any, beforeSwitchFunc: any) {
        let tmpStateObj = new State(stateObj);
        let tmpIndex = this.stateManager.getIndex(tmpStateObj);
        if (tmpIndex != -1) {
            this.stateManager.get(tmpIndex).beforeSwitch = beforeSwitchFunc;
        }
    }

    setAfterFunc(stateObj: any, afterSwitchFunc: any) {
        let tmpStateObj = new State(stateObj);
        let tmpIndex = this.stateManager.getIndex(tmpStateObj);
        if (tmpIndex != -1) {
            this.stateManager.get(tmpIndex).afterSwitch = afterSwitchFunc;
        }
    }

    setBeforeOnFunc(stateObj: any, beforeOnSwitchFunc: any) {
        let tmpStateObj = new State(stateObj);
        let tmpIndex = this.stateManager.getIndex(tmpStateObj);
        if (tmpIndex != -1) {
            this.stateManager.get(tmpIndex).beforeOnSwitch = beforeOnSwitchFunc;
        }
    }

    setAfterOnFunc(stateObj: any, afterOnSwitchFunc: any) {
        let tmpStateObj = new State(stateObj);
        let tmpIndex = this.stateManager.getIndex(tmpStateObj);
        if (tmpIndex != -1) {
            this.stateManager.get(tmpIndex).afterOnSwitch = afterOnSwitchFunc;
        }
    }

    addSwitch(fromStateObj: any, toStateObj: any, msg: any) {
        let tmpFromObj = new State(fromStateObj);
        let tmpToObj = new State(toStateObj);
        if (!this.stateManager.ifExists(tmpFromObj)) {
            this.addState(fromStateObj);
        }

        if (!this.stateManager.ifExists(tmpToObj)) {
            this.addState(toStateObj);
        }

        let fromStateIndex = this.stateManager.getIndex(tmpFromObj);
        let toStateIndex = this.stateManager.getIndex(tmpToObj);

        let msgIndex = this.msgManager.getIndex(msg);
        if (msgIndex === -1) {
            msgIndex = this.msgManager.add(msg);
        }

        this.switchTable[fromStateIndex][msgIndex] = toStateIndex;
    }

    removeSwitchByMsg(fromStateName: any, msg: string) {
        let fromState = new State(fromStateName);

        let fromStateIndex = this.stateManager.getIndex(fromState);

        let msgIndex = this.msgManager.getIndex(msg);
        if (msgIndex === -1) {
            msgIndex = this.msgManager.add(msg);
        }
        delete this.switchTable[fromStateIndex][msgIndex];
    }

    removeSwitchByState(fromStateName: any, toStateName: string) {
        let fromState = new State(fromStateName);
        let toState = new State(toStateName);

        let fromStateIndex = this.stateManager.getIndex(fromState);
        let toStateIndex = this.stateManager.getIndex(toState);

        if (fromStateIndex === -1 || toStateIndex === -1) {
            return;
        }

        for (let key in this.switchTable[fromStateIndex]) {
            if (this.switchTable[fromStateIndex][key] === toStateIndex) {
                delete this.switchTable[fromStateIndex][key];
            }
        }
    }

    removeSwitch(fromStateName: any, msg: string, toStateName: any) {
        let fromState = new State(fromStateName);
        let toState = new State(toStateName);

        let fromStateIndex = this.stateManager.getIndex(fromState);
        let toStateIndex = this.stateManager.getIndex(toState);

        if (fromStateIndex === -1 || toStateIndex === -1) {
            return;
        }

        let msgIndex = this.msgManager.getIndex(msg);
        if (msgIndex === -1) {
            msgIndex = this.msgManager.add(msg);
        }

        if (msgIndex in this.switchTable[fromStateIndex] &&
            this.switchTable[fromStateIndex][msgIndex] === toStateIndex) {
            delete this.switchTable[fromStateIndex][msgIndex];
        }
    }

    switchState(msg: any) : boolean {
        let msgIndex = this.msgManager.getIndex(msg);
        if (msgIndex === -1) {
            msgIndex = this.msgManager.add(msg);
        }

        if (this.switchTable[this._currState].hasOwnProperty(msgIndex)) {
            if (typeof(this.stateManager.get(this._currState).beforeSwitch) === 'function') {
                this.stateManager.get(this._currState).beforeSwitch(arguments);
            }

            let nextState = this.switchTable[this._currState][msgIndex];

            if (typeof(this.stateManager.get(this._currState).afterSwitch) === 'function') {
                this.stateManager.get(this._currState).afterSwitch(arguments);
            }

            if (typeof(this.stateManager.get(nextState).beforeOnSwitch) === 'function') {
                this.stateManager.get(nextState).beforeOnSwitch(arguments);
            }

            this._currState = nextState;

            if (typeof(this.stateManager.get(this._currState).afterOnSwitch) === 'function') {
                this.stateManager.get(this._currState).afterOnSwitch(arguments);
            }

            return true;
        }

        return false;
    }
}
