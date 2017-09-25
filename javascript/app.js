/**
 * Created by Daniel on 08/08/2017.
 */

angular.module('tuBanca', ['ui.router', 'ngMaterial'])
    .config(function ($stateProvider, $urlRouterProvider, $mdDateLocaleProvider) {
        $stateProvider.state({
            name: 'cartera',
            url: '/cartera',
            controller: 'CarteraController',
            templateUrl: 'templates/cartera.html'
        })
            .state({
                name: 'estadisticas',
                url: '/estadisticas',
                controller: 'EstadisticasController',
                templateUrl: 'templates/estadisticas.html'
            });

        $urlRouterProvider.otherwise('/cartera');
        $mdDateLocaleProvider.firstDayOfWeek = 1;
})
    .controller('CarteraController', carteraController)
    .controller('EstadisticasController', estadisticasController);

//Variables globales
var db = null;
var registros = [];

//Controladores
function carteraController($scope) {

    obtenerBD();
    $scope.movimientos = registros;

    var fecha = new Date();
    var anoActual = fecha.getFullYear();
    $scope.minFecha = new Date(anoActual, '00', '01');
    $scope.maxFecha = new Date(anoActual, '11', '31');
    /*$scope.movimientos = [
        {
            cantidad: 1234,
            fecha: '25/05/2016',
            tipo: 'ingreso',
            descripcion: 'Nomina mensual porque yo lo valgofdsssssssssssssss ssssssssdfsfaaaa'
        },
        {
            cantidad: 12894,
            fecha: '28/05/2016',
            tipo: 'ingreso'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'ingreso'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'gasto'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'gasto'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'ingreso'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'ingreso'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'ingreso'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'gasto'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'ingreso'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'ingreso'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'gasto'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'ingreso'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'gasto'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'gasto'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'ingreso'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'ingreso'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'ingreso'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'gasto'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'gasto'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'ingreso'
        },
        {
            cantidad: 648,
            fecha: '25/08/2017',
            tipo: 'gasto'
        }
    ];*/
    $scope.ingresos = 0;
    $scope.gastos = 0;
    $scope.total = 0;
    $scope.fecha = '';
    $scope.cantidad = '';
    $scope.tipo = '';

    for (var i=0; i<$scope.movimientos.length; i++){
        if($scope.movimientos[i].tipo == 'gasto'){
            $scope.gastos += $scope.movimientos[i].cantidad;
        } else {
            $scope.ingresos += $scope.movimientos[i].cantidad;
        }
    }

    $scope.total = $scope.ingresos - $scope.gastos;

    $scope.anadirMov = function () {

    }
}

function estadisticasController() {
    var fecha = new Date();
    var anoActual = fecha.getFullYear();
    var ingresosMensual = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var totalesMensual = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var gastosMensual = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    $(document).ready(function() {
        $('#grafica').highcharts({
            title: {
                text: 'Gastos e ingresos',
                x: -20 //center
            },
            subtitle: {
                text: 'Source: yourself',
                x: -20
            },
            xAxis: {
                categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
            },
            yAxis: {
                title: {
                    text: 'Cantidad (€)'
                }
            },
            tooltip: {
                valueSuffix: '€'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Ingresos',
                data: ingresosMensual,
                color: '#351BEF'
            }, {
                name: 'Total',
                data: totalesMensual,
                color: '#000000'
            }, {
                name: 'Gastos',
                data: gastosMensual,
                color: '#FF0000'
            }]
        });
    });
}

//Funciones de CRUD
function obtenerBD() {
    var request = indexedDB.open("libreria");

    request.onupgradeneeded = function() {
        // Si la base de datos no existe previamente, crea almacenes e índices.
        db = request.result;
        var store = db.createObjectStore('movimientos', {autoIncrement: true});
        var cantidadIndex = store.createIndex("by_cantidad", "cantidad");
        var fechaIndex = store.createIndex("by_fecha", "fecha");
        var tipoIndex = store.createIndex("by_tipo", "tipo");
        var descripcionIndex = store.createIndex("by_descripcion", "descripcion");

        // Datos iniciales.
        store.put({cantidad: 65841, fecha: "25/03/2017", tipo: 'ingreso', descripcion: "Probando IndexedDB"});
        store.put({cantidad: 5864, fecha: "28/03/2017", tipo: 'gasto', descripcion: "Probando IndexedDB..."});
        store.put({cantidad: 5864, fecha: "28/03/2017", tipo: 'gasto', descripcion: "Probando IndexedDB..."});
        store.put({cantidad: 1254961, fecha: "25/04/2017", tipo: 'ingreso', descripcion: "Probando IndexedDB 2..."});
    };

    request.onsuccess = function() {
        db = request.result;
        console.log('BBDD cargada correctamente');
        obtenerRegistros();
    };

    request.onerror = function () {
        console.log('Error al cargar la BBDD');
    };
}

function obtenerRegistros() {
    var datos = db.transaction(['movimientos'], 'readonly');
    var objeto = datos.objectStore('movimientos');

    objeto.openCursor().onsuccess = function (e) {
        var res = e.target.result;

        if (res === null) {
            return;
        }

        registros.push(res.value);
        res.continue();
    };
}