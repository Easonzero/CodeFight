/**
 * Created by eason on 16-12-1.
 */
export class MathUtils{
    static computeIntersection(
        p1:{x:number,y:number},
        p2:{x:number,y:number},
        start:{x:number,y:number},
        dir:{x:number,y:number}
    ):{x:number,y:number}{
        let k = 0,t = 0;
        if(p2.x!==p1.x){
            t = (p2.y-p1.y)/(p2.x-p1.x);
            k = (p1.y+t*(start.x-p1.x)-start.y)/(dir.y-t*dir.x);
        }else{
            k = (p1.x-start.x)/dir.x
        }
        return {x:start.x+k*dir.x,y:start.y+k*dir.y};
    }
}