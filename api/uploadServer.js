var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files){
    var oldpath = files.filetoupload.filepath;
    var newpath =  "./" + files.filetoupload.originalFilename;
    fs.copyFile(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write('File was uploaded!');
      res.end();
    })
  })  
}).listen(2000);
