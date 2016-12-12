/**
* Created by eason on 16-11-28.
*/
//ai的api列表		
let mAI = {
    ahead: function () { postMessage({ "fn": "/action/ahead", "argvs": [] }); },
    rotation: function (deg) { postMessage({ "fn": "/action/rotation", "argvs": [deg] }); },
    rotationWeapon: function (deg) { postMessage({ "fn": "/action/rotationWeapon", "argvs": [deg] }); },
    back: function () { postMessage({ "fn": "/action/back", "argvs": [] }); },
    fire: function () { postMessage({ "fn": "/action/fire", "argvs": [] }); }
};
onmessage = function (oEvent) {
    let event = oEvent.data.e;
    let ai = oEvent.data.ai;
    let argvs = oEvent.data.argvs;
    switch (event) {
        case 'CREATE':
            let o = eval(argvs[0]);
            mAI.onStart = o.onStart || function () { };
            mAI.onLooper = o.onLooper || function () { };
            mAI.onHitWall = o.onHitWall || function () { };
            mAI.onScan = o.onScan || function () { };
            break;
        case 'START':
            mAI.life = ai.life;
            mAI.onStart();
            break;
        case 'LOOP':
            mAI.life = ai.life;
            mAI.onLooper();
            break;
        case 'HITWALL':
            mAI.life = ai.life;
            mAI.onHitWall();
            break;
    }
};