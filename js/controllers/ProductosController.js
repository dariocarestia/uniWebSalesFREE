//////////Lista de Apis///////////////////////////////////////
// categorias.php () Json lista de todas las categorías
// productos.php (ID de categoría) Json con todos los productos
// productos_busqueda.php (str Filtro) Json con todos los productos
// producto.php (ID de producto) Json con 1 producto
// consultaOptionJson.php (str Filtro) Json con lista de productos encontrados
/////////////////////////////////////////////////////////////
'use strict';
app.controller('ProductosController', function ($http, $scope, $location, $routeParams, MyService, $window, $timeout) {

// $routeParams: permite recibir los parámetros enviados a nuestra ruta
// $location: permite hacer redireciones.

    var server = ''
    var file = 'categorias.php'
    var catgoria_inicial = 0
    var cant_min_caracteres = 2

    $scope.productoid=$routeParams.idprod;
    $scope.categoriaid=$routeParams.idcat;
    $scope.Keyword=$routeParams.keyword;
    $scope.filtro="";

    $scope.added = false;
    $scope.loading = true; //Es la habilitación del preload de categorías
    $scope.loadingProductos = true; //Es la habilitación del preload de productos
    $scope.showDetails = false; //Es la habilitación de mostrar grilla de productos o el detalle de un producto ()
    $scope.searching = false;
    $scope.EtiquetaResultadosBusqueda = " Mostrar todos los resultados";
    $scope.menu = "";
    $scope.cantidad_a_agregar = 1;
    $scope.codigo_de_producto = "";


 
    if (MyService.data.categorias==undefined)
    {
      // console.log("Cache vacía, primer entrada, carga categorías");
      $http.get(server + file).success(function (data) {
          $scope.loading = false;
          // console.log(data);
          $scope.menu = data;
          MyService.data.categorias = data;
          // $scope.selectedMenu = data[catgoria_inicial];

          Dirigir();

        }).error(function (data) {
            $scope.error = "Error en categorias.php" + data;
            $scope.loading = false;
        });

    }
    else//si ya cargó las categorías
    {
      // console.log("categorías cargadas, recarga desde cache");
      $scope.loading = false;
      var data1 = MyService.data.categorias;
      $scope.menu = data1;
      // $scope.selectedMenu = data1[catgoria_inicial];
      Dirigir();
    };


    function Dirigir()
    {

          if ($scope.productoid!=undefined)
          {
                  // console.log("parámetros de producto");
                  // console.log($scope.productoid);
                  $scope.searching = false;
                  setItem($scope.productoid);
                  $('html, body').animate({ scrollTop: 0 }, 'fast', 'linear');

          }
          else if ($scope.categoriaid!=undefined)
          {
                  // console.log("parámetro de categoría");
                  // console.log($scope.categoriaid);
                  $scope.searching = false;
                  getCategorias($scope.categoriaid);
                  $('html, body').animate({ scrollTop: 0 }, 'fast', 'linear');
          }
          else if ($scope.Keyword!=undefined)
          {
                  // console.log("parámetro de búsqueda");
                  // console.log($scope.Keyword);
                  $scope.searching = false;
                  getItemsBusqueda($scope.Keyword);
                  $('html, body').animate({ scrollTop: 0 }, 'fast', 'linear');
          }
          else
          {
            // console.log("ultimos ingresos");
            $scope.searching = false;
            getUltimosItems("30");
            $('html, body').animate({ scrollTop: 0 }, 'fast', 'linear');
          }
      }


// Es llamada cuando se hace click en el input de busqueda
    $scope.buscando = function ()
    {
      $('html, body').animate({ scrollTop: $('#busqueda').offset().top - 8 }, 'fast', 'linear');
      if ($scope.filtro.length>=cant_min_caracteres)
      {
        $scope.searching = true;
      }
    }
// Es llamada al tipear en el input de busqueda
    $scope.filtrarProductos = function ()
    {
        var valorBusqueda=$scope.filtro;
        if (valorBusqueda.length>=cant_min_caracteres)
        {
            obtener_registros(valorBusqueda);
            $scope.searching = true;
        }
        else
        {
            $scope.searching = false;
        }
    }
// Trae para rellenar los nombres e id de los productos encontrados en la búsqueda
    function obtener_registros(productos)
    {
          var url = server + 'consultaOptionJson.php?filtro=' + productos;
          $http.get(url).success(function (data)
          {
              if (data!="No hay coincidencias")
              {
                $scope.EtiquetaResultadosBusqueda = " Mostrar todos los resultados";
                $scope.menu_busqueda = data;
              }
              else
              {
                $scope.EtiquetaResultadosBusqueda = " No hay coincidencias";
                $scope.menu_busqueda = "";
              }
          }).error(function (data) {
              $scope.error = "Error en consultaOptionJson.php" + data;
          });
      }

// Es llamada al hacer click en la primera opcion de la lista de resultados de búsqueda
// En Mostrar Todos Los Resultados
    $scope.verBusquedaCompleta = function ()
    {
      if ($scope.EtiquetaResultadosBusqueda!=" No hay coincidencias")
      {
        $location.path("/busqueda/" + $scope.filtro);
      }
    }

// Es llamada al hacer click en el compo de selección de la lista de filtrados de la busqueda
// Tanto de la lista para celu como para pc
// El usuario seleccionó ese producto para verlo
    $scope.selectItem_celu = function (item)
    {
      $location.path("/producto/" + item.ID);
    }

// Ingresa el keyword buscado, el cual produjo los resultados de busqueda (str Filtro)
// devuelve un Json con todos los productos encontrados
    function getItemsBusqueda(item)
    {
        // console.log(item);
        $scope.loadingProductos = true;
        var url = server + 'productos_busqueda.php?filtro=' + item;
        $scope.rubroSeleccionado = "Resultados de la búsqueda";
        $http.get(url).success(function (data) {
            $scope.productos = data;
            $scope.showDetails = false;//
            $scope.loadingProductos = false;
            $scope.searching = false;
        }).error(function (data) {
            $scope.error = "Error en productos_busqueda.php" + data;
            $scope.loadingProductos = false;
            $scope.searching = false;
        });
    }


// Ingresa la cantidad de los ultimos productos cargados según el Codigo de producto
// devuelve un Json con todos los productos encontrados
    function getUltimosItems(cantidad)
    {
          if ((MyService.data.Ultimos!==undefined)) //Si hay datos en cache (productos de una categoría)
          {
              var data2 = MyService.data.Ultimos;
              $scope.rubroSeleccionado = "Last Added";
              // console.log("Vuelve a los ultimos ingresos almacenados");
              $scope.productos = data2;
              $scope.loadingProductos = false;
              $scope.searching = false;
          }
          else //Sino, debe cargar una nueva categoría
          {
                  $scope.loadingProductos = true;
                  var url = server + 'productos_ultimos.php?cant=' + cantidad;
                  $scope.rubroSeleccionado = "Last Added";
                  $http.get(url).success(function (data) {
                      $scope.productos = data;
                      MyService.data.Ultimos= data;
                      // console.log("Carga los ultimos ingresos en cache");
                      $scope.showDetails = false;//
                      $scope.loadingProductos = false;
                      $scope.searching = false;
                  }).error(function (data) {
                      $scope.error = "Error en productos_ultimos.php" + data;
                      $scope.loadingProductos = false;
                      $scope.searching = false;
                  });
          }

    }

// Es llamada cuando viene la ruta con un parámetro ya sea desde la lista de busqueda, como haciendo clic en un prodcto de la grilla de productos
// Ingresa solo el ID del producto que quiere ver
// devuelve un Json con los datos de ese producto
    function setItem(item)
    {
      var url = server + 'producto.php?keyId=' + item;
      // $scope.rubroSeleccionado = "Resultados de la búsqueda";
      $http.get(url).success(function (data) {
          $scope.NombreProducto = data.NAME;
          $scope.ImporteProducto = data.PRICESELL;
          $scope.ImagenProducto = data.IMAGE;
          $scope.DescripcionProducto = data.ATTRIBUTES;
          $scope.categoria = data.CATEGORY;
          $scope.rubroSeleccionado = "Categoría: " + IdCat2NombreCat($scope.categoria);
          $scope.codigo_de_producto = data.REFERENCE;
          $scope.showDetails = true;
          $scope.loadingProductos = false;
          $scope.searching = false;
      }).error(function (data) {
          $scope.error = "Error en producto.php" + data;
          $scope.loadingProductos = false;
          $scope.searching = false;
      });
    }


// Es llamada al hacer click en una determinada Categoría, devuelve un Json con todos los productos de esa cat.
    $scope.getItems = function (item)
    {
      if (item == undefined) // Para la vista celular, al parecer ng-change="getItems(item)" no inyecta el item, por lo que se trabaja con la variable pasada a traves de ng-model="selectedMenu"
      {
          // console.log("item indefinido");
          item = $scope.selectedMenu;
      }
      $location.path("/categoria/" + item.ID);
    }

    function getCategorias(item)
    // item trae el código de la categoría pasado por parámetro a la url
    {

        for (var i = 0; i < $scope.menu.length; i++) {
            // console.log(categorias[i].NAME);
           if ($scope.menu[i].ID===item)
           {
              item = $scope.menu[i]; // Aqui se convierte a item del código de la categoría a un objeto de la categoría
              $scope.selectedMenu = item; //Esto es para que se marque la categoría activa en el combo select para la vista celular
           }
        }


        // console.log(MyService.data.IdCat);
        // console.log(item.ID);

        if ((MyService.data.IdCat!==undefined) && (MyService.data.IdCat==item.ID)) //Si hay datos en cache (productos de una categoría)
        {
            var data2 = MyService.data.productos;
            $scope.rubroSeleccionado = "Categoría: " + item.NAME;
            console.log("Vuelve a la Categoria almacenada");
            $scope.productos = data2;
            $scope.loadingProductos = false;
            $scope.searching = false;
        }
        else //Sino, debe cargar una nueva categoría
        {
            var file = 'productos.php?keyId='
            $scope.loadingProductos = true;
            $scope.rubroSeleccionado = "Categoría: " + item.NAME;
            var url = server + file + item.ID;
            $http.get(url).success(function (data) {
                $scope.showDetails = false;
                $scope.productos = data;
                MyService.data.productos = data;
                MyService.data.IdCat = item.ID;
                // console.log("Carga nueva categoría en cache");
                $scope.loadingProductos = false;
                $scope.searching = false;
            }).error(function (data) {
                $scope.error = "Error en productos.php" + data;
                $scope.loadingProductos = false;
            });
          }

    }

// Es llamada al hacer click en la imagen de la grilla de productosLista
// Tanto si son productos buscados por categoría o por keyword
    $scope.getDetalleItem = function (producto)
    {
        if (producto.SUBCATEGORY == false)
        {
            $location.path("/producto/" + producto.ID);
        }
        else
        {
            $location.path("/categoria/" + producto.ID);
        }
    }

    function IdCat2NombreCat(item)
    {
      var nombre_cat = "Categoría no encontrada";
      for (var i = 0; i < $scope.menu.length; i++) {
          // console.log(categorias[i].NAME);
         if ($scope.menu[i].ID===item)
         {
            nombre_cat = $scope.menu[i].NAME; // Aqui se convierte a item del código de la categoría a un objeto de la categoría
         }
      }
      return nombre_cat;
    }


});

