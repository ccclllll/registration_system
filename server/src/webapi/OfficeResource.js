const environment = require('../config/environment')
const jwt = require('jsonwebtoken')
const sha1 = require('../utils/sha1')
const Office = require('../domain/Office')
class OfficeResource {
  constructor() {
    this.path = [{
      url: '/api/offices',
      method: 'get',
      option: 'getOffices'
    }, {
      url: 'api/office',
      method: 'post',
      option: 'addOffice'
    }];
  }

  // 获取所有的科室
  async getOffices(ctx){
    let query = ctx.request.query;
    let dbo = await ctx.mongodbUtil.dbo();
    let baseDao = ctx.baseDao;
    let res = await baseDao.find(dbo, 'workforce', {},true);
    ctx.body = res;
  }

  // 增加科室
  async addOffice(ctx){
    let office = new Office(ctx.request.body);
    try{
      let dbo = await ctx.mongodbUtil.dbo();
      let res = await baseDao.add(dbo, 'office',office);
      ctx.body = res;
    }catch(err){
      throw err;
    }
  }
}
module.exports = OfficeResource