const express = require('express')

var port = process.env.PORT || 5500
var app = express()

app.use(express.static('./'))

app.get('/hello', function(req, res) {
  res.send({
    msg: 'Hello from server at ' + new Date(),
  })
})

app.listen(port, () => {
  console.log('Server running on port: ' + port)
})
