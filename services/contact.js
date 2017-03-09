const ContactDao = require('../dao/contactDao');
const url = require('url')
const timeTools = require('../common/time')
/* GET users listing. */
let contactDao = new ContactDao();
class ContactService {
  addContactUserList (req, res) {
    let body = req.body
    let contactMsg = {}
    if (body.name) contactMsg.name = body.name
    if (body.mobile) contactMsg.mobile = body.mobile
    if (body.homepage) contactMsg.homepage = body.homepage
    if (body.home_address) contactMsg.home_address = body.home_address
    if (body.company_address) contactMsg.company_address = body.company_address
    if (body.email) contactMsg.email = body.email
    if (body.job) contactMsg.job = body.job
    if (body.company) contactMsg.company = body.company
    if (body.remark) contactMsg.remark = body.remark
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
    if (body.name) contactMsg.name = body.name
    if (body.mobile) contactMsg.mobile = body.mobile
    if (body.homepage) contactMsg.homepage = body.homepage
    if (body.home_address) contactMsg.home_address = body.home_address
    if (body.company_address) contactMsg.company_address = body.company_address
    if (body.email) contactMsg.email = body.email
    if (body.job) contactMsg.job = body.job
    if (body.company) contactMsg.company = body.company
    if (body.remark) contactMsg.remark = body.remark
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
    if (body.name) searchs.name = body.name
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
