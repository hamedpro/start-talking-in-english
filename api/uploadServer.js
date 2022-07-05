var express = require('express')
var formidable = require('formidable');
var fs = require('fs');
var cors = require('cors')

var app = express()
app.use(cors())

app.all('/',(req,res)=>{
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files){
    var oldpath = files.filetoupload.filepath;
    var newpath =  "./" + files.filetoupload.originalFilename;
    fs.copyFile(oldpath, "./" + newpath, function (err) {
      if (err) throw err;
      res.write('File was uploaded!');
      res.end();
    })
  })  
})

app.listen(2000,()=>{
  console.log('app started listening on port 2000 ')
})