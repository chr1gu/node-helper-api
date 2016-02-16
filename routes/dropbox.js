var express = require('express');
var router = express.Router();

// verification requests
router.get('/webhooks', function(req, res, next) {
    var challenge = req.param('challenge');
    res.send(challenge);
});

module.exports = router;
