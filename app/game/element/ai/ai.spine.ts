/**
 * Created by eason on 16-12-8.
 */
require('pixi.js');

export class Spine extends PIXI.Container{
    private _head_height:number = 30;
    private _head_width:number = 30;
    private _body_height:number = 30;
    private _body_width:number = 30;

    private head:Head;
    private body:Body;

    constructor(textures){
        super();

        this.head = new Head(this._head_width,this._head_height,textures);
        this.body = new Body(this._body_width,this._body_height,textures);

        this.body.y += this.head.height;

        this.addChild(this.body);
        this.addChild(this.head);
    }

    r(deg:number){
        this.head.r(deg);
        this.body.r(deg);
    }

    rweapon(deg:number){
        this.body.rweapon(deg);
    }
}

class Head extends PIXI.Container{
    private head:PIXI.Sprite;
    private hair:PIXI.Sprite;
    private face:PIXI.Sprite;

    private middel:number;

    constructor(width,height,textures){
        super();

        this.head = new PIXI.Sprite(textures.head(new PIXI.Graphics(),width,height));
        this.hair = new PIXI.Sprite(textures.hair(new PIXI.Graphics(),width,height));
        this.face = new PIXI.Sprite(textures.face(new PIXI.Graphics(),width*4/5,height/2));

        this.face.y += height/2;
        this.face.x += (width-this.face.width)/2;
        this.middel = this.face.x;

        this.addChild(this.head);
        this.addChild(this.hair);
        this.addChild(this.face);
    }

    r(deg:number){
        let cos = Math.cos(deg),
            sin = Math.sin(deg);

        if(sin==1){

        }else{
            this.face.x = this.middel+cos*(this.middel-2);
        }
    }
}

class Body extends PIXI.Container{
    private trunk:PIXI.extras.AnimatedSprite;
    private clothes:PIXI.Sprite;
    private weapon:PIXI.Sprite;

    constructor(width,height,textures){
        super();

        let w_arm = width/5,
            h_arm = height/2;

        let texture1 = textures.trunk(new PIXI.Graphics(),width,height,true);
        let texture2 = textures.trunk(new PIXI.Graphics(),width,height,true);
        texture2.rotate = 12;
        this.trunk = new PIXI.extras.AnimatedSprite([texture1,texture2,textures.trunk(new PIXI.Graphics(),width,height,false)]);
        this.clothes = new PIXI.Sprite(textures.clothes(new PIXI.Graphics(),width*3/5,w_arm,height*2/3));

        this.weapon = new PIXI.Sprite(textures.weapon(new PIXI.Graphics(),width,height/2));

        this.weapon.y+=this.weapon.height/2;
        this.weapon.anchor.y = .5;

        this.weapon.position.y+=h_arm-this.weapon.height/2;
        this.weapon.position.x+=w_arm/2;

        this.addChild(this.trunk);
        this.addChild(this.clothes);
        this.addChild(this.weapon);

        this.trunk.animationSpeed=0.1;
        this.trunk.play();
    }

    r(deg:number){
        let sin = Math.sin(deg);

        if(sin==1){

        }else{

        }
    }

    rweapon(deg:number){
        this.weapon.rotation=deg;
        let cos = Math.cos(this.weapon.rotation);
        if(cos>0) this.weapon.texture.rotate = 0;
        else this.weapon.texture.rotate = 8;
    }
}