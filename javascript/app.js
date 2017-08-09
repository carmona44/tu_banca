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
                templateUrl: 'templates/estadisticas.html'
            });

        $urlRouterProvider.otherwise('/cartera');
        $mdDateLocaleProvider.firstDayOfWeek = 1;
})
    .controller('CarteraController', carteraController);

function carteraController($scope) {
    $scope.movimientos = [
        {
            cantidad: 1234,
            fecha: '25/05/2016',
            tipo: 'ingreso'
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