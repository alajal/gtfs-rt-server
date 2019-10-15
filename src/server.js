let http = require('http');
let GtfsRealtimeBindings = require('gtfs-realtime-bindings');

let port = 3333;
http.createServer(function (request, res) {
    //res.writeHead(200, {'Content-Type': 'application/json'});
    res.write('Server is started.');
    res.end();
    if ("POST" === request.method) {
        let postData = '';
        // Get all post data when receive data event.
        request.on('data', function (chunk) {
            postData += chunk;
        });

        // When all request post data has been received.
        request.on('end', function () {
            console.log("Client post data : " + postData);
            try {
                let feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(postData);
                console.log();
                feed.entity.forEach(function (entity) {
                    console.log("Vehicle " + entity.vehicle.vehicle.label);
                });
            } catch (e) {
                console.log("Something went wrong: ", e);
            }

        })
    }
}).listen(port);
