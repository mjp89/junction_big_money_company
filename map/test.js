var path = require('path');
var express = require('express');
var app = express();
var fs = require('fs');

var dir = path.join(__dirname, './');

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/cpg'
};

app.get('*', function (req, res) {
    var file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
    console.log('req' + req.path )
    //if (file.indexOf(dir + path.sep) !== 0) {
    //    return res.status(403).end('Forbidden');
    //}
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function (e) {
    	console.log("e" + e)
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});

app.listen(3000, function () {
    console.log('Listening on http://localhost:3000/');
});


/*var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.sendfile('index.html');
});
app.get('/shape/FI_MTC_WGS84_update.cpg', function (req, res) {
  res.sendfile('./shape/FI_MTC_WGS84_update.cpg');
});

/*
app.get('/shape', function(req, res){
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {

        // check if response is success
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }

        response.pipe(file);

        file.on('finish', function() {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    });

    // check for request error too
    req.on('error', function (err) {
        fs.unlink(dest);
        return cb(err.message);
    });

    file.on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result) 
        return cb(err.message);
    });
});
*/


/*
app.listen(3000, function () { 

});
*/