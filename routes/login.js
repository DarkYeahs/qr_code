var express = require('express');
var router = express.Router();
/* GET home page. */
var loginService = require('../services/login')
router.get('/', function(req, res, next) {

  res.json({
    code: 0,
    msg: 'success',
    data: 'TEST'
  })
});

router.post('/', function(req, res, next) {
  loginService.login(req, res).then(function(result) {
    if (result) res.json({
      code: 0,
      msg: 'success'
    })
    else res.json({
      code: '400404',
      msg: '没有该用户'
    })
  }, function(err) {
    console.log(err)
  })
})

router.post('/registry', function (req, res, next) {
  loginService.registry(req, res).then(function (result) {
    if (result === 0) res.json({
      code: 0,
      msg: 'success'
    })
    else res.json({
        code: 400,
        msg: 'fail'
      })
  })
})

module.exports = router;
