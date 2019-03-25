const environment = require('../config/environment')
const jwt = require('jsonwebtoken')
const sha1 = require('../utils/sha1')
class RegistrationResource{
  constructor() {
    this.path = [{
      url: '/api/current_doctors',
      method: 'get',
      option: 'getCurrentDoctors'
    }, {
      url: 'api/office_doctors',
      method: 'get',
      option: 'getAllDoctors'
    },{
      url: '/api/add_registration',
      method: 'post',
      option: 'addRegistration'
    }];
  }

  // 获取某日值班医生 需要有科室，日期
  async getCurrentDoctors(ctx){
    let query = ctx.request.query;
    let dbo = await ctx.mongodbUtil.dbo();
    let baseDao = ctx.baseDao;
    let res = await baseDao.find(dbo, 'workforce', {
      office: query.office,
      date:query.date
    });
    ctx.body = res;
  }

  // 获取科室所有医生 需要科室参数
  async getAllDoctors(ctx){
    let query = ctx.request.query;
    let dbo = await ctx.mongodbUtil.dbo();
    let baseDao = ctx.baseDao;
    let res = await baseDao.find(dbo, 'user', {
      office: query.office
    });
    ctx.body = res;
  }

  // 挂号
  async addRegistration(ctx){
    
  }
}

module.exports = RegistrationResource