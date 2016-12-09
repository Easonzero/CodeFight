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
            this.points.push(isect.point);
            return isect.point.x-ray.start.x==ray.dir.x&&
                isect.point.y-ray.start.y==ray.dir.y;
        }
        return false;
    }

    drawLight(center:PIXI.Point){
        this.graphics.beginFill(0xeeeeee);

        this.points.sort((a,b)=>{
            return Math.atan2(a.y-center.y,a.x-center.x)-Math.atan2(b.y-center.y,b.x-center.x);
        });

        this.graphics.drawPolygon(this.points);

        this.points.length = 0;
    }

    drawShadow(center:PIXI.Point){
        this.graphics.beginFill(0xffffff,0.2);

        this.points.sort((a,b)=>{
            return Math.atan2(a.y-center.y,a.x-center.x)-Math.atan2(b.y-center.y,b.x-center.x);
        });

        this.graphics.drawPolygon(this.points);

        this.points.length = 0;
    }

    test(rect:PIXI.Rectangle){
        this.graphics.beginFill(0x000000);
        this.graphics.drawRect(rect.x,rect.y,rect.width,rect.height);
    }

    clear(){
        this.graphics.clear();
    }

    toModel(){
        return this.graphics;
    }
}