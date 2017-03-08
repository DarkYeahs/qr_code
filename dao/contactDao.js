const sql = require('../sql/sql');
class ContactDao {
  constructor () {
    // console.log(this.getLeagueList)
  }
  add (contactMsg) {
    let promise = new Promise(function(resolve, reject) {
      sql.table('contact_user').add(contactMsg).then(results => {
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
      condition += `cuid=${contactId}`
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
      if (!contactid) throw new Error('contactId is null')
      condition += `cuid=${contactId}`
      sql.table('contact_user').condition(condition).update(values).then(results => {
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
      sql.table('contact_user').field(field).condition(condition).select().then(results => {
        resolve(results);
      }, err => {
        reject(err);
      })
    });
    return promise;
  }
}

module.exports = ContactDao;
