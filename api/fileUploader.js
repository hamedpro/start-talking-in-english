var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var fs = require('fs')
var cors = require('cors')
var express = require('express')

var app = express()
app.use(cors())

app.post('/upload',(req,res)=>{
    // parse a file upload
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
      console.log(JSON.stringify(files))
      var dir = __dirname + "/uploaded_files/"
      if(!fs.existsSync(dir)){
        fs.mkdirSync(dir)
      }
      fs.copyFileSync(files.file[0]["path"], dir + req.query.podcast_id + ".mp3")
      //above line's paths are relative to path of stating server so take care 
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write(
        `<script>
          window.alert('file uploaded successfuly and you will be redirected to root page of website');
          window.location.replace('http://localhost:3000')
        </script>`
      );
      res.end();
    });
    return;
})
app.listen(8000)