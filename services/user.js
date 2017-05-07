const UserDao = require('../dao/userDao');
const url = require('url')
const timeTools = require('../common/time')
/* GET users listing. */
let userDao = new UserDao();
class UserService {
  addUserList (req, res) {
    let body = req.body
    let userMsg = {}
    if (body.name) userMsg.name = body.name
    if (body.mobile) userMsg.mobile = body.mobile
    if (body.homepage) userMsg.homepage = body.homepage
    if (body.home_address) userMsg.home_address = body.home_address
    if (body.company_address) userMsg.company_address = body.company_address
    if (body.email) userMsg.email = body.email
    if (body.job) userMsg.job = body.job
    if (body.company) userMsg.company = body.company
    if (body.remark) userMsg.remark = body.remark
    let promise = new Promise(function(resolve, reject) {
      userDao.add(userMsg).then(function(result) {
        let code = false
        if (result.length !== 0) code = true
        resolve(code)
      }, function (err) {
        reject(err)
      });
    })
    return promise
  }

  editUserInfo (req, res) {
    let body = req.body
    let contactId = body.id
    let password = "";
    let userMsg = {}
    if (body.name) userMsg.name = body.name
    if (body.mobile) userMsg.mobile = body.mobile
    if (body.homepage) userMsg.homepage = body.homepage
    if (body.home_address) userMsg.home_address = body.home_address
    if (body.company_address) userMsg.company_address = body.company_address
    if (body.email) userMsg.email = body.email
    if (body.job) userMsg.job = body.job
    if (body.company) userMsg.company = body.company
    if (body.remark) userMsg.remark = body.remark
    if (body.password) password = body.password
    if (body.newpassword) userMsg.password = body.newpassword
    let promise = new Promise(function(resolve, reject) {
      userDao.update(userMsg, contactId, password).then(function(result) {
        let code = false
        if (result.length !== 0) code = true
        resolve(code)
      }, function (err) {
        reject(err)
      });
    })
    return promise
  }

  getUserMsg (req, res) {
    let body = req.body
    let searchs = {}
    searchs.uid = body.uid
    let promise = new Promise(function(resolve, reject) {
      userDao.select(searchs).then(function(result) {
        let code = false
        if (result.length !== 0) code = true
        resolve(code)
      }, function (err) {
        reject(err)
      });
    })
    return promise
  }
}
let userService = new UserService()
module.exports = userService;
