/**
 * Created by eason on 16-9-20.
 */
import { Injectable } from '@angular/core';
import {StageContainer} from "./element/stage/index";
import {EventService,EventCode} from "../event/index";
import {State} from "./define/define.stage";

@Injectable()
export class GameService {
    private renderer : PIXI.SystemRenderer;//pixi渲染器
    private container : StageContainer;//pixi数据容器
    constructor(eventService:EventService){
        this.container = new StageContainer(eventService);
        this.renderer = PIXI.autoDetectRenderer(900, 500);
        eventService.subscribe(EventCode.EDIT_CODE_CONTENT,(code)=>{
            this.container.switch(State.GAMING,code);
        });
    }

    getDomView() : HTMLElement {
        return this.renderer.view;
    }

    gameLoop() : void {
        requestAnimationFrame(()=>this.gameLoop());

        this.renderer.render(this.container.getCurrentModel());

        this.container.looper();
    }
}