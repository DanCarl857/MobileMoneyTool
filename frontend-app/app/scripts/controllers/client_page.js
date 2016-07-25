'use strict';

angular.module('mobileMoneyApp')
  .controller('clientCtrl', ['$scope', '$http', '$timeout', '$stateParams', '$state', 
  	function ($scope, $http, $timeout, $stateParams, $state) {
  	// client's variables
  	$scope.clientId = $stateParams.id;
  	$scope.accountNo = "";
  	$scope.clientName = "";
  	$scope.staffName = "";
  	$scope.activationDate = "";
  	$scope.officeName = "";

  	$scope.loading = true;


  	var baseApiUrl = "https://demo.openmf.org/fineract-provider/api/v1/";
  	var endUrl = "tenantIdentifier=default";

  	/* ========================================================= */
  	var basicAuthKey;

        var loginCreds = {};
        loginCreds.username = "mifos";
        loginCreds.password = "password";

        $scope.clientsPerPage = 15;

        var config = {
          cache: false,
          dataType: 'json',
          contentType: "application/json; charset=utf-8"
        };
        
        var authKeyRequest = baseApiUrl + "authentication?username="+ loginCreds.username + "&password=" + loginCreds.password + "&"+endUrl;
        $http.post(authKeyRequest, config)
          .success(function(data){
            basicAuthKey = data.base64EncodedAuthenticationKey;

            // set authorization in header
            $http.defaults.headers.common['Authorization'] = 'Basic ' + basicAuthKey;

            // make request to get all clients 
            var getClientRequest = baseApiUrl + "clients/" + $scope.clientId;

    		$http({
    			method: "GET",
    			url: getClientRequest
    		}).success(function(data){
    			$scope.data = data;
    			$scope.accountNo = $scope.data.accountNo;
    			$scope.clientName = $scope.data.displayName;
    			$scope.staffName = $scope.data.staffName;
    			$scope.activationDate = $scope.data.activationDate;
    			$scope.officeName = $scope.data.officeName;
    			$scope.userName = $scope.data.timeline.activatedByUsername;
    			$scope.loading = false;
    		}).error(function(data){
    			console.log("Error retrieving client data");
    		});
    	}).error(function(data){
    		console.log("Error authenticating in client_page");
    	});

          /* ====================================================== */

  	console.log($scope.clientId + " from client page");
    $scope.goBack = function(){
    	window.history.back();
    };
  }]);
