


module.exports = function ({port,onconnection,onclose}) {
    function onconnection(msg){

    }

    function onclose(){

    }
    
    return async (ctx,next) => {
        if(ctx.ws){
            await next();
            return;
        }else{
            const ws = new server({
                port:8003
              });
              ctx.ws = ws;
              ws.on("connection",onconnection)
              wa.on('close',onclose);
        }

    }
}