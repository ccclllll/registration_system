const UserResource = require('../webapi/UserResource')
const BillResource = require('../webapi/BillResource')
const RegistrationResurce = require('../webapi/RegistrationSource')
const OfficeResource = require('../webapi/OfficeResource')
const WorkforceResource = require('../webapi/WorkforceResource')

const userResource = new UserResource()
const billResource = new BillResource()
const registrationResurce = new RegistrationResurce()
const officeResource = new OfficeResource()
const workforceResource = new WorkforceResource()
const resources = [
  userResource, registrationResurce,billResource,officeResource,workforceResource
];

module.exports = function configRouter(router) {
  resources.forEach(resource => {
    resource.path.forEach(path => {
      router[path.method](path.url, async (ctx) => {
        await resource[path.option](ctx);
      })
    })
  })
}