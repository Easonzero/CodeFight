/**
 * Created by eason on 16-9-19.
 */
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {EventService,EventModal,EventCode} from "../event/index";
import {GameService} from "./game.service";

@Component({
    moduleId: module.id,
    selector: 'view-game',
    template: '<section #myCanvas></section>',
    providers: [GameService]
})
//游戏部分组件，引入游戏的主体部分GameService
export class GameComponent implements AfterViewInit {
    @ViewChild("myCanvas")
    private myCanvas;
    private gameService : GameService;
    constructor(eventService:EventService,gameService : GameService){
        this.gameService = gameService;
        eventService.publish(new EventModal(EventCode.TEST_EVENT,'this is a msg from Game of module'));
    };

    ngAfterViewInit() {
        this.myCanvas.nativeElement.appendChild(this.gameService.getDomView());
        this.gameService.gameLoop();
    }
}
