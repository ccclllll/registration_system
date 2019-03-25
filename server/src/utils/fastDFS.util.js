var FdfsClient = require('fdfs');

function FastdfsUtil() {
  this.fdfs = new FdfsClient({
    // tracker servers
    trackers: [{
      host: '47.100.166.151',
      port: 22122
    }],
    // 默认超时时间10s
    timeout: 10000,
    // 默认后缀
    // 当获取不到文件后缀时使用
    defaultExt: 'txt',
    // charset默认utf8
    charset: 'utf8'
  });

}
FastdfsUtil.prototype.uploadByUrl = function (url) {

    this.fdfs.upload('C:\\Users\\Administrator\\Pictures\\Screenshots\\timg.jpg').then(function (fileId) {
      // fileId 为 group + '/' + filename
      console.log(fileId);
      //resolve(fileId)
    }).catch(err => {
      //reject(err)
      console.log(err)
    })

}

module.exports = FastdfsUtil