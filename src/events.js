export default class Events {

  constructor (db) {
    this.db = db
    this.setup()
  }

  setup() {
    console.log('Events.setup > enter');
    let sql = `CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, device VARCHAR(255), type VARCHAR(255), value DOUBLE)`
    this.db.run(sql)
  }
  
  create(device, type, value) {
    console.log('Events.create > enter', device, type, value);
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO events(device, type, value) VALUES(?, ?, ?)`
      this.db.run(sql, [device, type, value], function (err) {
        if (err) {
          reject(err)
          return
        }
        resolve(this.lastID)
      })
    })
  }

  findAll () {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM events`, [], (err, rows ) => {
        if (err) {
          reject(err)
          return
        }
        console.debug('Events.findAll() > exit ', rows.length)
        resolve(rows)
      })
    })
  }

}
