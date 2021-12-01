const router = require('koa-router')();
const userService =require('../contorller/mysqlConfig');

router.prefix('/api/user'); // 这里路由中间件，分组模块;


router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/query', async(ctx, next)=>{
    let params = ctx.request.body;
    await userService.findUserData(params).then((data)=>{
        ctx.body = data
    })
})

router.post('/del', async(ctx, next)=>{
    let params = ctx.request.body;
    await userService.delUserData(params).then((data)=>{
        if(data.affectedRows!=0){
            ctx.body = {
                code: '0'
            }
        } else {
            ctx.body = {
                code: 'GU-500'
            }
        }
    })
})

router.post('/addUser', async(ctx, next)=>{
    let params = ctx.request.body;
    await userService.addUserData(params).then((data)=>{
        if(data.affectedRows!=0){
            ctx.body = {
                code: '0'
            }
        } else {
            ctx.body = {
                code: 'GU-500'
            }
        }
       
    })
})


module.exports = router
