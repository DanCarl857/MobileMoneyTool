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
          	$scope.activDate = new Date($scope.data.activationDate);
			$scope.activationDate = $scope.activDate.toDateString();
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
		// var testDate = new Date().format('d-m-Y');
		// console.log(testDate);
		
        // show modal when client submits form
        $(document).ready(function(){
          	$('.modal-trigger').leanModal();
  			$('.collapsible').collapsible();
        });
		
		// data fields
        $scope.amount = '';
        $scope.phoneNumber = '';

        $scope.submitted = true;
        var baseUrl = "http://localhost:8090/api/v1/withdrawals";

        // function to submit the form after all form validation
        $scope.submitForm = function(){
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
  		  $rootScope.accountId = $stateParams.accId;
  		  console.log($rootScope.accountId);
		
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
		  // now effect changes on the mifos platform
		  // TODO: actually use the amount
		  var mifosUrl = "https://demo.openmf.org/fineract-provider/api/v1/";
		  var changeRequestUrl = mifosUrl + "savingsaccounts/" + $rootScope.accountId + "/transactions?command=withdrawal";
		  console.log(changeRequestUrl);
		  
		  $http({
		      url: changeRequestUrl,
		      method: "POST",
		      data: { 
				  "locale" : "en",
				  "dateFormat": "dd MMMM yyyy",
				  "transactionDate": "1 Aug 2016",
				  "transactionAmount": $scope.amount,
				  "paymentTypeId": "",
				  "accountNumber": "",
				  "checkNumber": "",
				  "routingCode": "",
				  "receiptNumber": "",
				  "bankNumber": ""
		      }
		  }).success(function(data){
			  console.log("Successfully deposited");
		  }).error(function(data){
		  	  console.log("Failed to do a deposit");
		  });
            console.log("Success with withdrawals: " + $scope.data);

            // close the modal and clean up 
            Materialize.toast('Transaction successful', 6000, 'rounded');
            $scope.cleanUp();
          }).error(function(data){
            // close the modal and clean up 
			$scope.cleanUp();
            Materialize.toast('Transaction unsuccessful', 6000, 'rounded');
          });
      	};

        // function to clean up
        $scope.cleanUp = function(){
		  console.log("Now cleaning up modal thingz :-)");
          $('#withModal').closeModal();
          $scope.amount = '';
          $scope.phoneNumber = '';
        };

        // function to go back to source page
        $scope.goBack = function(){
          window.history.back();
        };
  }]);
