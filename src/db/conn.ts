import { Db, MongoClient } from 'mongodb'
const connectionString = 'mongodb://localhost:27017/?maxPoolSize=20&w=majority'
const client = new MongoClient(connectionString)

// let dbConnection: any

export const connect = async () => {
  try {
    // Connect the client to the server
    await client.connect()
    // Establish and verify connection
    db = client.db('testdb')
    console.log('Connected successfully to server')
  } catch (err) {
    console.log(err)
  }
}

export let db: Db

export const Close = client

// export const connectToServer = (callback: any) => {
//   client.connect(function (err: any, db: any) {
//     if (err || !db) {
//       return callback(err)
//     }

//     dbConnection = db.db('testdb')
//     // console.log('Successfully connected to MongoDB.')

//     return callback()
//   })
// }

// export const getDb = () => {
//   return dbConnection
// }
