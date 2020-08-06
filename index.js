const express = require('express')
var bodyParser = require('body-parser')
var sapcai = require('sapcai').default

var connect = new sapcai.connect('545a900b85e3bda24eef99df191cb27a')

var port = process.env.PORT || 5500
var app = express()
app.use(express.json())

app.use(express.static('./'))

app.post('/image', function(req, res) {
  const URL = req.body.url
  res.send({
    replies: [
      {
        type: 'picture',
        content:
          'https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg',
      },
    ],
  })
})

app.listen(port, () => {
  console.log('Server running on port: ' + port)
})
