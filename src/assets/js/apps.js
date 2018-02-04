var express = require('express');
var app = express();
var pdf = require('phantom-html2pdf');

app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('This is your start page');
})

app.get('/htmlToPdf', function(request, response) {
  var pathToHtml="contract.html";
  var options={
    "html" : pathToHtml,
    "css" : "style.css",
    "paperSize" :{format: 'A4', orientation: 'portrait', border: '1cm'}
  }
  var pdfFileName="contract.pdf";
  var pathToPdf=__dirname +'/files/'+pdfFileName;
  pdf.convert(options, function(err, result) {
      if(err){
        response.send('Cannot convert html to pdf');
      }
      result.toBuffer(function(returnedBuffer) {});
      var stream = result.toStream();
      var tmpPath = result.getTmpPath();
      result.toFile(pathToPdf, function() {
        response.download(pathToPdf);
      });
    });
})

app.listen(app.get('port'),"172.104.167.150", function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})