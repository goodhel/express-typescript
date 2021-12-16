import { createServer } from './app'
import { connect } from './db/conn'
// import { connectToServer } from './db/conn'

const port = 5001

// Start server
const app = createServer()
connect()
app.listen(port, () => console.log(`Server is listening on port ${port}!`))

// connectToServer(function (err: any) {
//   if (err) {
//     console.error(err)
//     process.exit()
//   }

//   // start the Express server
//   app.listen(port, () => console.log(`Server is running on port: ${port}`))
// })
