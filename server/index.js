var http = require('http')
var path = require('path')
var express = require('express')
var Routing = require('./../server/requestRouting.js')
var body_parser = require('body-parser')

var PORT = 8080
var app = express()
var Server = http.createServer(app)

app.use('/', Routing)
app.use(body_parser.urlencoded({extended:true}));


Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})
