const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true // 多语句查询
});


// 导出对象，里面有操作数据库的方法
module.exports = {
  getValue(req, res, next) {
    var username = req.query.username;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getValue;
      connection.query(sql, [username], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  setValue(req, res, next) {
    console.log(req.body);
    var username = req.body.username,
      password = req.body.password;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.setValue;
      connection.query(sql, [username, password], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  getMark(req, res, next) {
    var username = req.query.username;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getMark;
      connection.query(sql, [username], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  deleteMark(req, res, next) {
    var lng = req.query.lng;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.deleteMark;
      connection.query(sql, [lng], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  insertMark(req, res, next) {
    var username = req.body.username;
    var title = req.body.title;
    var lng = req.body.lng;
    var lat = req.body.lat;
    var address = req.body.address;
    var img = "../static/img/cesuo3.svg"
    pool.getConnection((err, connection) => {
      var sql = sqlMap.insertMark;
      connection.query(sql, [username, title, lng, lat, address, img], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  deleteAdd(req, res, next) {
    var lng = req.query.lng;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.deleteAdd;
      connection.query(sql, [lng], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  

  getAdd(req, res, next) {
    var username = req.query.username;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getAdd;
      connection.query(sql, [username], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  insertAdd(req, res, next) {
    var username = req.body.username;
    var title = req.body.title;
    var lng = req.body.lng;
    var lat = req.body.lat;
    var address = req.body.address;
    var img = "../static/img/cesuo2.svg"
    console.log(username,title,lng,lat,address,img)
    pool.getConnection((err, connection) => {
      var sql = sqlMap.insertAdd;
      connection.query(sql, [username, title, lng, lat, address, img], (err, result) => {
        res.json(result);
        // console.log(result)
        // console.log(err)
        connection.release();
      })
    })
  }
}
