/**
 * Created by Daniel on 08/08/2017.
 */

angular.module('tu_banca', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state({
            name: 'cartera',
            url: '/cartera',
            templateUrl: 'templates/cartera.html'
        })
            .state({
                name: 'estadisticas',
                url: '/estadisticas',
                templateUrl: 'templates/estadisticas.html'
            });

        $urlRouterProvider.otherwise('/cartera');
});