const sql = require('../sql/sql');
class ContactDao {
  constructor () {
    // console.log(this.getLeagueList)
  }
  add (contactMsg) {
    let promise = new Promise(function(resolve, reject) {
      sql.table('contact_user').insert(contactMsg).then(results => {
        resolve(results);
      }, err => {
        reject(err);
      })
    });
    return promise;
  }

  del (contactId) {
    let promise = new Promise(function(resolve, reject) {
      let condition = ''
      if (!contactid) throw new Error('contactId is null')
      condition += `cuid='${contactId}'`
      sql.table('contact_user').condition(condition).del().then(results => {
        resolve(results);
      }, err => {
        reject(err);
      })
    });
    return promise;
  }

  update (values, contactId) {
    let promise = new Promise(function(resolve, reject) {
      let condition = ''
      if (!contactId) throw new Error('contactId is null')
      condition += `id=${contactId}`
      sql.table('contact_user').condition(condition).update(values).then(results => {
        resolve(results);
      }, err => {
        reject(err);
      })
    });
    return promise;
  }

  select (values, field = '*') {
    let promise = new Promise(function(resolve, reject) {
      let condition = []
      for(let item in values) {
        let items = values[item]
        if (typeof items === 'string') {
          items = `'${items}'`
          condition.push(`${item}=${items}`)
        }
      }
      if (condition.length !== 0) condition.join(' and ')
      else condition = ''
      sql.table('contact_user').field(field).condition(condition).select().then(results => {
        console.log('results', results);
        resolve(results);
      }, err => {
        console.log(err)
        reject(err);
      })
    });
    return promise;
  }
}

module.exports = ContactDao;
