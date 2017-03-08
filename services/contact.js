const ContactDao = require('../dao/contactDao');
const url = require('url')
const timeTools = require('../common/time')
/* GET users listing. */
let contactDao = new ContactDao();
class ContactService {
  addContactUserList (req, res) {
    let body = req.body
    let contactMsg = {}
    let promise = new Promise(function(resolve, reject) {
      contactDao.add(contactMsg).then(function(result) {
        let code = false
        if (result.length !== 0) code = true
        resolve(code)
      }, function (err) {
        reject(err)
      });
    })
    return promise
  }
  delContactUserList (req, res) {
    let body = req.body
    let cuid = body.cuid
    let promise = new Promise(function(resolve, reject) {
      contactDao.del(cuid).then(function(result) {
        let code = false
        if (result.length !== 0) code = true
        resolve(code)
      }, function (err) {
        reject(err)
      });
    })
    return promise
  }
  editContactUserList (req, res) {
    let body = req.body
    let contactId = body.cuid
    let contactMsg = {}
    let promise = new Promise(function(resolve, reject) {
      contactDao.update(contactMsg, contactId).then(function(result) {
        let code = false
        if (result.length !== 0) code = true
        resolve(code)
      }, function (err) {
        reject(err)
      });
    })
    return promise
  }
  getContactUserList (req, res) {
    let body = req.body
    let searchs = {}
    let promise = new Promise(function(resolve, reject) {
      contactDao.select(searchs).then(function(result) {
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
let contactService = new ContactService()
module.exports = contactService;
