import {BaseMap} from "./map/index";
/**
 * Created by eason on 16-12-1.
 */
export class Ray{
    constructor(public start:PIXI.Point,
                public dir:PIXI.Point){
    }
}

export class RayTracer{
    private graphics:PIXI.Graphics;
    private points:PIXI.Point[];

    constructor(){
        this.graphics = new PIXI.Graphics();
        this.points = [];
        this.graphics.lineStyle(1,0xffffff);
        this.graphics.beginFill(0xeeeeee);
    }

    private intersections(ray: Ray, map: BaseMap):{point:PIXI.Point,dist:number}{
        let closest=100000;
        let closestInter;
        for (let i in map.walls) {
            let inter = map.walls[i].intersect(ray);
            if (inter && inter.dist < closest) {
                closestInter = inter;
                closest = inter.dist;
            }
        }
        return closestInter;
    }

    trace(ray:Ray,map:BaseMap):boolean{
        let isect = this.intersections(ray, map);
        if (isect){
            this.graphics.moveTo(ray.start.x,ray.start.y)
                .lineTo(isect.point.x,isect.point.y);
            this.points.push(isect.point);
            return isect.point.x-ray.start.x==ray.dir.x&&
                isect.point.y-ray.start.y==ray.dir.y;
        }
        return false;
    }

    drawLight(center:PIXI.Point){
        this.points.sort((a,b)=>{
            return Math.atan2(a.y-center.y,a.x-center.x)-Math.atan2(b.y-center.y,b.x-center.x);
        })

        this.graphics.drawPolygon(this.points);
    }

    clear(){
        this.graphics.clear();
        this.graphics.lineStyle(1,0xffffff);
        this.graphics.beginFill(0xeeeeee);
        this.points.length = 0;
    }

    toModel(){
        return this.graphics;
    }
}