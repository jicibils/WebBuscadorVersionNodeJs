const express = require('express');
const path    = require("path");
var querystring = require('querystring');
var json = require('./../public/storage/data/data.json')

module.exports = {

  mostrarTodo: function() {
    var listaPublicaciones = []
    var publicaciones = json.filter(function(publi) {
      listaPublicaciones.push(publi)
    })[0]
    return listaPublicaciones
  },

  filtrarPorCiudad: function(ciudad) {
    var listaPublicaciones = []
    var publicaciones = json.filter(function(publi) {
      if (publi.Ciudad == ciudad) {
        listaPublicaciones.push(publi)
      }
    })[0]
    return listaPublicaciones
  },

  filtrarPorTipo: function(tipo) {
    var listaPublicaciones = []
    var publicaciones = json.filter(function(publi) {
      if (publi.Tipo == tipo) {
        listaPublicaciones.push(publi)
      }
    })[0]
    return listaPublicaciones
  },

  filtrarPorCiudadYTipo: function(ciudad,tipo) {
    var listaPublicaciones = []
    var publicaciones = json.filter(function(publi) {
      if ((publi.Ciudad == ciudad)&&(publi.Tipo == tipo)) {
        listaPublicaciones.push(publi)
      }
    })[0]
    return listaPublicaciones
  },

  filtrarPorPrecio: function(precios) {
    var listaPublicaciones = []
    var separador1 = "$"
    var arregloDePrecios = ""

    var publicaciones = json.filter(function(publi) {
      var arregloDePrecios = publi.Precio.split(separador1)
      var precioFinal = arregloDePrecios[1].replace(/,/,"")
      precioFinal = parseInt(precioFinal)
      precios[0] = parseInt(precios[0])
      precios[1] = parseInt(precios[1])

      if ((precioFinal >= precios[0])&&(precioFinal <= precios[1])) {
        listaPublicaciones.push(publi)
      }
    })[0]
    return listaPublicaciones
  },

  filtrarPorCiudadYPrecio: function(ciudad,precios) {
    var listaPublicaciones = []
    var separador1 = "$"
    var arregloDePrecios = ""

    var publicaciones = json.filter(function(publi) {
      var arregloDePrecios = publi.Precio.split(separador1)
      var precioFinal = arregloDePrecios[1].replace(/,/,"")
      precioFinal = parseInt(precioFinal)
      precios[0] = parseInt(precios[0])
      precios[1] = parseInt(precios[1])

      if ((publi.Ciudad == ciudad)&&((precioFinal >= precios[0])&&(precioFinal <= precios[1]))) {
        listaPublicaciones.push(publi)
      }
    })[0]
    return listaPublicaciones
  },

  filtrarPorTipoYPrecio: function(tipo,precios) {
    var listaPublicaciones = []
    var separador1 = "$"
    var arregloDePrecios = ""

    var publicaciones = json.filter(function(publi) {
      var arregloDePrecios = publi.Precio.split(separador1)
      var precioFinal = arregloDePrecios[1].replace(/,/,"")
      precioFinal = parseInt(precioFinal)
      precios[0] = parseInt(precios[0])
      precios[1] = parseInt(precios[1])
      if ((publi.Tipo == tipo)&&((precioFinal >= precios[0])&&(precioFinal <= precios[1]))) {
        listaPublicaciones.push(publi)
      }
    })[0]
    return listaPublicaciones
  },

  filtrarPorCiudadTipoYPrecio: function(ciudad,tipo,precios) {
    var listaPublicaciones = []
    var separador1 = "$"
    var arregloDePrecios = ""

    var publicaciones = json.filter(function(publi) {
      var arregloDePrecios = publi.Precio.split(separador1)
      var precioFinal = arregloDePrecios[1].replace(/,/,"")
      precioFinal = parseInt(precioFinal)
      precios[0] = parseInt(precios[0])
      precios[1] = parseInt(precios[1])
      if ((publi.Ciudad == ciudad)&&(publi.Tipo == tipo)&&((precioFinal >= precios[0])&&(precioFinal <= precios[1]))) {
        listaPublicaciones.push(publi)
      }
    })[0]
    return listaPublicaciones
  },


  filtrar: function(data) {
    var data = querystring.parse(data)
    var ciudad = data.ciudad
    var tipo = data.tipo
    var rangoPrecio = data.precio
    if (rangoPrecio == "") {
      if ((ciudad == "")&&(tipo == "")&&(rangoPrecio == "")) {
        var resultado = this.mostrarTodo()
      }
    }else {
      var separador = ";"
      var arregloDePrecios = rangoPrecio.split(separador);

      if ((ciudad == "")&&(tipo == "")&&(arregloDePrecios[0]==0)&&(arregloDePrecios[1]==100000)) {
        var resultado = this.mostrarTodo()
      }

      if ((ciudad != "")&&(tipo == "")&&(arregloDePrecios[0]==0)&&(arregloDePrecios[1]==100000)) {
        var resultado = this.filtrarPorCiudad(ciudad)
      }

      if ((ciudad == "")&&(tipo != "")&&(arregloDePrecios[0]==0)&&(arregloDePrecios[1]==100000)) {
        var resultado = this.filtrarPorTipo(tipo)
      }

      if ((ciudad == "")&&(tipo == "")&&((arregloDePrecios[0]!=0)||(arregloDePrecios[1]!=100000))) {
        var resultado = this.filtrarPorPrecio(arregloDePrecios)
      }

      if ((ciudad != "")&&(tipo != "")&&(arregloDePrecios[0]==0)&&(arregloDePrecios[1]==100000)) {
        var resultado = this.filtrarPorCiudadYTipo(ciudad,tipo)
      }

      if ((ciudad != "")&&(tipo == "")&&((arregloDePrecios[0]!=0)||(arregloDePrecios[1]!=100000))) {
        var resultado = this.filtrarPorCiudadYPrecio(ciudad,arregloDePrecios)
      }

      if ((ciudad == "")&&(tipo != "")&&((arregloDePrecios[0]!=0)||(arregloDePrecios[1]!=100000))) {
        var resultado = this.filtrarPorTipoYPrecio(tipo,arregloDePrecios)
      }

      if ((ciudad != "")&&(tipo != "")&&((arregloDePrecios[0]!=0)||(arregloDePrecios[1]!=100000))) {
        var resultado = this.filtrarPorCiudadTipoYPrecio(ciudad,tipo,arregloDePrecios)
      }

    }

    return (JSON.stringify(resultado));
  }
}
