const http = require("http");


const server = http.createServer((req,res)=>{
    console.log(req.method);
    console.log( req.url);
    let url = req.url
    req.query =JSON.stringify(url.split("?")[1]); 
    console.log('req.query', req.query);
    res.end( req.query);
})

server.listen(3000,()=>{
    console.log("制作nodejs");
})
