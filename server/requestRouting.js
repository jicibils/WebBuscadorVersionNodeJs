var express = require('express')
var path = require('path')
// var body_parser = require('body-parser')
var querystring = require('querystring');
var Buscador = require('./../server/buscador.js')

var Router = express.Router()
var dataString = ""

var viewsPath = path.join(__dirname, '../') + 'public/'
var viewsPath = path.resolve(__dirname, '../')+ '/public/'; //path.join(__dirname, 'public'); también puede ser una opción
Router.use(express.static(viewsPath));

Router.get('/', function(req, res) {
  res.sendFile(viewsPath + 'index.html')
})

Router.post('/', function(req, res) {
  req
     .on('data', function(data) {
       dataString += data;
     })
     .on('end',function() {
       res.end(Buscador.filtrar(dataString))
       dataString=""
     })
})


Router.all('*', function(req, res) {
  res.send('No se encontro el recurso solicitado')
  res.end()
})

module.exports = Router
