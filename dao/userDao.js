const sql = require('../sql/sql');
class UserDao {
  constructor () {
    // console.log(this.getLeagueList)
  }
  add (usermsg) {
    let promise = new Promise(function(resolve, reject) {
      sql.table('user').add(usermsg).then(results => {
        resolve(results);
      }, err => {
        reject(err);
      })
    });
    return promise;
  }

  update (values, userid, password) {
    let promise = new Promise(function(resolve, reject) {
      let condition = ''
      if (!userid) throw new Error('userid is null')
      condition += `uid='${userid}'`
      if (password !== "") condition = `${condition} and password = '${password}'`
      sql.table('user').condition(condition).update(values).then(results => {
        resolve(results);
      }, err => {
        reject(err);
      })
    });
    return promise;
  }

  select (field, values) {
    let promise = new Promise(function(resolve, reject) {
      let condition = []
      for(let item in values) {
        let items = values[items]
        if (typeof items === 'string') items = `'${items}'`
        condition.push(`${item}=${items}`)
      }
      condition.join(' and ')
      sql.table('user').field(field).condition(condition).select().then(results => {
        resolve(results);
      }, err => {
        reject(err);
      })
    });
    return promise;
  }
}

module.exports = UserDao;
