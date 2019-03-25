const FastdfsUtil = require('../src/utils/fastDFS.util')
function User() {
  const getUser = function () {
    return 'aa'
  };
  this.path = [
    {
      fun:getUser
    }
  ]
}

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://47.100.166.151:27017/rent';
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log('数据库已创建');
//     var dbase = db.db("runoob");
//     dbase.createCollection('user', function (err, res) {
//         if (err) throw err;
//         console.log("创建集合!");
//         db.close();
//     });
// });

console.log(new User().path[0].fun())
new FastdfsUtil().upload()