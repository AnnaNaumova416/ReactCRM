var express = require('express');
var app = express();
var pdf = require('phantom-html2pdf');
var bodyParser = require('body-parser')


app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', function(request, response) {
  response.send('This is your start page');
})

app.post('/htmlToPdf', function(request, response) {
  var htmlContent=request.body.htmlContent;
  var options={
    "html" : htmlContent,
    "css" : "style.css",
    "paperSize" :{format: 'A4', orientation: 'portrait', border: '1cm'}
  }
  var pdfFileName="contract.pdf";
  var pathToPdf=__dirname +'/files/'+pdfFileName;
  pdf.convert(options, function(err, result) {
    var resObj={};
      if(err){
        resObj={"response": "FAILURE",
                "message": "Pdf not generated"
        }
        response.send(resObj);
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