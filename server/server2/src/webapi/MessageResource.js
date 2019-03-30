const environment = require('../config/environment')
const jwt = require('jsonwebtoken')
const sha1 = require('../utils/sha1')
const User = require('../domain/User')
const Message = require('../domain/Message')
class MessageResource {
    constructor() {
        this.path = [{
            url: '/api/message',
            method: 'post',
            option: 'addMessage'
        }, {
            url: '/api/contacts',
            method: 'get',
            option: 'getContacts'
        }, {
            url: '/api/current_messages',
            method: 'get',
            option: 'getCurrentMessages'
        }];
    }


    // 新增一条消息
    async addMessage(ctx) {
        let message = new Message(ctx.request.body);
        // id 生成
        message.id = message.date + message.from + message.to;
        try {
            let dbo = await ctx.mongodbUtil.dbo();
            let baseDao = ctx.baseDao;
            let res = await baseDao.add(dbo, 'message', message);
            ctx.body = res;
        } catch (err) {
            throw err;
        }
    }

    // 获取用户联系人列表
    async getContacts(ctx) {
        let contacts = [];
        let req_query = ctx.request.query;
        if (!req_query.userId) {
            ctx.body = {
                err: 'userId required!'
            }
            return;
        }

        try {
            let dbo = await ctx.mongodbUtil.dbo();
            let baseDao = ctx.baseDao;
            let res1 = await baseDao.find(dbo, 'message', {
                from: req_query.userId
            });
            let res2 = await baseDao.find(dbo, 'message', {
                to: req_query.userId
            });
            let messageObj = this.distincMessage(res1, res2);
            let contacts = await this.buildContacts(messageObj, ctx);
            ctx.body = contacts;
        } catch (err) {
            ctx.body = err;
            throw err;
        }
    }

    // 获取与某人的聊天消息 需要有userId contactId （本人id，对方id）
    async getCurrentMessages(ctx) {
        let req_query = ctx.request.query;
        try {
            let baseDao = ctx.baseDao;
            let dbo = await ctx.mongodbUtil.dbo();
            let res1 = await baseDao.find(dbo, 'message', {
                from: req_query.userId,
                to: req_query.contactId
            });

            let res2 = await baseDao.find(dbo, 'message', {
                from: req_query.contactId,
                to: req_query.userId
            });

            let res = res1.concat(res2);
            res.sort((a,b)=> a.date - b.date);
            ctx.body = res;   
        } catch (err) {
            throw err;
        }
    }

    // 将消息去重
    distincMessage(fromRes, toRes) {
        let obj = {};

        // 剔除主动发起的消息
        for (let index = 0; index < fromRes.length; index++) {
            let message = new Message(fromRes[index]);
            if (!obj[message.to]) {
                obj[message.to] = message;
                //res.push(message);
            } else {
                // 比较时间来更新message
                if (obj[message.to].date < message.date) {
                    obj[message.to] = message;
                }
            }
        }

        // 去重被接收的西消息
        for (let index = 0; index < toRes.length; index++) {
            let message = new Message(toRes[index]);
            if (!obj[message.from]) {
                obj[message.from] = message;
                //res.push(message);
            } else {
                // 比较时间来更新message
                if (obj[message.from].date < message.date) {
                    obj[message.from] = message;
                }
            }
        }

        return obj;
    }

    async buildContacts(messageObj, ctx) {
        let ret = [];

        try {
            let dbo = await ctx.mongodbUtil.dbo();
            let baseDao = ctx.baseDao;

            for (let key in messageObj) {
                let res = await baseDao.find(dbo, 'user', {
                    id: key
                });

                let obj = {
                    message: messageObj[key],
                    contact: res[0],
                }
      
                ret.push(obj);
        
            }
    

        } catch (err) {
            ctx.body = {
                err: err
            }
        }
        return ret;
    }
}
module.exports = MessageResource;