const environment = require('../config/environment')
const jwt = require('jsonwebtoken')
const sha1 = require('../utils/sha1')
const User = require('../domain/User')
const Bill = require('../domain/Bill')
class BillResource {
  constructor() {
    this.path = [{
      url: '/api/apply_bill',
      method: 'post',
      option: 'applyBill'
    }, {
      url: '/api/update_bill',
      method: 'post',
      option: 'updateBill'
    }, {
      url: '/api/user_bill',
      method: 'get',
      option: 'getUserBill'
    }, {
      url: '/api/doctor_bill',
      method: 'get',
      option: 'getDoctorBill'
    }];
  }


  // 申请假条 需要有挂号单id
  async applyBill(ctx) {

    let bill = new Bill(ctx.request.body);
    let date = new Date().getTime();
    console.log(bill)
    // id 生成
    bill.id = bill.workforce + bill.doctor + bill.patient;
    try {
      let dbo = await ctx.mongodbUtil.dbo();
      let baseDao = ctx.baseDao;
      let res1 = await baseDao.find(dbo, 'bill', {
        patient: bill.patient,
        workforce: bill.workforce
      });
      if (res1.length > 0) {
        ctx.body = {
          message: '请不要重复申请！'
        }
        return;
      }

      let res = await baseDao.add(dbo, 'bill', bill);
      // let res = await baseDao.delete(dbo,'bill',{patient: bill.patient})
      ctx.body = {
        message: '申请成功！'
      }
      //ctx.body = res;

    } catch (err) {
      throw err;
    }
  }

  async getUserBill(ctx) {
    let req_query = ctx.request.query;

    try {
      let dbo = await ctx.mongodbUtil.dbo();
      let baseDao = ctx.baseDao;
      let res;
      if (req_query.role === 'student') {
        res = await baseDao.find(dbo, 'bill', {
          patient: req_query.id
        });
      } else {
        res = await baseDao.find(dbo, 'bill', {
          doctor: req_query.id
        });
      }
      ctx.body = res;
    } catch (err) {

    }
  }

  async getDoctorBill(ctx) {
    let req_query = ctx.request.query;

    try {
      let dbo = await ctx.mongodbUtil.dbo();
      let baseDao = ctx.baseDao;
      let res = await baseDao.find(dbo, 'bill', {
        doctor: req_query.id
      });
      ctx.body = res;
    } catch (err) {}
  }
  // 更新申请
  async updateBill() {
    let bill = new Bill(ctx.request.body);

    try {
      let dbo = await ctx.mongodbUtil.dbo();
      let baseDao = ctx.baseDao;
      let res = await baseDao.find(dbo, 'bill', {
        id: bill.id
      });

      await baseDao.update(dbo, 'bill', {
        id: bill.id
      }, {
        $set: {
          'state': bill.state,
          'reaseon': bill.reaseon,
          'days': bill.days
        }
      })
    } catch (err) {
      throw err;
      res.body = {
        err: JSON.stringify(err)
      }
    }


  }
}
module.exports = BillResource;