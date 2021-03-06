var express = require('express');
var router = express.Router();
/* GET home page. */
var userService = require('../services/user')
router.get('/getuserinfo', function(req, res, next) {
  userService.getUserMsg(req, res).then(function(result) {
    if (result) res.json({
      code: 0,
      msg: 'success'
    })
    else res.json({
      code: '400404',
      msg: '没有该用户'
    })
  }, err => {
     res.json({
      code: 500,
      msg: '服务器错误'
    })
  })
});

router.post('/editUserInfo', function(req, res, next) {
  userService.editUserInfo(req, res).then(function(result) {
    if (result) res.json({
      code: 0,
      msg: 'success'
    })
    else res.json({
      code: '400404',
      msg: '没有该用户'
    })
  }, function(err) {
     res.json({
      code: 500,
      msg: '服务器错误'
    })
  })
})

module.exports = router;
