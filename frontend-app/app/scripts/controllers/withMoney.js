'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('withMoneyCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams', '$state', 
    function ($rootScope, $scope, $http, $timeout, $stateParams, $state) {

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
  
  // controller which actually processes withdrawal transaction
  .controller('processWithCtrl', ['$rootScope', '$scope', '$http', '$stateParams', '$state',
  	function($rootScope, $scope, $http, $stateParams, $state){
		
		// data fields
        $scope.amount = '';
        $scope.phoneNumber = '';
		
        // show modal when client submits form
        $(document).ready(function(){
          	$('.modal-trigger').leanModal();
  			$('.collapsible').collapsible();
        });

        $scope.submitted = true;
        var baseUrl = "http://localhost:8090/api/v1/withdrawals";

        // function to submit the form after all form validation
        $scope.submitForm = function(){
			console.log("In the processWith controller submit fxn");
           // Check to make sure the form is completely valid
           if($scope.withForm.$valid){
             $scope.submitted = false;
             $scope.withMoneyRequest($rootScope.clientId);
           }
        };
		
      	// function to handle requests to the mobile money engine
      	$scope.withMoneyRequest = function(clientId){
          // open the modal
          $('#withModal').openModal({
            dismissible: false,
            opacity: '.5'
          });

          // request to mobile money engine
          $scope.accountId = "4904123";
	      var requestUrl = baseUrl + "?phone=" + $scope.phoneNumber + "&amount=" + $scope.amount + "&clientId=" + clientId + "&accountId=" + $scope.accountId;
          
		  // make request to the mobile money engine
          $http({
            method: "GET",
            url: requestUrl
          }).success(function(data){
            $scope.data = data;
			
			// TODO: make request to effect this change on the mifos platform
            console.log("Success with withdrawals: " + $scope.data);

            // close the modal and clean up 
            Materialize.toast('Transaction successful', 6000, 'rounded');
            $scope.cleanUp();
          }).error(function(data){
            // close the modal and clean up 
            Materialize.toast('Transaction unsuccessful', 6000, 'rounded');
            $scope.cleanUp();
          });
      	};

        // function to clean up
        $scope.cleanUp = function(){
          $('#withModal').closeModal();
          $scope.amount = '';
          $scope.phoneNumber = '';
        };

        // function to go back to source page
        $scope.goBack = function(){
          window.history.back();
        };
  }]);
