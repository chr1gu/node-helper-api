var express = require('express');
var router = express.Router();

/* GET pdf */
router.get('/', function(req, res, next) {
  
    var pdf = require('html-pdf');
    var options = { format: 'Letter' };
    
    var html = req.param('html');
    if (html) {
        return pdf.create(html, options).toBuffer(function(err, buffer){
            if (err) {
                return res.status(500).send({ error: 'Something went wrong! ' + err });
            }
            res.contentType("application/pdf");
            res.send(buffer);
        });
    }
    
    var request = require('request');
    var url = req.param('url');
    
    if (!url) {
        return res.status(500).send({ error: 'Url not provided' });
    }
    
    request.get(url, function (error, response, body) {
        if (error || response.statusCode != 200) {
            return res.status(500).send({ error: 'Could not read ' + url + '. ' + error });
        }
        pdf.create(body, options).toBuffer(function(err, buffer){
            if (err) {
                return res.status(500).send({ error: 'Something went wrong! ' + err });
            }
            res.contentType("application/pdf");
            res.send(buffer);
        });
    });
});

/* POST pdf */
router.post('/', function(req, res, next) {
  
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  
    var pdf = require('html-pdf');
    var options = { format: 'Letter' };
    var html = req.param('html');
    
    if (!html) {
        return res.status(500).send({ error: 'Html not provided' });
    }
    
    pdf.create(html, options).toBuffer(function(err, buffer){
        if (err) {
            return res.status(500).send({ error: 'Something went wrong! ' + err });
        }
        res.contentType("application/pdf");
        res.send(buffer);
    });
});

module.exports = router;
