const ContactDao = require('../dao/contactDao')
const url = require('url')
const fs = require("fs")
const timeTools = require('../common/time')
/* GET users listing. */
let contactDao = new ContactDao();
class ContactService {
  addContactUserList (req, res) {
    let body = req.body
    let contactMsg = {}
    if (body.cuid) contactMsg.cuid = body.cuid
    contactMsg.name = body.name || ''
    contactMsg.mobile = body.mobile || ''
    contactMsg.homepage = body.homepage || ''
    contactMsg.home_address = body.home_address || ''
    contactMsg.company_address = body.company_address || ''
    contactMsg.email = body.email || ''
    contactMsg.job = body.job || ''
    contactMsg.company = body.company || ''
    contactMsg.remark = body.remark | ''
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
    let id = body.id
    let promise = new Promise(function(resolve, reject) {
      contactDao.del(id).then(function(result) {
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
    let contactId = body.id
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
    let urlParse = url.parse(req.url, true);
    let query = urlParse.query;
    let searchs = {}
    if (query.cuid) searchs.cuid = query.cuid
    console.log('search', searchs)
    let promise = new Promise(function(resolve, reject) {
      contactDao.select(searchs).then(function(result) {
      console.log('result', result);
        let code = false
        if (result.length !== 0) code = true
        resolve(result)
      }, function (err) {
        console.log(err)
        reject(err)
      });
    })
    return promise
  }
}
let contactService = new ContactService()
module.exports = contactService;
