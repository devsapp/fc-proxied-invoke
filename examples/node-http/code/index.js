var getRawBody = require('raw-body');



module.exports.initializer = function(context, callback) {
    console.log('initializing');
    console.log('iiiiiiinitializing');
    callback(null, '');
};


module.exports.handler = function(request, response, context) {
    // get requset header
    var reqHeader = request.headers
    var headerStr = ' '
    for (var key in reqHeader) {
        headerStr += key + ':' + reqHeader[key] + '  '
    };

    // get request info
    var url = request.url
    var path = request.path
    var queries = request.queries
    var queryStr = ''
    for (var param in queries) {
        queryStr += param + "=" + queries[param] + '  '
    };
    var method = request.method
    var clientIP = request.clientIP

    // get request body
    getRawBody(request, function (err, data) {
        var body = data
        // you can deal with your own logic here

        // set response
        var respBody = new Buffer('requestHeader:' + headerStr + '\n' + 'url: ' + url + '\n' + 'path: ' + path + '\n' + 'queries: ' + queryStr + '\n' + 'method: ' + method + '\n' + 'clientIP: ' + clientIP + '\n' + 'body: ' + body + '\n')
        response.setStatusCode(200)
        response.setHeader('content-type', 'application/json')
        response.send(respBody)
    })
}
