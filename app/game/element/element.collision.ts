import {BaseMap} from "./map/map.base";
import {AI} from "./ai/ai.container";
/**
 * Created by eason on 16-12-4.
 */

export class CollisionInspect {
    private intersections(rect0: PIXI.Rectangle, rect:PIXI.Rectangle):boolean{
        if(rect0.x+rect0.width<rect.x||
            rect.x+rect.width<rect0.x||
            rect0.y+rect0.height<rect.y||
            rect.y+rect.height<rect0.y)
            return false;

        let x = false,y = false;

        if(rect0.x<rect.x){
            x = rect0.x+rect0.width<=rect.x+rect.width;
        }else{
            x = rect.x+rect.width<=rect0.x+rect0.width;
        }

        if(rect0.y<rect.y){
            y = rect0.y+rect0.height<=rect.y+rect.height;
        }else{
            y = rect.y+rect.height<=rect0.y+rect0.height;
        }

        return x||y;
    }

    inspect(rect0: PIXI.Rectangle,map:BaseMap):boolean{
        for (let i in map.walls) {
            if(this.intersections(rect0,map.walls[i].rect)){
                return true;
            }
        }

        return false;
    }

    inspectWithAIs(rect0: PIXI.Rectangle, ais: AI[]) : number {
        for (let i = 0; i < ais.length; ++i) {
            if (this.intersections(rect0, ais[i].rect)) {
                return i;
            }
        }

        return -1;
    }
}