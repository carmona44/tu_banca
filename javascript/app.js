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
function carteraController($scope, $mdToast) {

    var fecha = new Date();
    var anoActual = fecha.getFullYear();
    $scope.minFecha = new Date(anoActual, '00', '01');
    $scope.maxFecha = new Date(anoActual, '11', '31');
    $scope.descripcion = '';
    $scope.ingresos = 0;
    $scope.gastos = 0;
    $scope.total = 0;
    $scope.fecha = '';
    $scope.cantidad = '';
    $scope.tipo = '';

    obtenerBD();

    setTimeout(function () {
        calcularSaldos();
    }, 200);

    $scope.anadirMov = function () {
        if($scope.tipo && $scope.cantidad && $scope.fecha){
            addRegistro($scope.tipo, $scope.cantidad, $scope.fecha, $scope.descripcion);
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Movimiento agregado. Calculando total...')
                    .position('top right')
                    .hideDelay(2000)
            );

            $scope.descripcion = '';
            $scope.fecha = '';
            $scope.cantidad = '';
            $scope.tipo = '';

            setTimeout(function () {
                calcularSaldos();
            }, 100);
        } else {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('No has introducido los valores obligatorios.')
                    .position('top right')
                    .hideDelay(2000)
            );
            $scope.descripcion = '';
            $scope.fecha = '';
            $scope.cantidad = '';
            $scope.tipo = '';
        }
    };

    function calcularSaldos() {
        $scope.movimientos = registros;
        $scope.ingresos = 0;
        $scope.gastos = 0;
        $scope.total = 0;

        for (var i = 0; i < $scope.movimientos.length; i++) {
            if ($scope.movimientos[i].tipo == 'gasto') {
                $scope.gastos += $scope.movimientos[i].cantidad;
            } else {
                $scope.ingresos += $scope.movimientos[i].cantidad;
            }
        }

        $scope.total = $scope.ingresos - $scope.gastos;
    }
}

function estadisticasController() {
    var fecha = new Date();
    var anoActual = fecha.getFullYear();
    var ingresosMensual = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var totalesMensual = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var gastosMensual = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    $(document).ready(function () {
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

    request.onupgradeneeded = function () {
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

    request.onsuccess = function () {
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
    registros = [];

    objeto.openCursor().onsuccess = function (e) {
        var res = e.target.result;

        if (res === null) {
            return;
        }

        registros.push(res.value);
        res.continue();
    };
}

function addRegistro(tipo, cantidad, fecha, descripcion) {
    var datos = db.transaction(['movimientos'], "readwrite");
    var objeto = datos.objectStore('movimientos');

    var request = objeto.put({
        tipo: tipo,
        cantidad: cantidad,
        fecha: formateaFecha(fecha),
        descripcion: descripcion
    });

    request.onerror = function (e) {
        console.log('ERROR al añadir el nuevo registro: ' + e);
    };

    datos.oncomplete = function (e) {
        console.log('Movimiento añadido correctamente');
        obtenerRegistros();
    };

    function formateaFecha(fecha) {
        let mes = String(fecha.getMonth() + 1);
        let dia = String(fecha.getDate());
        const ano = String(fecha.getFullYear());

        if (mes.length < 2) mes = '0' + mes;
        if (dia.length < 2) dia = '0' + dia;

        return `${dia}/${mes}/${ano}`;
    }
}