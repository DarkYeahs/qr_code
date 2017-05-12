var express = require('express');
var router = express.Router();
/* GET home page. */
var loginService = require('../services/login')
router.get('/', function(req, res, next) {
  console.log("访问成成功");
  res.json({
    code: 0,
    msg: 'success',
    data: 'TEST'
  })
});

router.post('/', function(req, res, next) {
  loginService.login(req, res).then(function(result) {
    if (result.length !== 0) res.json({
      code: 0,
      msg: 'success',
      data: result
    })
    else res.json({
      code: 400404,
      msg: '没有该用户'
    })
  }, function(err) {
     res.json({
      code: 500,
      msg: '服务器错误'
    })
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
router.post('/autologin', function (req, res, next) {
  loginService.autologin(req, res).then(function (result) {
    console.log(result)
    if (result.length !== 0) res.json({
      code: 0,
      msg: 'success'
    })
    else res.json({
        code: 400,
        msg: 'fail'
      })
  })
})

router.post('/forgetpassword', function (req, res, next) {
  loginService.forgetpassword(req, res).then(function (result) {
    console.log(result)
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
