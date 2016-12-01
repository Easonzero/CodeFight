import {Wall} from "./map.wall";
/**
 * Created by eason on 16-11-30.
 */
export class BaseMap{
    private container:PIXI.Container;
    public walls:Wall[];
    constructor(width:number,height:number){
        this.container = new PIXI.Container();
        this.walls = [];

        let graphics : PIXI.Graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000);
        graphics.drawRect(0,0,width,height);
        this.container.addChild(graphics);

        for(let i=0;i<5;i++){
            let wall = new Wall(i*width/5,Math.random()*(height-100),100,100);
            this.container.addChild(wall.toModel());
            this.walls.push(wall);
        }
    }

    toModel():PIXI.Container{
        return this.container;
    }
}