/**
 * Created by eason on 16-9-19.
 */
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {EventModal} from "./event.modal";


@Injectable()
export class EventService {

    private eventSource = new Subject<EventModal>();

    private event$ = this.eventSource.asObservable();

    publish(event: EventModal) {
        this.eventSource.next(event);
    }

    subscribe(event: number, fn : (msg?:any)=>void) {
        this.event$.subscribe((e:EventModal)=>{
            if(e.eventCode!==event) return;
            fn(e.eventMsg);
        })
    }
}