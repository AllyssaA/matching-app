const express = require('express')
const app = express()
const port = 3000

//app responds with "Hello World!" for requests to the root URL
app.get('/', (req, res) => {
  res.send('testing if master changed to main')
})

//starts a server and listens on port 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})