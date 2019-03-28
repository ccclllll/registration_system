const environment = require('../config/environment')
const jwt = require('jsonwebtoken')
const sha1 = require('../utils/sha1')
const User = require('../domain/User')
class BillResource {
  constructor() {
    this.path = [{
      url: 'api/apply_bill',
      method: 'post',
      option: 'applyBill'
    }];
  }


  // 申请假条 需要有挂号单id
  async applyBill(ctx){

  }
}
module.exports = BillResource;