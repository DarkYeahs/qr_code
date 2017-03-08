const sql = require('../sql/sql');
class LeagueDao {
  constructor () {
    // console.log(this.getLeagueList)
  }
  login (account, password) {
    let promise = new Promise(function(resolve, reject) {
      let condition = ''
      condition += "account='" + account + "'"
      condition += " and password='" + password + "'"
      sql.table('user').field('account,password, userid').condition(condition).select().then(results => {
        resolve(results);
      }, err => {
        reject(err);
      })
    });
    return promise;
  }

  registry (account, password) {
    let promise = new Promise(function(resolve, reject) {
      sql.table('user').field('account,password, userid').condition().select().then(results => {
        resolve(0);
      }, err => {
        reject(err);
      })
    });
    return promise;
  }
}

module.exports = LeagueDao;
