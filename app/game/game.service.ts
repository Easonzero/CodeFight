/**
 * Created by eason on 16-9-20.
 */
import { Injectable } from '@angular/core';
import {StageContainer} from "./element/stage/index";

@Injectable()
export class GameService {
    private renderer : PIXI.SystemRenderer;
    private container : StageContainer;
    constructor(){
        this.container = new StageContainer();
        this.renderer = PIXI.autoDetectRenderer(900, 500);
    }

    getDomView() : HTMLElement {
        return this.renderer.view;
    }

    gameLoop() : void {
        requestAnimationFrame(()=>this.gameLoop());

        this.renderer.render(this.container.getCurrentModel());
    }
}