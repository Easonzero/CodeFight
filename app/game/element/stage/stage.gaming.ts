/**
 * Created by eason on 16-9-22.
 */
import {Stage} from "./stage.interface";
import {EventService,EventCode} from "../../../event/index";
import {AI} from "../ai/index";
import {Config} from "../../define/index";
import {BaseMap} from "../map/index";
import {RayTracer} from "../element.raytracer";
import {MathUtils} from "../../../utils/utils.math";
import {CollisionInspect} from "../element.collision";
import {Bullet} from "../item/item.bullet";

export class GamingStage extends Stage{
    ais : AI[];//ai数组
    map : BaseMap;
    rayTracing : RayTracer;
    collisionInspect:CollisionInspect;

    bullets: Bullet[];

    debug:boolean = true;
    onCreate(eventService:EventService) {
        this.ais = [];
        this.map = new BaseMap(Config.WIDTH,Config.HEIGHT);
        this.rayTracing = new RayTracer();
        this.collisionInspect = new CollisionInspect();

        this.bullets = [];

        this.stage.addChild(this.map.toModel());
        this.stage.addChild(this.rayTracing.toModel());
    }

    onLooper(){
        for(let ai of this.ais){
            if(this.collisionInspect.inspect(ai.rect,this.map)){
                ai.backup();
                ai.lifeCycle('HITWALL');
                ai.setState('isHitWall',true);
            }else ai.setState('isHitWall',false);

            if(!ai.getState('isHitWall')){
                ai.lifeCycle('LOOP');

                this.rayTracing.clear();

                for(let i=0;i<10;i++){
                    let offset = MathUtils.rotation(new PIXI.Point(10,0),i*Math.PI*2/10);
                    let pos = ai.position(offset);

                    for(let wall of this.map.walls){
                        for(let point of wall.points){
                            let dir = new PIXI.Point(point.x-pos.x,point.y-pos.y);
                            let isvec = this.rayTracing.trace(ai.emitRay(dir,offset),this.map);

                            if(isvec){
                                this.rayTracing.trace(ai.emitRay(MathUtils.rotation(dir,0.001),offset),this.map);
                                this.rayTracing.trace(ai.emitRay(MathUtils.rotation(dir,-0.001),offset),this.map);
                            }
                        }
                    }

                    this.rayTracing.drawShadow(pos);
                }

                for(let wall of this.map.walls){
                    for(let point of wall.points){
                        let dir = new PIXI.Point(point.x-ai.toModel().position.x,point.y-ai.toModel().position.y);
                        let isvec = this.rayTracing.trace(ai.emitRay(dir),this.map);

                        if(isvec){
                            this.rayTracing.trace(ai.emitRay(MathUtils.rotation(dir,0.001)),this.map);
                            this.rayTracing.trace(ai.emitRay(MathUtils.rotation(dir,-0.001)),this.map);
                        }
                    }
                }
                this.rayTracing.drawLight(ai.toModel().position);
            }

            this.debug = false;
        }

        // 子弹飞行部分
        for(let bullet of this.bullets) {
            if (this.collisionInspect.inspect(bullet.rect(), this.map)) {
                this.stage.removeChild(bullet.toModel());
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
            }

            // 判断是否和 AI 相撞
            let tmpIndex = this.collisionInspect.inspectWithAIs(bullet.rect(), this.ais);

            // TODO: 撞上了一个 AI
            if (tmpIndex != -1 && bullet.owner != this.ais[tmpIndex]) {

                this.stage.removeChild(bullet.toModel());
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
            } else {
                bullet.ahead();
            }

        }
    }

    onSwitch(fn:()=>void) {
        fn();
    }

    afterSwitch(msg:any) {
        let ai : AI = new AI(this);
        //测试代码
        ai.lifeCycle('CREATE',`(${msg})`);
        this.stage.addChild(ai.toModel());
        this.ais.push(ai);
        ai.lifeCycle('START');
    }

    onDestory() {

    }

    addChild(child) {
        this.stage.addChild(child);
    }
}