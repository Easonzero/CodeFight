import {Ray} from "../element.raytracer";
import {MathUtils} from "../../../utils/utils.math";
import {close} from "fs";
/**
 * Created by eason on 16-11-30.
 */
export class Wall{
    private sprite:PIXI.Sprite;
    points:PIXI.Point[];
    constructor(x:number,y:number,width:number,height:number){
        let graphics : PIXI.Graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000);
        graphics.lineStyle(1,0xffffff);
        graphics.drawRect(0,0,width,height);
        this.sprite = new PIXI.Sprite(graphics.generateCanvasTexture(1,1));

        this.sprite.position.x=x;
        this.sprite.position.y=y;

        this.points = [];
        this.points.push(new PIXI.Point(x,y));
        this.points.push(new PIXI.Point(x+width,y));
        this.points.push(new PIXI.Point(x+width,y+height));
        this.points.push(new PIXI.Point(x,y+height));
    }

    intersect(ray:Ray):{point:PIXI.Point,dist:number}{
        let vecs = [],result=[];
        for(let point of this.points){
            vecs.push({x:point.x-ray.start.x,y:point.y-ray.start.y});
        }
        let dirtan = Math.atan2(ray.dir.y,ray.dir.x);
        let flag = false;
        for(let i=0;i<vecs.length;i++){
            let next = i==vecs.length-1?0:i+1;

            if((dirtan-Math.atan2(vecs[i].y,vecs[i].x))==0){
                flag = true;
                result.push(this.points[i]);
            }else if((dirtan-Math.atan2(vecs[i].y,vecs[i].x))*(dirtan-Math.atan2(vecs[next].y,vecs[next].x))<0){
                flag = true;
                result.push(MathUtils.computeIntersection(this.points[i],this.points[next],ray.start,ray.dir));
            }
        }
        if(flag){
            let closest=100000;
            let closePoint;
            let rect = this.sprite.getLocalBounds();
            rect.x = this.sprite.x;
            rect.y = this.sprite.y;
            for(let i=0;i<result.length;i++){
                let k = ray.dir.x!==0?(result[i].x-ray.start.x)/ray.dir.x:(result[i].y-ray.start.y)/ray.dir.y;
                if(closest>k&&k>0){
                    if(!closePoint) closePoint = {};
                    closePoint.point = result[i];
                    closePoint.dist = k;
                    closest = k;
                }
            }
            return closePoint;
        }else{
            return undefined;
        }
    }

    toModel():PIXI.Sprite{
        return this.sprite;
    }
}