// Esta funcion es la que ajusta el ancho o alto de la imagen del producto hasta encajar
app.directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {

                var W_Cont = 275; //Ancho del DivImagen Setearlo correctamente
                var H_Cont = 275; //Alto del DivImagen Setearlo correctamente

                var W_Img = $(this).width(); //Ancho de la Imagen
                var H_Img = $(this).height(); //Alto de la Imagen
                var R_Img = H_Img/W_Img; //Relacion H/W de la Imagen

                // Modifique la función ya que a veces se achataban las imágenes
                // Hay que tener la precaución de que el DivImagen debe ser cuadrado
                // De esa forma se simplifica el encuadre de Imágen

                if (R_Img < 1){
                    $(this).width(W_Cont);
                    $(this).height(R_Img*W_Cont);
                }
                else{
                    $(this).height(W_Cont);
                    $(this).width(W_Cont/R_Img);
                }

/*                 if ($(this).width() > $(this).height())
                    $(this).width(275);
                else
                    $(this).height(275); */


            });
        }
    };
});


app.directive('imageonDetalleload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {

                var W_Cont = 275; //Ancho del DivImagen Setearlo correctamente
                var H_Cont = 275; //Alto del DivImagen Setearlo correctamente

                var W_Img = $(this).width(); //Ancho de la Imagen
                var H_Img = $(this).height(); //Alto de la Imagen
                var R_Img = H_Img/W_Img; //Relacion H/W de la Imagen

                // Modifique la función ya que a veces se achataban las imágenes
                // Hay que tener la precaución de que el DivImagen debe ser cuadrado
                // De esa forma se simplifica el encuadre de Imágen

                if (R_Img < 1){
                    $(this).width(W_Cont);
                    $(this).height(R_Img*W_Cont);
                }
                else{
                    $(this).height(W_Cont);
                    $(this).width(W_Cont/R_Img);
                }

/*                 if ($(this).width() > $(this).height())
                    $(this).width(275);
                else
                    $(this).height(275); */


            });
        }
    };
});