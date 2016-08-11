'use strict';

angular.module('mobileMoneyApp')
  .controller('clientCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams', 'authFactory', 'dataFactory',
  	function ($rootScope, $scope, $http, $timeout, $stateParams, authFactory, dataFactory) {
  	
	$scope.clientId = $stateParams.id;
  	$scope.loading = true;
	
	
	// authenticate user
	authFactory.getAuthKey($rootScope.username, $rootScope.password)
    	.then(function (response) {
			var basicKey = response.data.base64EncodedAuthenticationKey;
			authFactory.setBasicAuthKey(basicKey);
	
			// get client data
			dataFactory.getClient($scope.clientId)
				.then(function(response){
    				$scope.data = response.data;
    				$scope.accountNo = $scope.data.accountNo;
    				$scope.clientName = $scope.data.displayName;
    				$scope.staffName = $scope.data.staffName;
	          		$scope.activDate = new Date($scope.data.activationDate);
					$scope.activationDate = $scope.activDate.toDateString();
    				$scope.officeName = $scope.data.officeName;
    				$scope.userName = $scope.data.timeline.activatedByUsername;
    				$scope.loading = false;
				}, function(error){});
    	}, function (error){});
	
    	$scope.goBack = function(){
    		window.history.back();
    	};
  }]);
