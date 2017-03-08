class TimeTools {
  getTimeDetail (time) {
    let date = new Date(time*1000)
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDay()
    return `${year}-${month}-${day}`
  }
}

let timeTools = new TimeTools()

module.exports = timeTools
