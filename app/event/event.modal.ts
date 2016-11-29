/**
 * Created by eason on 16-9-19.
 */
export class EventModal {
    eventCode : number;//事件
    eventMsg : any;//携带参数

    constructor(eventCode:number,eventMsg:any){
        this.eventCode = eventCode;
        this.eventMsg = eventMsg;
    }
}