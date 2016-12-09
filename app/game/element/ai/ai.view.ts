import {Model} from "./ai.model";
import {Spine} from "./ai.spine";
/**
 * Created by eason on 16-9-22.
 */

export class View {
    constructor(protected model:Model){
        this.model.spine = new Spine({
            head:(g:PIXI.Graphics,width,height)=>{
                g.beginFill(0xf4d1a7);
                g.drawRoundedRect(0,0,width,height,10);
                return g.generateCanvasTexture(1,1);
            },
            hair:(g:PIXI.Graphics,width,height)=>{
                let offset_b = height/10,
                    offset_t = height/7,
                    w = (width-offset_b)/4,
                    h = (height/2-offset_b-offset_t)/2;
                g.beginFill(0x000000);
                g.drawRoundedRect(0,0,width,height/2,10);
                g.beginFill(0xf4d1a7);
                g.drawPolygon([
                    new PIXI.Point(0,height/2),
                    new PIXI.Point(0,height/2-offset_b),
                    new PIXI.Point(offset_b,height/2-offset_b),
                    new PIXI.Point(offset_b,offset_t),
                    new PIXI.Point(offset_b+w,offset_t),
                    new PIXI.Point(offset_b+w,offset_t+h),
                    new PIXI.Point(offset_b+w*2,offset_t+h),
                    new PIXI.Point(offset_b+w*2,offset_t+h/2),
                    new PIXI.Point(offset_b+w*3,offset_t+h/2),
                    new PIXI.Point(offset_b+w*3,offset_t+h),
                    new PIXI.Point(offset_b+w*7/2,offset_t+h),
                    new PIXI.Point(offset_b+w*7/2,offset_t+h*2),
                    new PIXI.Point(width,offset_t+h*2),
                    new PIXI.Point(width,height/2),
                ]);
                return g.generateCanvasTexture(1,1);
            },
            face:(g:PIXI.Graphics,width,height)=>{
                let offset = height/4,w = width*2/7;
                g.lineStyle(1,0x000000,0);
                g.moveTo(0,0);
                g.lineTo(0,offset);
                g.lineStyle(1,0x000000);
                g.lineTo(w,offset);
                g.moveTo(w*3/2,offset);
                g.lineTo(w*5/2,offset);
                g.moveTo(w*2/3,offset*2);
                g.lineTo(w*11/6,offset*2);
                return g.generateCanvasTexture(1,1);
            },
            trunk:(g:PIXI.Graphics,width,height,isRun)=>{
                let legw = width/10,
                    legh = height*3/20,
                    armw = width/5,
                    armh = height/2;
                g.beginFill(0xf4d1a7);
                if(isRun){
                    g.drawPolygon([
                        new PIXI.Point(0,0),
                        new PIXI.Point(width,0),
                        new PIXI.Point(width,armh),
                        new PIXI.Point(width-armw,armh),
                        new PIXI.Point(width-armw,height-legh),
                        new PIXI.Point(width-armw-legw,height-legh),
                        new PIXI.Point(armw+legw,height-legh),
                        new PIXI.Point(armw+legw,height),
                        new PIXI.Point(armw,height),
                        new PIXI.Point(armw,armh),
                        new PIXI.Point(0,armh),
                    ]);
                }else{
                    g.drawPolygon([
                        new PIXI.Point(0,0),
                        new PIXI.Point(width,0),
                        new PIXI.Point(width,armh),
                        new PIXI.Point(width-armw,armh),
                        new PIXI.Point(width-armw,height),
                        new PIXI.Point(width-armw-legw,height),
                        new PIXI.Point(width-armw-legw,height-legh),
                        new PIXI.Point(armw+legw,height-legh),
                        new PIXI.Point(armw+legw,height),
                        new PIXI.Point(armw,height),
                        new PIXI.Point(armw,armh),
                        new PIXI.Point(0,armh),
                    ]);
                }
                return g.generateCanvasTexture(1,1);
            },
            clothes:(g:PIXI.Graphics,w_body,w_arm,height)=>{
                g.beginFill(0x000000);
                g.drawRect(0,-w_arm,w_arm,w_arm);
                g.drawPolygon([
                    new PIXI.Point(0,0),
                    new PIXI.Point(w_body+2*w_arm,0),
                    new PIXI.Point(w_body+2*w_arm,w_arm),
                    new PIXI.Point(w_body+w_arm,w_arm),
                    new PIXI.Point(w_body+w_arm,height),
                    new PIXI.Point(w_arm,height),
                    new PIXI.Point(w_arm,w_arm),
                    new PIXI.Point(0,w_arm)
                ]);
                return g.generateCanvasTexture(1,1);
            },
            weapon:(g:PIXI.Graphics,width,height)=>{
                g.beginFill(0xff00ff);
                g.drawRect(0,0,width/2,height/2);
                g.drawPolygon([
                    new PIXI.Point(0,0),
                    new PIXI.Point(width/2,0),
                    new PIXI.Point(width/2,height/2),
                    new PIXI.Point(width/5,height/2),
                    new PIXI.Point(width/5,height*2/3),
                    new PIXI.Point(0,height*2/3)
                ]);

                return g.generateCanvasTexture(1,1);
            }
        });
    }
}