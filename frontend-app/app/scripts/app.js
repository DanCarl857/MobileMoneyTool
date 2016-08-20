'use strict';

angular
  .module('mobileMoneyApp', ['ngAnimate','ngCookies','ngResource','ngRoute','ngSanitize', 'ui.router', 'angularUtils.directives.dirPagination'])
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
		  url: '/processSavings/:accId',
		  templateUrl: '/processSave.htm',
		  controller: 'processSaveCtrl'
	  })
	  
	  .state('processLoanRepayment', {
		  url: '/processLoans/:accId',
		  templateUrl: '/processLoan.htm',
		  // controller: 'processLoanCtrl'
	  })
	  
	  .state('processLoansWithSavings', {
		  url: '/processLoanWithSavings',
		  templateUrl: '/processLoanWithSavings.htm'
	  })
	  
	  .state('processLoansFinale', {
		  url: '/processLoansFinale/:accId',
		  templateUrl: '/processLoansFinale.htm', 
		  // controller: "this controller"
	  })
	  
	  .state('processWithdrawals', {
	  	url: '/processWithdrawals/:accId',
		  templateUrl: '/processWith.htm',
		  controller: 'processWithCtrl'
	  })
	  
	  .state('processTransfer', {
		  url: '/processTransfer',
		  templateUrl: '/processTransfer.htm'
    })
	  
	  .state('processDisbursals', {
		  url: '/processDisbursals/:accId',
		  templateUrl: '/processDisbursals.htm',
		  // controller: 'processDisbursalCtrl'
	  })
	  
	  .state('processDisbursalsToSavings', {
		  url: '/processDisbursalsToSavings',
		  templateUrl: '/processDisbursalsToSavings.htm',
		  // controller: 'disburseToSavingsCtrl'
	  })
	  
	  .state('processDisbursalsMoMo', {
		  url: '/processDisbursalsMoMo',
		  templateUrl: '/processDisbursalsMoMo.htm'
	  })

	  .state('settings', {
	  	  url: '/settings',
	  	  templateUrl: '/settings'
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
        // contorller: 'loanCtrl'
      })
	  
	  .state('disburseLoans', {
		  url: '/disburseLoans/:id',
		  templateUrl: 'views/loanDisbursals.html',
		  controller: 'loanDisbursalCtrl'
	  });

      $urlRouterProvider.otherwise('/login');
  });
