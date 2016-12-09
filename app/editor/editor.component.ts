/**
 * Created by eason on 16-9-19.
 */
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {EventService,EventCode} from "../event/index";
import {EventModal} from "../event/event.modal";
import CodeMirror = require('codemirror');

require('codemirror/javascript');

@Component({
    moduleId: module.id,
    selector: 'view-editor',
    templateUrl: './index.html'
})

export class EditorComponent implements AfterViewInit {
    @ViewChild("editor")
    private editor;
    private codeMirror:CodeMirror.EditorFromTextArea;
    submit:()=>void;
    constructor(eventService : EventService){
        this.submit = function(){
            eventService.publish(
                new EventModal(EventCode.EDIT_CODE_CONTENT,this.codeMirror.getDoc().getValue())
            )
        };
    };

    ngAfterViewInit() {
        this.codeMirror = CodeMirror.fromTextArea(this.editor.nativeElement,{
            lineNumbers: true,
            mode: "text/javascript",
            theme:'bespin'
        });

        this.codeMirror.getDoc().setValue(
`
{
    onStart:function(){
        console.log('on start');
    },
    onLooper:function(){
        this.life=1000;
        this.rotation(0.01);
        this.rotationWeapon(0.01);
        this.ahead();
    },
    onHitWall:function(){
        this.back();
        this.rotation(0.01);
    }
}
`
        );
    }
}