const jwt = require('jsonwebtoken')
module.exports = function jwt_parse(){
  return async function(ctx,next){
    try{
      let token = ctx.get('Authorization').split(' ')[1];
      var decoded = jwt.verify(token, 'registration_system');
      let dbo = await ctx.mongodbUtil.dbo();
      let baseDao = ctx.baseDao;
      let res = await baseDao.find(dbo, 'user', {
        id: decoded.id,
        role: decoded.role
      });
      console.log('jwt-parse log'+res)
      ctx.user = res;
    }catch(err){
      ctx.body = {
        code:500,
        message:'server error'
      }
    }
    await next()
  }
}