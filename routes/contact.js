var express = require('express');
var router = express.Router();
/* GET home page. */
var contactService = require('../services/contact')
router.get('/getcontactlist', function(req, res, next) {
  contactService.getContactUserList(req, res).then(function(result) {
    console.log(result);
    res.json({
      code: 0,
      msg: 'success',
      data: result
    })
  }, function (err) {
    res.json({
      code: 500,
      msg: '服务器错误'
    })
  })
});

router.post('/addcontact', function(req, res, next) {
  contactService.addContactUserList(req, res).then(function(result) {
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

router.post('/editcontact', function(req, res, next) {
  contactService.editContactUserList(req, res).then(function(result) {
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

router.post('/delcontact', function (req, res, next) {
  contactService.delContactUserList(req, res).then(function (result) {
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
