const environment = require('../config/environment')
const jwt = require('jsonwebtoken')
const sha1 = require('../utils/sha1')
const Registration = require('../domain/Registration')
const Workforce = require('../domain/Workforce')
class WorkforceResource {
  constructor() {
    this.path = [, {
      url: '/api/current_workforce',
      method: 'get',
      option: 'getCurrentWorkforce'
    }, {
      url: '/api/workforces',
      method: 'get',
      option: 'getAllWorkforce'
    }, {
      url: '/api/workforce',
      method: 'post',
      option: 'addWorkforce'
    }];
  }

  // 获取医生某日的预约情况 日期+doctorId
  async getCurrentWorkforce(ctx){
    let query = ctx.request.query;
    let dbo = await ctx.mongodbUtil.dbo();
    let baseDao = ctx.baseDao;
    let res = await baseDao.find(dbo, 'workforce', {
      date: query.date,
      doctor: query.doctorId
    });
    ctx.body = res;
  }

  // 获取医生所有的预约情况 doctorID
  async getAllWorkforce(ctx){
    let query = ctx.request.query;
    let dbo = await ctx.mongodbUtil.dbo();
    let baseDao = ctx.baseDao;
    let res = await baseDao.find(dbo, 'workforce', {
      doctor: query.doctorId
    });
    ctx.body = res;
  }

  // 增加排班
  async addWorkforce(ctx){
    let workforce = new Workforce(ctx.request.body);
    try{
      let dbo = await ctx.mongodbUtil.dbo();
      let res = await baseDao.add(dbo, 'workforce', workforce);
      ctx.body = res;
    }catch(err){
      throw err;
    }
  }
}
module.exports = WorkforceResource;