/**
 * Created by eason on 16-9-23.
 */
export class WebWorker {
    AIs:Worker[]=[];
    createAI(code : string){
        let codeBlob:Blob = new Blob([code]);
        let worker:Worker = new Worker(window.URL.createObjectURL(codeBlob));
        this.AIs.push(worker);
    }

    addAIListener(listener:(index:string,data:[string,any])=>void){
        for(let i in this.AIs){
            this.AIs[i].onmessage = function(event){
                listener(i,event.data);
            }
        }
    }
}