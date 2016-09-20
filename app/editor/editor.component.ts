/**
 * Created by eason on 16-9-19.
 */
import { Component } from '@angular/core';
import {EventService,EventCode} from "../event/index";

@Component({
    moduleId: module.id,
    selector: 'view-editor',
    template: '<h2>this is a editor</h2>'
})

export class EditorComponent {
    constructor(eventService : EventService){
        eventService.subscribe(EventCode.TEST_EVENT,(msg)=>{
            console.log('Editor of module gets a test msg:'+msg);
        })
    };
}