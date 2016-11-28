/**
 * Created by eason on 16-9-19.
 */
import { Component } from '@angular/core';
import {EventService,EventCode} from "../event/index";
import {EventModal} from "../event/event.modal";

@Component({
    moduleId: module.id,
    selector: 'view-editor',
    templateUrl: './index.html'
})

export class EditorComponent {
    submit:(code:string)=>void;
    constructor(eventService : EventService){
        this.submit = function(code:string){
            eventService.publish(
                new EventModal(EventCode.EDIT_CODE_CONTENT,code)
            )
        };
    };
}