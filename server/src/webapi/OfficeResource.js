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
      url: '/api/office',
      method: 'post',
      option: 'addOffice'
    }, {
      url: '/api/office_doctors',
      method: 'get',
      option: 'getAllOfficeDoctor'
    },, {
      url: '/api/office',
      method: 'get',
      option: 'getOfficeById'
    }];
  }

  // 获取所有的科室
  async getOffices(ctx){
    let query = ctx.request.query;
    let dbo = await ctx.mongodbUtil.dbo();
    let baseDao = ctx.baseDao;
    let res = await baseDao.find(dbo, 'office', {},true);
    ctx.body = res;
  }

  async getOfficeById(ctx){
    let req_query = ctx.request.query;
    if (!req_query.id) {
      ctx.response.status = 501
      ctx.body = 'id querystring required'
    } else {
      try {
        let dbo = await ctx.mongodbUtil.dbo();
        let baseDao = ctx.baseDao;
        let res = await baseDao.find(dbo, 'office', {
          id: req_query.id
        });
        ctx.mongodbUtil.close();
        ctx.body = res;
      } catch (err) {
        ctx.body = 'err'
      }
    }
  }
  async getAllOfficeDoctor(ctx){
    let query = ctx.request.query;
    let dbo = await ctx.mongodbUtil.dbo();
    let baseDao = ctx.baseDao;
    console.log(query.office)
    let res = await baseDao.find(dbo, 'user', {office:query.office});

    ctx.body = res;
  }

  // 增加科室
  async addOffice(ctx){
    console.log('office')
    let office = new Office(ctx.request.body);
    try{
      let dbo = await ctx.mongodbUtil.dbo();
      let baseDao = ctx.baseDao;
      let res = await baseDao.add(dbo, 'office',office);
      ctx.body = res;
    }catch(err){
      throw err;
    }
  }
}
module.exports = OfficeResource