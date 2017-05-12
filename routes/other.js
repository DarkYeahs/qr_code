var express = require('express');
var router = express.Router();
/* GET home page. */
var otherService = require('../services/other')
router.get('/feedback', function(req, res, next) {
  otherService.feedback(req, res).then(function(result) {
    res.json({
      code: 0,
      msg: 'success'
    })
  }, err => {
     res.json({
      code: 500,
      msg: '服务器错误'
    })
  })
});

router.post('/checkVersion', function(req, res, next) {
  otherService.checkVersion(req, res).then(function(result) {
    res.json({
      code: 0,
      msg: 'success'
    })
  }, function(err) {
     res.json({
      code: 500,
      msg: '服务器错误'
    })
  })
})

module.exports = router;
