var http = require("http");
var url = require("url");



var server = http.createServer(async (req, res) => {

let info = url.parse(req.url,true);

let response = await fetch("https://fakestoreapi.com/products");
let data = await response.json();

if(req.method==="GET"){
    if(info.pathname==="/data"){
        res.write(JSON.stringify(data));
        res.end();
    }
    else{
        res.write("error getting in data");
        res.end();
    }
}
});

var port = 3002;

server.listen(port, () => {
    console.log("server started");
});