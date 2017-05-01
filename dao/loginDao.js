const sql = require('../sql/sql');
let uuid = require('node-uuid');  
class LoginDao {
  constructor () {
    // console.log(this.getLeagueList)
  }
  login (account, password) {
    let promise = new Promise(function(resolve, reject) {
      let condition = ''
      condition += "account='" + account + "'"
      condition += " and password='" + password + "'"
      sql.table('user').field('*').condition(condition).select().then(results => {
        resolve(results);
      }, err => {
        reject(err);
      })
    });
    return promise;
  }
  autologin (uid, password) {
    let promise = new Promise(function(resolve, reject) {
      let condition = ''
      condition += "uid='" + uid + "'"
      condition += " and password='" + password + "'"
      sql.table('user').field('*').condition(condition).select().then(results => {
        resolve(results);
      }, err => {
        reject(err);
      })
    });
    return promise;
  }
  forgetpassword (account, password) {
    let data = {}
    data.password = password
    let condition = ''
    condition += "account='" + account + "'"
    let promise = new Promise(function(resolve, reject) {
      sql.table('user').condition(condition).update(data).then(results => {
        resolve(0);
      }, err => {
        reject(err);
      })
    });
    return promise;
  }
  registry (account, password) {
    let data = {}
    data.account = account
    data.password = password
    data.uid = uuid.v1()
    let promise = new Promise(function(resolve, reject) {
      sql.table('user').insert(data).then(results => {
        resolve(0);
      }, err => {
        reject(err);
      })
    });
    return promise;
  }
}

module.exports = LoginDao;
