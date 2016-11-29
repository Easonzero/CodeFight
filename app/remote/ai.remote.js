/**
 * Created by eason on 16-11-28.
 */
//ai的api列表
let mAI = {
    up:()=>{postMessage({"fn":"/action/up","argvs":[]})}
};

onmessage = function (oEvent) {
    let event = oEvent.data.e;
    let ai = oEvent.data.ai;
    let argvs = oEvent.data.argvs;
    switch(event){
        case 'CREATE':
            let o = eval(argvs[0]);
            mAI.onStart = o.onStart||function(){};
            mAI.onLooper = o.onLooper||function(){};
            mAI.onHit = o.onHit||function(){};
            mAI.onScan = o.onScan||function(){};
            break;
        case 'START':
            mAI.life = ai.life;
            mAI.onStart();
            break;
        case 'LOOP':
            mAI.life = ai.life;
            mAI.onLooper();
            break;
    }
};

