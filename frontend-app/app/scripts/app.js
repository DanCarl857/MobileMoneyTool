'use strict';

angular
  .module('mobileMoneyApp', ['ngAnimate','ngCookies','ngResource','ngRoute','ngSanitize', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    // Set headers and enable CORS
    $httpProvider.defaults.headers.common['Fineract-Platform-TenantId'] = 'default';
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

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
	  
	  // start of partials
	  
	  .state('processSavings', {
		  url: '/processSavings',
		  templateUrl: '/processSave.htm',
		  controller: 'processSaveCtrl'
	  })
	  
	  .state('processWithdrawals', {
	  	  url: '/processWithdrawals',
		  templateUrl: '/processWith.htm',
		  controller: 'processWithCtrl'
	  })
	  
	  .state('processTransfer', {
		  url: '/processTransfer',
		  templateUrl: '/processTransfer.htm',
		  controller: 'processSendCtrl'
	  })
	  
	  // end of partials

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
      })

      .state('loans', {
        url: '/loans/:id',
        templateUrl: 'views/loanRepayment.html',
        contorller: 'loanCtrl'
      });

      $urlRouterProvider.otherwise('/login');
  });
