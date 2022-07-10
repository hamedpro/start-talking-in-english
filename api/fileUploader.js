var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var fs = require('fs')
http.createServer(function(req, res) {
  if (req.url === '/upload' && req.method === 'POST') {
    // parse a file upload
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.write('received upload:\n\n');
      console.log(JSON.stringify(files))
      fs.copyFileSync(files.upload[0]["path"].replaceAll(`\\`,`/`),__dirname)
      res.end();
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);