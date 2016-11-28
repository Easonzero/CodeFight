/**
 * Created by eason on 16-11-28.
 */

let ai = {
    test:(argvs)=>{postMessage(`({fn:'/action/test',argvs:[${argvs}]})`);}
};

onmessage = function (oEvent) {
    let o = eval(oEvent.data);
    ai.onStart = o.onStart;
    ai.onStart();
};