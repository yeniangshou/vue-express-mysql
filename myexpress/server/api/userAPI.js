var models = require('../db');
var express = require('express');
var mysql  = require('mysql');
var sqlMap  = require('../sqlMap');

let router = express.Router();

// 连接数据库
let conn = mysql.createConnection(models.mysql);
// 连接数据库
conn.connect();

const  jsonWrite = function(res, sqlResult) {
    if(typeof sqlResult === 'undefined') {
      res.json({
        code: '1',
        msg: '操作失败'
      });
    } else {
      res.json(sqlResult);
    }
  };


  router.post('/addUser', (req,res)=>{
    let sql = sqlMap.user.add;
    let params = req.body;
    console.log('params',params);
    conn.query(sql, [params.name, params.age],(err, sqlResult)=>{
        if(err){
            console.log('添加失败'+err);
        }

        if(res){
            jsonWrite(res, sqlResult)
        }
    })
  })


  module.exports =  router;