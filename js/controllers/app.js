var app = angular.module('MyApp', ['ngRoute','720kb.tooltips'])
.config(['$routeProvider', function ($routeProvider, $httpProvider) {
    $routeProvider
    .when('/inicio/', {
          templateUrl: 'vistas/store.html',
          // por fin encontre la doble llamada al controlador!!!
          // , no debe indicarse en el html si ya esta aqui
          controller: 'ProductosController',
          reloadOnSearch: false
    })
    .when('/producto/:idprod', {
            templateUrl: 'vistas/store.html',
            controller: 'ProductosController',
            reloadOnSearch: false
    })
    .when('/categoria/:idcat', {
            templateUrl: 'vistas/store.html',
            controller: 'ProductosController',
            reloadOnSearch: false
    })
    .when('/busqueda/:keyword', {
            templateUrl: 'vistas/store.html',
            controller: 'ProductosController',
            reloadOnSearch: false
    })
    .when('/ayuda/', {
            templateUrl: 'vistas/help.html',
            // controller: 'AyudaController',
            reloadOnSearch: false
    })
    .otherwise({
          redirectTo: '/inicio'
    });
}])
.controller('MainController', function ($scope, $location, $window) {

// declaro esta variable para compartir en los controladores de forma anidada
    $scope.itemsOnCart = 0;


});;

app.factory("MyService", function() {
  return {
    data: {}
  };
});
