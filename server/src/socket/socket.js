const server = require('ws').Server;
module.exports =  function SocketServer(port) {
  SocketServer.prototype.start = function () {
    console.log("开始建立连接...")
    const ws = new server({
      port:8003
    });
    let connObj = {};
    //函数参数，连接的对象
    ws.on("connection",function(socket){
      //收到消息发送给每一个人
      socket.on("message",function(msg){
        msg =JSON.parse(msg)
        if(msg.userId){
          console.log(msg)
          connObj[msg.userId] = socket;
        }else{
          if(connObj[msg.to]){
            connObj[msg.to].send(msg.detail)
          }
        }
      })
      // socket.send("发送的消息");
      //断开连接
      socket.on("close",function(){
        //connNum.splice(connNum.indexOf(this),1);
      })
   
    })
  }
}

