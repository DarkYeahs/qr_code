const LoginDao = require('../dao/loginDao');
const url = require('url')
const timeTools = require('../common/time')
/* GET users listing. */
let loginDao = new LoginDao();
class LoginService {
  login (req, res) {
    let body = req.body
    let account = body.email
    let password = body.password
    let promise = new Promise(function(resolve, reject) {
      loginDao.login(account, password).then(function(result) {
        let code = false
        if (result.length !== 0) code = true
        resolve(result)
      }, function (err) {
        reject(err)
      });
    })
    return promise
  }
  logout () {

  }
  autologin () {

  }
  registry (req, res) {
    let body = req.body
    let account = body.account
    let password = body.password
    let promise = new Promise(function(resolve, reject) {
      loginDao.registry(account, password).then(function(result) {
        resolve(result)
      }, function (err) {
        reject(err)
      });
    })
    return promise
  }
}
let loginService = new LoginService()
module.exports = loginService;
