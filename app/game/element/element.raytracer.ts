import {BaseMap} from "./map/index";
/**
 * Created by eason on 16-12-1.
 */
export class Ray{
    constructor(public start:{x:number,y:number},
                public dir:{x:number,y:number}){
    }
}

export class RayTracer{
    private graphics:PIXI.Graphics;

    constructor(){
        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(1,0xffffff);
    }

    private intersections(ray: Ray, map: BaseMap):{x:number,y:number,dist:number}{
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

    trace(ray:Ray,map:BaseMap){
        let isect = this.intersections(ray, map);
        if (isect){
            this.graphics.moveTo(ray.start.x,ray.start.y)
                .lineTo(isect.x,isect.y);
        }
    }

    clear(){
        this.graphics.clear();
        this.graphics.lineStyle(1,0xffffff);
    }

    toModel(){
        return this.graphics;
    }
}