const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

// var sapcai = require('sapcai').default
// var build = new sapcai.build('545a900b85e3bda24eef99df191cb27a')
// const request = require('superagent')
// var connect = new sapcai.connect('545a900b85e3bda24eef99df191cb27a')

const mailjet = require('node-mailjet').connect(
  '18aaf76dc1ab7f304707bb9ca8001037',
  'd896cef5ace64f03a03d3544b7ae946a',
)

var port = process.env.PORT || 5500
var app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(express.static('./'))

app.post('/mail', function(req, res) {
  const data = req.body.data
  const request = mailjet.post('send', { version: 'v3.1' }).request(data)

  request
    .then(result => {
      res.send(result.body)
    })
    .catch(err => {
      console.log(err.statusCode)
    })
})

app.post('/image', function(req, res) {
  /* const URL_PREFIX = 'https://api.cai.tools.sap/connect/v1/conversations'
  const chatId = req.body.chatId
  const data = req.body.data

  request
    .post(`${URL_PREFIX}/${chatId}/messages`)
    .send({ messages: [data] })
    .set('Authorization', '545a900b85e3bda24eef99df191cb27a')
    .end(function(err, res) {
      console.log('sent')
    }) */
})

app.post('/issue', function(req, res) {
  console.log(req.body.nlp.source)
  debugger
  res.send({
    conversation: {
      memory: {
        issue: {
          value: req.body.nlp.source,
        },
      },
      replies: [
        {
          type: 'text',
          content: req.body.nlp.source,
        },
      ],
    },
  })
})

app.listen(port, () => {
  console.log('Server running on port: ' + port)
})
