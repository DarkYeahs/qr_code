const mysql = require('mysql');
// const dbConfig = require('../config/dbconfig');

class Mysql {
  constructor(config) {
    this.pool = ''
    this.tableString = ''
    this.fieldString = ''
    this.conditionString = ''
    // this.init(config)
  }
  init (config) {
    if (!this.pool) this.pool = mysql.createPool(config)
  }
  query(sql) {
    let that = this
    let promise = new Promise(function(resolve, reject) {
      that.pool.getConnection((err, connection) => {
        console.log(sql)
        connection.query(sql, (err, results, field) => {
          if(err) {
            reject(err)
            return;
          }
          resolve(results)
          // 释放连接
				connection.release()
        })
      })
    });
    return promise;
  }
  table(table) {
    console.log('table', table);
    this.tableString = table
    return this;
  }
  field(field) {
    this.fieldString = field;
    return this;
  }
  condition(condition) {
    this.conditionString = condition;
    return this;
  }
  select() {
    console.log('test')
    let sql = `select ${this.fieldString} from ${this.tableString} where 1`;
    console.log(this.conditionString, this.conditionString !== '')
    if (this.conditionString !== '') sql = `${sql} and ${this.conditionString}`;
    return this.query(sql);
  }
  insert(values) {
    if(!(values instanceof Object)) throw Error('values is not Object')
    let keys = []
    let item = []
    for(let i in values) {
      keys.push(i)
      item.push(`'${values[i]}'`)
    }
    keys = keys.join(',')
    item = item.join(',')
    let sql = `insert into ${this.tableString} (${keys}) values (${item})`;
    return this.query(sql);
  }
  update(values) {
    if(!(values instanceof Object)) throw Error('values is not Object')
    let update = []
    for(let i in values) {
      let item = values[i]
      if (typeof item === 'string') item = `'${item}'`
      update.push(`${i}=${item}`)
    }
    update = update.join(',')
    let sql = `update ${this.tableString} set ${update} where 1`;
    if (this.conditionString) sql = `${sql} and ${this.conditionString}`;
    return this.query(sql);
  }
  del() {
    let sql = `delete from ${this.tableString} where 1`;
    if (this.conditionString) sql = `${sql} and ${this.conditionString}`;
    return this.query(sql);
  }
}

let SQL = new Mysql()
module.exports = SQL;
