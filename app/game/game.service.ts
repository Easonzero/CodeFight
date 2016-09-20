/**
 * Created by eason on 16-9-20.
 */
import { Injectable } from '@angular/core';
import {Stage} from "./define/index";
import PIXI = require('pixi.js');

@Injectable()
export class GameService {
    private stages : PIXI.Container[];
    private renderer : PIXI.SystemRenderer;
    private currentStage : Stage = Stage.PREPARE;
    constructor(){
        this.stages = [];
        for(let i:Stage=Stage.PREPARE;i < Stage.END;i++){
            this.stages[i] = new PIXI.Container();
        }
        this.renderer = PIXI.autoDetectRenderer(900, 500);
    }

    getDomView() : HTMLElement {
        return this.renderer.view;
    }

    gameLoop() : void {
        requestAnimationFrame(()=>this.gameLoop());
        this.renderer.render(this.stages[this.currentStage]);
    }
}