/**
 * Created by eason on 16-12-1.
 */
export class MathUtils{
    static computeIntersection(
        p1:PIXI.Point,
        p2:PIXI.Point,
        start:PIXI.Point,
        dir:PIXI.Point
    ):PIXI.Point{
        let k = 0,t = 0;
        if(p2.x!==p1.x){
            t = (p2.y-p1.y)/(p2.x-p1.x);
            k = (p1.y+t*(start.x-p1.x)-start.y)/(dir.y-t*dir.x);
        }else{
            k = (p1.x-start.x)/dir.x;
        }
        return new PIXI.Point(start.x+k*dir.x,start.y+k*dir.y);
    }

    static rotation(vec:PIXI.Point,deg:number):PIXI.Point{
        return new PIXI.Point(vec.x*Math.cos(deg)-vec.y*Math.sin(deg),vec.y*Math.cos(deg)+vec.x*Math.sin(deg));
    }

    static dot(vec1:PIXI.Point,vec2:PIXI.Point){
        return vec1.x*vec2.x+vec1.y*vec2.y;
    }

    static multi(vec1:PIXI.Point,vec2:PIXI.Point){
        return vec1.x*vec2.y-vec1.y*vec2.x;
    }
}