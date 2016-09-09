var express = require('express')
var path = require('path')

var app = express()
var router = express.Router();

// serve our static stuff like index.css
app.use(express.static(__dirname))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

var PORT = 8081
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})

