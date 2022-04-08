import { Db, MongoClient } from 'mongodb'

let _db: Db

const mongoConnect = (callbackOnConnection: (message: string) => void): void => {
  const url = process.env.MONGO_URL
  if (url !== undefined) {
    MongoClient.connect(url).then(client => {
      _db = client.db()
      callbackOnConnection('DB connected')
    }).catch(err => console.error(err))
  } else {
    throw new Error('DB connection string not specified!')
  }
}

const getDB = (): Db => {
  if (_db != null) {
    return _db
  }
  throw new Error('DB not found!')
}

export {
  mongoConnect,
  getDB
}
