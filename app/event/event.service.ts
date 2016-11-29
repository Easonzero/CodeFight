/**
 * Created by eason on 16-9-19.
 */
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {EventModal} from "./event.modal";

//利用rxjs模块实现的事件通知注册机制
@Injectable()
export class EventService {

    private eventSource = new Subject<EventModal>();

    private event$ = this.eventSource.asObservable();
    //事件通知方法
    publish(event: EventModal) {
        this.eventSource.next(event);
    }
    //注册事件方法
    subscribe(event: number, fn : (msg?:any)=>void) {
        this.event$.subscribe((e:EventModal)=>{
            if(e.eventCode!==event) return;
            fn(e.eventMsg);
        })
    }
}