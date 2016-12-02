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

    get name(): any {
        return this._name;
    }

    set name(value: any) {
        this._name = value;
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

    private _name: any;
    private _beforeSwitch: any;  // 该状态被切换到其他状态前执行的一个函数
    private _afterSwitch: any;  // 该状态被切换到其他状态后执行的一个函数
    private _beforeOnSwitch: any;  // 切换到该状态前执行的一个函数
    private _afterOnSwitch: any; // 切换到该状态后执行的一个函数

    constructor(stateName:any, beforeSwitchFunc: any = null, afterSwitchFunc: any = null,
                beforeOnSwitchFunc: any = null, afterOnSwitchFunc: any = null) {
        this._name = stateName;
        this._beforeSwitch = beforeSwitchFunc;
        this._afterSwitch = afterSwitchFunc;
        this._beforeOnSwitch = beforeOnSwitchFunc;
        this._afterOnSwitch = afterOnSwitchFunc;
    }
}

export class Statemachine {

    private _currState: number;

    private stateList: State[];
    private switchTable: { [stateIndex: number] : { [msg: string] : number } };

    constructor() {
        this.stateList = [];
        this.switchTable = {};
    }

    private _addState(stateName: any, beforeSwitchFunc: any = null, afterSwitchFunc: any = null) : number {
        if (this.ifStateExists(stateName)) {
            return -1;
        }

        this.stateList.push(new State(stateName, beforeSwitchFunc, afterSwitchFunc));
        let tmp = this.stateList.length - 1;
        this.switchTable[tmp] = {};
        return tmp;
    }

    private getStateIndex(stateName: any) : number {
        return this.stateList.findIndex((x: State) => x.name === stateName);
    }

    currState(): any {
        return this.stateList[this._currState].name;
    }

    setState(stateName: any){
        let tmpIndex = this.getStateIndex(stateName);

        if(tmpIndex === -1) {
            this._currState = this._addState(stateName);
        } else {
            this._currState = tmpIndex;
        }
    }

    addState(stateName: any, beforeSwitchFunc: any = null, afterSwitchFunc: any = null) : boolean {
        return this._addState(stateName, beforeSwitchFunc, afterSwitchFunc) != -1;
    }

    removeState(stateName: any) : boolean {
        let tmpIndex = this.getStateIndex(stateName);
        if (tmpIndex === -1) {
            return false;
        } else {
            this.stateList.splice(tmpIndex, 1);
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

    ifStateExists(stateName: any) : boolean {
        return this.getStateIndex(stateName) !== -1;
    }

    setBeforeFunc(stateName: any, beforeSwitchFunc: any) {
        let tmpIndex = this.getStateIndex(stateName);
        if (tmpIndex != -1) {
            this.stateList[tmpIndex].beforeSwitch = beforeSwitchFunc;
        }
    }

    setAfterFunc(stateName: any, afterSwitchFunc: any) {
        let tmpIndex = this.getStateIndex(stateName);
        if (tmpIndex != -1) {
            this.stateList[tmpIndex].afterSwitch = afterSwitchFunc;
        }
    }

    setBeforeOnFunc(stateName: any, beforeOnSwitchFunc: any) {
        let tmpIndex = this.getStateIndex(stateName);
        if (tmpIndex != -1) {
            this.stateList[tmpIndex].beforeOnSwitch = beforeOnSwitchFunc;
        }
    }

    setAfterOnFunc(stateName: any, afterOnSwitchFunc: any) {
        let tmpIndex = this.getStateIndex(stateName);
        if (tmpIndex != -1) {
            this.stateList[tmpIndex].afterOnSwitch = afterOnSwitchFunc;
        }
    }

    addSwitch(fromStateName: any, toStateName: any, msg: string) {
        if (!this.ifStateExists(fromStateName)) {
            this.addState(fromStateName);
        }

        if (!this.ifStateExists(toStateName)) {
            this.addState(toStateName);
        }

        let fromStateIndex = this.getStateIndex(fromStateName);
        let toStateIndex = this.getStateIndex(toStateName);

        this.switchTable[fromStateIndex][msg] = toStateIndex;
    }

    removeSwitchByMsg(fromStateName: any, msg: string) {
        let fromStateIndex = this.getStateIndex(fromStateName);
        delete this.switchTable[fromStateIndex][msg];
    }

    removeSwitchByState(fromStateName: any, toStateName: string) {
        let fromStateIndex = this.getStateIndex(fromStateName);
        let toStateIndex = this.getStateIndex(toStateName);

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
        let fromStateIndex = this.getStateIndex(fromStateName);
        let toStateIndex = this.getStateIndex(toStateName);

        if (fromStateIndex === -1 || toStateIndex === -1) {
            return;
        }

        if (msg in this.switchTable[fromStateIndex] &&
            this.switchTable[fromStateIndex][msg] === toStateIndex) {
            delete this.switchTable[fromStateIndex][msg];
        }
    }

    switchState(msg: string) : boolean {
        if (this.switchTable[this._currState].hasOwnProperty(msg)) {
            if (typeof(this.stateList[this._currState].beforeSwitch) === 'function') {
                this.stateList[this._currState].beforeSwitch(arguments);
            }

            let nextState = this.switchTable[this._currState][msg];

            if (typeof(this.stateList[this._currState].afterSwitch) === 'function') {
                this.stateList[this._currState].afterSwitch(arguments);
            }

            if (typeof(this.stateList[nextState].beforeOnSwitch) === 'function') {
                this.stateList[nextState].beforeOnSwitch(arguments);
            }

            this._currState = nextState;

            if (typeof(this.stateList[this._currState].afterOnSwitch) === 'function') {
                this.stateList[this._currState].afterOnSwitch(arguments);
            }

            return true;
        }

        return false;
    }
}
