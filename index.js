const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

const { Translate } = require('@google-cloud/translate').v2

const mailjet = require('node-mailjet').connect(
  '18aaf76dc1ab7f304707bb9ca8001037',
  'd896cef5ace64f03a03d3544b7ae946a',
)

var port = process.env.PORT || 5500
var app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(express.static('./dist'))

const translate = new Translate({
  key: 'AIzaSyB-Ai9mav72daWPO9z1fv55WJ7__9dyNEk',
})

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

app.post('/convert_initial', async ({ body }, res) => {
  const message = body.message
  const language = body.language

  try {
    const output = await translate.translate(message, language)
    res.status(200).send(output)
  } catch (err) {
    res.status(400).send(err)
  }
})

app.listen(port, () => {
  console.log('Server running on port: ' + port)
})
