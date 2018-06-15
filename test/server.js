const http = require('http');
const static = require('node-static');
const file = new static.Server('.');
const dr = require('./paintRolletFrontView');
const fs = require('fs');
const spdf = require('./generatePdf');

http.createServer(function (request, response) {

    if (request.url == '/draws') {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(dr.draww());
    }

    if (request.url == '/save') {
        spdf.savePdf();
        let file = fs.createReadStream('./pdf/draw.pdf');
        let stat = fs.statSync('./pdf/draw.pdf');
        file.pipe(response);
        fs.readFile('./pdf/draw.pdf', function (err, data) {
            response.writeHead(200, {'Content-Type': 'application/pdf'});
            response.send(data);
        });
    }

    response.writeHead(200, {'Content-Type': 'text/plain'});
    file.serve(request, response);

}).listen(8080);

console.log('Server running on port 8080');
