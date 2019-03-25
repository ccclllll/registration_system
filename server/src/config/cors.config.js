const environment = require('./environment')
const origins = environment.allowOrigins;
// 跨域请求配置 （浏览器的options)
function corsConfig() {
  return async (ctx, next) => {
    const origin = ctx.request.origin;
    console.log('origin'+origin)
    if (origins["http://localhost:8100"]) {
      ctx.set('Access-Control-Allow-Origin', "http://localhost:8100") // 允许来自该域名的请求跨域
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'); // 允许的请求头
      ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
      ctx.set('Access-Control-Max-Age', 212133);
      ctx.set('Access-Control-Alow-Credentials', true); // 允许携带凭证
    }
    await next()
  }
}
module.exports = corsConfig;