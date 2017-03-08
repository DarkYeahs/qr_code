var express = require('express');
var router = express.Router();
/* GET home page. */
var contactService = require('../services/contact')
router.get('/getcontactlist', function(req, res, next) {

  res.json({
    code: 0,
    msg: 'success',
    data: 'TEST'
  })
});

router.post('/addcontact', function(req, res, next) {
  contactService.edit(req, res).then(function(result) {
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

router.post('/editcontact', function(req, res, next) {
  contactService.edit(req, res).then(function(result) {
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

router.post('/delcontact', function (req, res, next) {
  contactService.registry(req, res).then(function (result) {
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
