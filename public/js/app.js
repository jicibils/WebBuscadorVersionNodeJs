//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 0,
  to: 100000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

function insertarPublicaciones(publicacion){
  $(".lista").empty();
  $.each(publicacion,function(indice,elemento){
    var insertar = `<div class="card horizontal">
              <div class="card-image">
                <img src="img/home.jpg">
              </div>
              <div class="card-stacked">
                <div class="card-content">
                <p class="infoCard"><strong>Direccion: </strong>${elemento.Direccion}</p>
                <p class="infoCard"><strong>Ciudad: </strong>${elemento.Ciudad}</p>
                <p class="infoCard"><strong>Telefono: </strong>${elemento.Telefono}</p>
                <p class="infoCard"><strong>Codigo Postal: </strong>${elemento.Codigo_Postal}</p>
                <p class="infoCard"><strong>Tipo: </strong>${elemento.Tipo}</p>
                <p class="precioTexto">${elemento.Precio}</p>
                </div>
                <div class="card-action right-align">
                  <a href="#">Ver más</a>
                </div>
              </div>
            </div>`
    $(".lista").append(insertar);
  });
}



Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});


function llenarFiltroCiudad(ciudades) {
  var todasLasCiudades = [];
  var todasLasCiudadesSinRepetidos = [];
  var i=0
  $.each(ciudades,function(indice,elemento){
    todasLasCiudades[i] = elemento.Ciudad
    i++
  });

  todasLasCiudadesSinRepetidos = todasLasCiudades.unique()
  for (var i = 0; i < todasLasCiudadesSinRepetidos.length; i++) {
    var insertar = `<option value="${todasLasCiudadesSinRepetidos[i]}">${todasLasCiudadesSinRepetidos[i]}</option>`
    $("#ciudad").append(insertar);
  }
  $(document).ready(function() {
    $('select').material_select();
  });
}

function llenarFiltroTipo(tipos) {
  var todosLosTipos = [];
  var todosLosTiposSinRepetidos = [];
  var i=0
  $.each(tipos,function(indice,elemento){
    todosLosTipos[i] = elemento.Tipo
    i++
  });
  todosLosTiposSinRepetidos = todosLosTipos.unique()
  for (var i = 0; i < todosLosTiposSinRepetidos.length; i++) {
    var insertar = `<option value="${todosLosTiposSinRepetidos[i]}">${todosLosTiposSinRepetidos[i]}</option>`
    $("#tipo").append(insertar);
  }
  $(document).ready(function() {
    $('select').material_select();
  });

}

function cargarFiltroCiudad() {
  $.ajax({
    url: "./storage/data/data.json",
    type:'GET',
    data:{},
    success: function(data){
      llenarFiltroCiudad(data);
    }
  });
}

function cargarFiltroTipo() {
  $.ajax({
    url: "./storage/data/data.json",
    type:'GET',
    data:{},
    success: function(data){
      llenarFiltroTipo(data);
    }
  });
}

var btnMostrarTodos = document.getElementById('buscar')
btnMostrarTodos.addEventListener('click', function(e) {
  e.preventDefault()
  var ciudad = $("#ciudad").val()
  var tipo = $("#tipo").val()
  var precio = $("#rangoPrecio").val()
  $.ajax({
    url:"/",
    type:"POST",
    data:{"ciudad":ciudad,"tipo":tipo,"precio":precio},
    success: function(resultado) {
      var response = JSON.parse(resultado)
      insertarPublicaciones(response);
    }
  })
})



window.onload=function(){
  cargarFiltroCiudad()
  cargarFiltroTipo()
}
setSearch()
