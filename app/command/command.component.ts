/**
 * Created by eason on 16-9-19.
 */
import { Component, ViewChild, AfterViewInit } from '@angular/core'
let Terminal = require('xterm');

@Component({
    moduleId: module.id,
    selector: 'view-command',
    template: '<section #command></section>'
})

export class CommandComponent implements AfterViewInit {
    @ViewChild("command")
    private command;

    ngAfterViewInit(){
        let term = new Terminal({
            cols: 50,
            rows: 10,
            cursorBlink: true
        });
        term.open(this.command.nativeElement);
        term.write('\x1b[31mWelcome to codefight!\x1b[m\r\n');
        term.on('data', function(data) {
            term.write(data);
        });

        term.attachCustomKeydownHandler(function (e) {
            if (e.keyCode == 13) {//enter
                term.writeln('');
                e.preventDefault();
                return false;
            }else if(e.keyCode == 9){//tab

                e.preventDefault();
                return false;
            }
        });
    }
}