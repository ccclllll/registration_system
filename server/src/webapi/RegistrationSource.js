const environment = require('../config/environment')
const jwt = require('jsonwebtoken')
const sha1 = require('../utils/sha1')
const Registration = require('../domain/Registration')
class RegistrationResource {
  constructor() {
    this.path = [{
      url: '/api/current_doctors',
      method: 'get',
      option: 'getCurrentDoctors'
    }, {
      url: '/api/office_doctors',
      method: 'get',
      option: 'getAllDoctors'
    }, {
      url: '/api/registration',
      method: 'post',
      option: 'addRegistration'
    }, {
      url: '/api/registrations',
      method: 'get',
      option: 'getRegistrations'
    }, {
      url: '/api/doctor_registration',
      method: 'get',
      option: 'getDoctorRegistration'
    }];
  }

  // 获取某日值班医生 需要有科室，日期
  async getCurrentDoctors(ctx) {
    let query = ctx.request.query;
    let dbo = await ctx.mongodbUtil.dbo();
    let baseDao = ctx.baseDao;
    let res = await baseDao.find(dbo, 'workforce', {
      office: query.office,
      date: query.date
    });
    ctx.body = res;
  }

  // 获取科室所有医生 需要科室参数
  async getAllDoctors(ctx) {
    let query = ctx.request.query;
    let dbo = await ctx.mongodbUtil.dbo();
    let baseDao = ctx.baseDao;
    let res = await baseDao.find(dbo, 'user', {
      office: query.office
    });
    ctx.body = res;
  }

  // 挂号
  async addRegistration(ctx) {

 
    try {
   
      let registration = new Registration(ctx.request.body);

      let dbo = await ctx.mongodbUtil.dbo();
      let baseDao = ctx.baseDao;

      let history = await baseDao.find(dbo, 'registration', {
        workforce: registration.workforce,
        patientId: registration.patientId
      });
  
      if(history.length>0){
        ctx.body = {
          code: 401,
          err:'the registration is reduplicative'
        }
        return;
      }

  
      registration.id = registration.date + registration.doctor + registration.patientId;
      let workforce = await baseDao.find(dbo, 'workforce', {
        id: registration.workforce
      });

      if (parseInt(workforce[0].preNumber) > parseInt(workforce[0].realNumber)) {
        await baseDao.update(dbo, 'workforce', {
          id: registration.workforce
        }, {
          $set: {
            "realNumber": parseInt(workforce[0].realNumber) + 1
          }
        })
      } else {
        ctx.body = {
          err: '预约数超过预期数量'
        }
        return;
      }

      let res = await baseDao.add(dbo, 'registration', registration);
      ctx.body = res;
    } catch (err) {
      throw err;
    }
  }

  // role  id
  async getRegistrations(ctx) {
    let query = ctx.request.query;
    let dbo = await ctx.mongodbUtil.dbo();
    let baseDao = ctx.baseDao;
    let res = [];

    if(query.role==='doctor'){
      res = await baseDao.find(dbo, 'registration', {
       doctor: query.id
      });
    }else{
      res = await baseDao.find(dbo, 'registration', {
        patientId: query.id
      });
    }

    let ret = [];

    for (let index = 0; index < res.length; index++) {
      let item = res[index];
      let workforce = await baseDao.find(dbo, 'workforce', {
        id: item.workforce
      });

      item.workforce = workforce[0];
      let doctor = await baseDao.find(dbo, 'user', {
        id: item.doctor
      });

      item.doctor = doctor[0];

      let office = await baseDao.find(dbo, 'office', {
        id: item.office
      });

      item.office = office[0];
      let patient = await baseDao.find(dbo, 'user', {
        id: item.patientId
      })
      item.patient = patient[0];
      //ret.push(item)
    }


    ctx.body = res;
  }

  async getDoctorRegistration(ctx) {
    let query = ctx.request.query;
    let dbo = await ctx.mongodbUtil.dbo();
    let baseDao = ctx.baseDao;
    let res = await baseDao.find(dbo, 'registration', {
      doctor: query.id
    });
    ctx.body = res;
  }
}

module.exports = RegistrationResource