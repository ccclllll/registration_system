module.exports = class BaseDao {

  async find(dbo, collection, whereStr,all) {
    return new Promise(async (resolve, reject) => {
      if(all){
        dbo.collection(collection).find().toArray(function (err, result) {
          if (err) reject(err);
          resolve(result)
        });
      }else{
        dbo.collection(collection).find(whereStr).toArray(function (err, result) {
          if (err) reject(err);
          resolve(result)
        });
      }

    });
  }


  async delete(dbo, collection, whereStr, many) {
    return new Promise(async (resolve, reject) => {
      if (many) {
        dbo.collection(collection).deleteMany(whereStr, function (err, obj) {
          if (err) throw reject(err);
          resolve(obj)
        });
      } else {
        dbo.collection(collection).deleteOne(whereStr, function (err, obj) {
          if (err) throw reject(err);
          resolve(obj)
        });
      }
    });
  }

  async add(dbo, collection, data) {
    return new Promise(async (resolve, reject) => {
      if (data instanceof Array) {
        dbo.collection(collection).inserMany(data, function (err, result) {
          if (err) reject(err);
          resolve(result)
        });
      } else {
        dbo.collection(collection).insertOne(data, function (err, result) {
          if (err) reject(err);
          resolve(result)
        });
      }
    });
  }

  async update(dbo, collection, whereStr, updateStr, many) {
    return new Promise(async (resolve, reject) => {
      if (many) {
        dbo.collection(collection).updateMany(whereStr, updateStr, function (err, res) {
          if (err) reject(err);
          resolve(res);
        });
      } else {
        dbo.collection(collection).updateOne(whereStr, updateStr, function (err, res) {
          if (err) reject(err);
          resolve(res);
        });
      }

    });
  }
}