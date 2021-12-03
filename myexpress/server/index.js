const userApi = require('./api/userAPI');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
// 获取对req.body参数的处理，放在api路由前面
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// 后端api路由
app.use('/api/user', userApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000.......');