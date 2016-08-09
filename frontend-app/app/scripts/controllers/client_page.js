'use strict';

angular.module('mobileMoneyApp')
  .controller('clientCtrl', ['$scope', '$http', '$timeout', '$stateParams', 'authFactory', 'dataFactory',
  	function ($scope, $http, $timeout, $stateParams, authFactory, dataFactory) {
  	
	$scope.clientId = $stateParams.id;
  	$scope.loading = true;
	
	
	// authenticate user
	authFactory.getAuthKey()
    	.then(function (response) {
			var basicKey = response.data.base64EncodedAuthenticationKey;
			console.log(basicKey);
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
