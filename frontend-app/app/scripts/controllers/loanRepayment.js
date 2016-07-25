'use strict';
/* global $ */

angular.module('mobileMoneyApp')
	.controller('loanCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams', '$state', 
		function($rootScope, $scope, $http, $timeout, $stateParams, $state){
			
        // client's details
        $rootScope.clientId = $stateParams.id;
        $scope.clientNo = '';
        $scope.clientName = '';
        $scope.staffName = '';
   	  	$scope.loanAccounts = [];
  	  	$scope.savingsAccounts = [];
  	  	$scope.accountBalance = "";
  	  	$scope.bal = "";

        // show spinner
        $scope.loading = true;

        var baseApiUrl = "https://demo.openmf.org/fineract-provider/api/v1/";
        var endUrl = "tenantIdentifier=default";

        /* =================================================================== */
          var basicAuthKey;
          var loginCreds = {};
          loginCreds.username = "mifos";
          loginCreds.password = "password";

          var config = {
            cache: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
          };
        
          var authKeyRequest = baseApiUrl + "authentication?username="+ loginCreds.username + "&password=" + loginCreds.password + "&"+endUrl;

          // authentication
          $http.post(authKeyRequest, config)
            .success(function(data){
              basicAuthKey = data.base64EncodedAuthenticationKey;
              // set authorization in header
              $http.defaults.headers.common['Authorization'] = 'Basic ' + basicAuthKey;

              // make request to get client's information 
              var getClientDetails = baseApiUrl + "clients/" + $rootScope.clientId;

          	// getting client details
          	$http({
            	  method: "GET",
            	  url: getClientDetails
          	}).success(function(data){
            	$scope.data = data;
            	$scope.clientName = $scope.data.displayName;
            	$scope.accountNo = $scope.data.accountNo;
            	$scope.staffName = $scope.data.staffName;
            	$scope.activationDate = $scope.data.activationDate;
            	$scope.officeName = $scope.data.officeName;
            	$scope.userName = $scope.data.timeline.activatedByUsername;

            	// now get the client's account details
            	var getClientAccountInfo = baseApiUrl + "clients/" + $rootScope.clientId + "/accounts";

            	$http({
              		method: "GET",
              		url: getClientAccountInfo
            	}).success(function(response){
                	// get and display client account details here
  					$scope.loanAccounts = response.loanAccounts;
  					$scope.savingsAccounts = response.savingsAccounts;
  					$scope.loading = false;
            	}).error(function(data){
            		console.log("Error retrieving client account information");
            	})
          }).error(function(data){
            console.log("Error retrieving client data");
          });
        }).error(function(data){
          console.log("Error authenticating in client_page");
        });

            /* ====================================================== */
	}])
	
	.controller('processLoanCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams', '$state',
		function($rootScope, $scope, $http, $timeout, $stateParams, $state){
	        var baseApiUrl = "https://demo.openmf.org/fineract-provider/api/v1/";
	        var endUrl = "tenantIdentifier=default";

	        /* =================================================================== */
	          var basicAuthKey;
	          var loginCreds = {};
	          loginCreds.username = "mifos";
	          loginCreds.password = "password";

	          var config = {
	            cache: false,
	            dataType: 'json',
	            contentType: "application/json; charset=utf-8"
	          };
        
	          var authKeyRequest = baseApiUrl + "authentication?username="+ loginCreds.username + "&password=" + loginCreds.password + "&"+endUrl;

	          // authentication
	          $http.post(authKeyRequest, config)
	            .success(function(data){
	              basicAuthKey = data.base64EncodedAuthenticationKey;
	              // set authorization in header
	              $http.defaults.headers.common['Authorization'] = 'Basic ' + basicAuthKey;

	              // make request to get client's information 
	              var getClientDetails = baseApiUrl + "clients/" + $rootScope.clientId;

	          	// getting client details
	          	$http({
	            	  method: "GET",
	            	  url: getClientDetails
	          	}).success(function(data){
	            	$scope.data = data;
	            	$scope.clientName = $scope.data.displayName;
	            	$scope.accountNo = $scope.data.accountNo;
	            	$scope.staffName = $scope.data.staffName;
	            	$scope.activationDate = $scope.data.activationDate;
	            	$scope.officeName = $scope.data.officeName;
	            	$scope.userName = $scope.data.timeline.activatedByUsername;

	            	// now get the client's account details
	            	var getClientAccountInfo = baseApiUrl + "clients/" + $rootScope.clientId + "/accounts";

	            	$http({
	              		method: "GET",
	              		url: getClientAccountInfo
	            	}).success(function(response){
	                	// get and display client account details here
	  					$scope.loanAccounts = response.loanAccounts;
	  					$scope.savingsAccounts = response.savingsAccounts;
	  					$scope.loading = false;
	            	}).error(function(data){
	            		console.log("Error retrieving client account information");
	            	})
	          }).error(function(data){
	            console.log("Error retrieving client data");
	          });
	        }).error(function(data){
	          console.log("Error authenticating in client_page");
	        });

	            /* ====================================================== */
			
			// function to go back to source page
	        $scope.goBack = function(){
	          window.history.back();
	        };
			$scope.submitted = true;
	        var baseUrl = "http://localhost:8090/api/v1/loans";

	        // function to submit the form after all form validation
	        $scope.submitLoanForm = function(){
	          // Check to make sure the form is completely valid
	          console.log("testing loans");
	          if($scope.loanForm.$valid){
	            $scope.submitted = false;
	            $scope.loanRepayment(12345678);
	          }
	        };
	}]);