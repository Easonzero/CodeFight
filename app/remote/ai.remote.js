/**
 * Created by eason on 16-11-28.
 */

let ai = {
    up:()=>{postMessage({"fn":"/action/up","argvs":[]})}
};

onmessage = function (oEvent) {
    let event = oEvent.data.e;
    let msg = oEvent.data.msg;
    switch(event){
        case 'CREATE':
            let o = eval(msg);
            ai.onStart = o.onStart||function(){};
            ai.onLooper = o.onLooper||function(){};
            break;
        case 'START':
            ai.position = msg.position;
            ai.onStart();
            break;
        case 'LOOP':
            ai.position = msg.position;
            console.log(ai.position);
            ai.onLooper();
            break;
    }
};

