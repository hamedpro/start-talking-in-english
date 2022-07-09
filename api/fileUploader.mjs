import express from 'express';
import formidable from 'formidable'
import fs from "fs"
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h2>With <code>"express"</code> npm package</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});

app.post('/api/upload', (req, res, next) => {
  const form = formidable({ });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    var TempDir = process.env.TEMP

    
    var newFilename = files['someExpressFiles']['newFilename']
    var filepath = process.env.TEMP +`/`+ newFilename
    filepath = filepath.replaceAll(`\\`,`/`)
    var originalFilename = files['someExpressFiles']['originalFilename']

    if(!fs.existsSync('./uploaded_files')){
      fs.mkdirSync('./uploaded_files')
    }
    console.log(process.env.TEMP)
    fs.copyFileSync(filepath,"./uploaded_files")
    fs.renameSync('./uploded_files/'+newFilename,"./uploaded_files/"+originalFilename)
    
  });
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000 ...');
});