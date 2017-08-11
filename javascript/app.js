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

function carteraController($scope) {
    $scope.movimientos = [
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
    ];
    $scope.ingresos = 0;
    $scope.gastos = 0;
    $scope.total = 0;

    for (var i=0; i<$scope.movimientos.length; i++){
        if($scope.movimientos[i].tipo == 'gasto'){
            $scope.gastos += $scope.movimientos[i].cantidad;
        } else {
            $scope.ingresos += $scope.movimientos[i].cantidad;
        }
    }

    $scope.total = $scope.ingresos - $scope.gastos;
}

function estadisticasController() {
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
                data: [7.0, 6.9, 9.5, 12.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                color: '#351BEF'
            }, {
                name: 'Total',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
                color: '#000000'
            }, {
                name: 'Gastos',
                data: [0, 0, 0, 0, 0, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0],
                color: '#FF0000'
            }]
        });
    });
}