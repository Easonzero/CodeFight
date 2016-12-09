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

        let wall = new Wall(0,0,width,height);
        this.container.addChild(wall.toModel());
        this.walls.push(wall);

        for(let i=0;i<5;i++){
            if(i==2) continue;
            let wall = new Wall(10+i*width/5,Math.random()*(height-110),100,100);
            this.container.addChild(wall.toModel());
            this.walls.push(wall);
        }
    }

    toModel():PIXI.Container{
        return this.container;
    }
}