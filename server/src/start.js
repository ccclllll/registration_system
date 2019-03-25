const routerConfig = require('./config/router.config');
const Koa = require('koa');
const router = require('koa-router')(); /*引入是实例化路由** 推荐*/
const MongoClient = require('mongodb').MongoClient;
const environment = require('./config/environment')
const bodyParser = require('koa-bodyparser');
const MongodbUtil = require('./utils/mongodb.utils')
const corsConfig = require('./config/cors.config')
const cors = require('koa2-cors');
const koaBody = require('koa-body')
const SocketServer = require('./socket/socket')

const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const BaseDao = require('./dao/BaseDao')

const jwt_parse = require('./config/jwt-parse')
async function startApp() {
  const app = new Koa();
  // app.use(jwtKoa({
  //   secret: environment.secret
  // }).unless({
  //   path: [/^\/api\/login/,/^\/api\/register/] //数组中的路径不需要通过jwt验证
  // }))

  app.use(jwt_parse())
  // 将mongodb实例挂载到上下文
  app.context.mongodbUtil = new MongodbUtil(environment.mongodbUrl, environment.dbname)
  app.context.baseDao = new BaseDao()
  routerConfig(router);
  app.use(corsConfig())
  app.use(bodyParser())
  //   app.use(koaBody({
  //     multipart: true,
  //     formidable: {
  //         maxFileSize: 10*1024*1024    // 设置上传文件大小最大限制，默认2M
  //     }
  // }));
  app.use(router.routes()); /*启动路由*/
  app.use(router.allowedMethods());
  app.listen(environment.port);

  const socketServer = new SocketServer();

  socketServer.start();
  console.log("server in run");
}
startApp();