const http = require("http");

const server = http.createServer((req, res)=>{
    console.log(req.method);
    // if(req.method == 'post'){
    //     let postData ='';
    //     res.on('data', chunk=>{
    //         postData+=chunk;
    //     });

    //     req.on('end',()=>{
    //         console.log('postData', postData);
    //         res.end('参数'+postData);
    //     })
    // }
    res.end('参数');
});

server.listen(8000,()=>{
    console.log("post请求node处理。");
})