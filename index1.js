var http = require("http");
var url = require("url");


var server = http.createServer(async (req, res) => {
    var info = url.parse(req.url, true);


    let response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();

    console.log(info.query.order);
    console.log(info.query.cat);

    if (req.method === "GET") {

        if (info.query.order === "asc") {

            var sorted = data.sort((a, b) => {
                return a.price - b.price;
            })
            // console.log(sorted)

            if (info.query.cat === "m") {
                var filter = sorted.filter((ele) => {
                    return ele.category === "men's clothing";
                });
                console.log(filter)
                res.write(JSON.stringify(filter));
                res.end();
            }
            else if (info.query.cat === "w") {
                var filter = sorted.filter((ele) => {
                    return ele.category === "women's clothing";
                });
                res.write(JSON.stringify(filter));
                res.end();

            }
            else {
                res.write(JSON.stringify(sorted));
                res.end();
            }
        }
        else {
            var sorted = data.sort((a, b) => {
                return b.price - a.price;
            });


            if (info.query.cat === "m") {
                var filter = sorted.filter((ele) => {
                    return ele.category === "men's clothing";
                });
                res.write(JSON.stringify(filter))
                res.end();
            }
            else if (info.query.cat === "w") {
                var filter = sorted.filter((ele) => {
                    return ele.category === "women's clothing";
                });
                res.write(JSON.stringify(filter));
                res.end();
            }
            else {
                res.write(JSON.stringify(sorted));
                res.end();
            }

        }

    }
    else {
        res.write("error in getting data");
        res.end();
    }

});

var port = 3001;

server.listen(port, () => {
    console.log("server started");
})