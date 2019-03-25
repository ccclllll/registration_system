var MongoClient = require('mongodb').MongoClient;
const MongodbUtil = function (url, dbname) {
    this.url = url;
    this.dbname = dbname;
}
MongodbUtil.prototype.dbo = function () {
    return new Promise((resolve, reject) => {
        MongoClient.connect(`${this.url}/`, { useNewUrlParser: true }, (err, db) => {
            if (err) reject(err);
            console.log('数据库连接成功！');
            this.db = db;
            resolve(this.db.db(this.dbname));
        });
    })
    // return this.db.db(this.dbname)
}

MongodbUtil.prototype.close = function () {
    this.db.close();
}

module.exports = MongodbUtil;