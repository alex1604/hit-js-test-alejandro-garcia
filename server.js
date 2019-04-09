const express = require('express')
const server = express()
const fs = require("fs");
const request = require("request-promise-native");

async function downloadPDF(pdfURL, outputFilename) {
    let pdfBuffer = await request.get({uri: pdfURL, encoding: null});
    console.log("Writing downloaded PDF file to " + outputFilename + "...");
    fs.writeFileSync(outputFilename, pdfBuffer);
};

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.get('/save?', function(req, res){
    console.log('server called')
    var file = req.query.file;
    var name = req.query.fileName
    downloadPDF(file, name)
    res
        .send('done')
        .end()
  });

server.get('/download?', function(req, res){
    var file = req.query.fileName;
    console.log('downloading ', file)
    res
        .download(file)
        // Set disposition and send it.
  });

  const port = 3001;
  server.listen(port, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:' + port)
  });