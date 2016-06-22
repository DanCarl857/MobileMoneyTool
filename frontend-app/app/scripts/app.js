'use strict';

angular
  .module('mobileMoneyApp', ['ngAnimate','ngCookies','ngResource','ngRoute','ngSanitize', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    $httpProvider.defaults.headers['Access-Control-Allow-Credentials'] = 'true';

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'userLoginCtrl'
      })

      .state('home', {
        url: '/home',
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
      })

      .state('clientPage', {
        url: '/client/:id',
        templateUrl: 'views/client_page.html',
        controller: 'clientCtrl'
      })

      .state('withdrawMoney', {
        url: '/withMoney/:id',
        templateUrl: 'views/withMoney.html',
        controller: 'withMoneyCtrl'
      })

      .state('saveMoney', {
        url: '/saveMoney/:id',
        templateUrl: 'views/saveMoney.html',
        controller: 'saveMoneyCtrl'
      })

      .state('sendMoney', {
        url: '/sendMoney/:id',
        templateUrl: 'views/sendMoney.html',
        controller: 'sendMoneyCtrl'
      })

      .state('transactions', {
        url: '/transactions',
        templateUrl: 'views/transactions.html',
        controller: 'transCtrl'
      })

      .state('configurations', {
        url: '/configurations',
        templateUrl: 'views/configurations.html',
        controller: 'configCtrl'
      });

      $urlRouterProvider.otherwise('/login');
  });
