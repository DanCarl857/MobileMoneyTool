'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('sendMoneyCtrl', ['$rootScope', '$scope', '$http', '$stateParams', '$state', 'authFactory', 'dataFactory',
    function ($rootScope, $scope, $http, $stateParams, $state, authFactory, dataFactory) {
		
        // client's details
        $rootScope.clientId = $stateParams.id;
  	    // show spinner
        $scope.loading = true;
        
        authFactory.getAuthKey($rootScope.username, $rootScope.password)
            .then(function (response) {
                var basicKey = response.data.base64EncodedAuthenticationKey;
                authFactory.setBasicAuthKey(basicKey);
                
                dataFactory.getClientDetails($rootScope.clientId)
                    .then(function (response) {
                        $scope.data = response.data;
                        $scope.clientName = $scope.data.displayName;
                        $scope.accountNo = $scope.data.accountNo;
                        $scope.staffName = $scope.data.staffName;
                        $scope.activDate = new Date($scope.data.activationDate);
                        $scope.activationDate = $scope.activDate.toDateString();
                        $rootScope.dateToUse = $scope.activationDate.substring(4);
                        $scope.officeName = $scope.data.officeName;
                        $scope.userName = $scope.data.timeline.activatedByUsername;
                        
                        dataFactory.getClientAccounts($rootScope.clientId)
                            .then(function (response) {
                               $scope.savingsAccounts = response.data.savingsAccounts;
                               $scope.loanAccounts = response.data.loanAccounts;
                               $scope.loading = false;
                            }, function(error){});
                    }, function(error){});
            }, function(error){});
  }]);