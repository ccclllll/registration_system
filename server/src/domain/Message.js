/**
 * 消息实体
 */
module.exports = class Message{
  constructor({to,from,state,date,detail,type, id}){
    this.id = id;
    this.to = to;
    this.from = from;
    this.state = state;
    this.date = date;
    this.detail = detail;
    this.type = type;
  }
}