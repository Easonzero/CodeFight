/**
 * Created by eason on 16-9-19.
 */
export class EventModal {
    eventCode : number;
    eventMsg : any;

    constructor(eventCode:number,eventMsg:any){
        this.eventCode = eventCode;
        this.eventMsg = eventMsg;
    }
}