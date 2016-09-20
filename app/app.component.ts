/**
 * Created by eason on 16-9-19.
 */
import { Component } from '@angular/core';
import { EventService } from './event/index';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [EventService]
})

export class AppComponent {
    constructor(){
    };
}
