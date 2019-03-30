module.exports = {
  getWorkforceById: async (ctx,workforceId) => {
    //let query = ctx.request.query;
    let dbo = await ctx.mongodbUtil.dbo();
    let baseDao = ctx.baseDao;
    //let date = new Date();
    //let dateStr = date.ge
    let res = await baseDao.find(dbo, 'workforce', {
      id: workforce
    },);
    return res;
  }
}