let http = require('http');
let url = require('url');
let GtfsRealtimeBindings = require('gtfs-realtime-bindings');

// Create http server.
let httpServer = http.createServer(function (req, resp) {
    // Get client request url.
    let reqUrlString = req.url;
    // Get client request path name.
    let pathName = url.parse(reqUrlString, true, false).pathname;
    // If request login action.
    //if ('/login' == pathName) {
        // Get request method.
        let method = req.method;
        if ("POST" === method) {
            var postData = '';
            // Get all post data when receive data event.
            req.on('data', function (chunk) {
                postData += chunk;
            });

            // When all request post data has been received.
            req.on('end', function () {
                console.log("Client post data : " + postData);
                let feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(postData);
                feed.entity.forEach(function(entity) {
                    console.log("Vehicle " + entity.vehicle.vehicle.label);
                    if (entity.tripUpdate) {
                        console.log("Boom " + entity.tripUpdate);
                    }
                });
            })
        }
    //}
});

// Http server listen on port 3333.
let port = 3333;
httpServer.listen(port);
console.log("Server is started.");