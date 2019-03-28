const server = require('ws').Server;

module.exports = function SocketServer(port) {
  SocketServer.prototype.start = function () {
    console.log("开始建立连接...")
    const ws = new server({
      port: 8003
    });
    let connObj = {};
    //函数参数，连接的对象
    ws.on("connection", function (socket) {
      //收到消息发送给每一个人
      socket.on("message", function (msg) {
        msg = JSON.parse(msg)
        if (msg.userId&&msg.type === 'connection') {
          console.log(msg)
          connObj[msg.userId] = socket;
        } else {

          // 如果存在socket连接，则推送消息
          if (connObj[msg.to]) {
            try {
              connObj[msg.to].send(JSON.stringify(msg));
            } catch (err) {
              connObj[msg.to] = undefined;
            }
          }
        }
      })
      // socket.send("发送的消息");
      //断开连接
      socket.on("close", function () {
        //connNum.splice(connNum.indexOf(this),1);
        // 将连接剔除

      })

    })
  }
}