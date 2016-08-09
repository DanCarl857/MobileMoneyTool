'use strict';
/* global $ */
/* global Materialize */
angular.module('mobileMoneyApp')
  .controller('loanDisbursalCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams', 
	function ($rootScope, $scope, $http, $timeout, $stateParams) {
  	   
      // client's details
      $rootScope.clientId = $stateParams.id;
	  $rootScope.accountNo = '';
	  $rootScope.dateToUse = '';
	  $rootScope.accountId = '';
      $scope.clientNo = '';
      $scope.clientName = '';
      $scope.staffName = '';
 	  $scope.loanAccounts = [];
	  $rootScope.savingsAccounts = [];
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
          	$rootScope.accountNo = $scope.data.accountNo;
			$rootScope.accountId = $scope.data.id;
          	$scope.staffName = $scope.data.staffName;
          	$scope.activDate = new Date($scope.data.activationDate);
			$scope.activationDate = $scope.activDate.toDateString();
			$rootScope.dateToUse = $scope.activationDate.substring(4);
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
					$rootScope.savingsAccounts = response.savingsAccounts;
					$scope.loading = false;
          	}).error(function(){
          		console.log("Error retrieving client account information");
          	});
        }).error(function(){
          console.log("Error retrieving client data");
        });
      }).error(function(){
        console.log("Error authenticating in client_page");
      });

          /* ====================================================== */
}])

.controller('disburseToSavingsCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams',
	function($rootScope, $scope, $http, $timeout, $stateParams){
		
		$rootScope.accountId = $stateParams.accId;
		
        // show modal when client submits form
        $(document).ready(function(){
          	$('.modal-trigger').leanModal();
  			$('.collapsible').collapsible();
        });
		
	  // function to handle loan disbursals to a savings account
	  $scope.disburseToSavings = function(){
		  var uri = "https://demo.openmf.org/fineract-provider/api/v1/loans" + $rootScope.accountId + "?command=disburseToSavings";
		  console.log(uri);
		  
          $('#loanDisbursalToSavings').openModal({
            dismissible: false,
            opacity: '.5'
          });
		  
		  var disburseDate = $rootScope.dateToUse;
		  
		  $http({
			  method: "POST",
			  url: uri,
			  data: {
				    "dateFormat": "MMMM dd yyyy",
				    "locale": "en",
				    "transactionAmount":"",
				    "fixedEmiAmount": "",
				    "actualDisbursementDate": disburseDate,
				    "note": "Disbursing to savings account using Mobile Money application"
			  }
		  }).success(function(){
			  console.log("successfully disbursed to savings account");
              Materialize.toast('Loan successfully disbursed to Savings account', 6000, 'rounded');
              $('#loanDisbursalToSavings').closeModal();
		  }).error(function(){
			  console.log("Failed to disburse to savings account");
              Materialize.toast('Failure to disburse loans. You should try disbursing by cash', 6000, 'rounded');
              $('#loanDisbursalToSavings').closeModal();
		  });
	  };
	
		// data fields
        $scope.amount = '';
        $scope.phoneNumber = '';
	
      	// function to handle requests to the mobile money engine
      	$scope.loanRequest = function(clientId){
          // open the modal
          $('#loanRepayModal').openModal({
            dismissible: false,
            opacity: '.5'
          });

          // request to mobile money engine
          $scope.accountId = "4904123";
	      var requestUrl = baseUrl + "?phone=" + $scope.phoneNumber + "&amount=" + $scope.amount + "&clientId=" + clientId + "&accountId=" + $scope.accountId;
		  
		  console.log(requestUrl);
        
		  // make request to the mobile money engine
          $http({
            method: "GET",
            url: requestUrl
          }).success(function(data){
            $scope.data = data;
		
			// TODO: make request to effect this change on the mifos platform
			  // now effect changes on the mifos platform
			  var mifosUrl = "https://demo.openmf.org/fineract-provider/api/v1/";
			  var changeRequestUrl = mifosUrl + "loans/" + $rootScope.accountId + "/transactions?command=repayment";
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
			  }).success(function(){
				  console.log("Successfully deposited");
			  }).error(function(){
			  	  console.log("Failed to do a deposit");
			  });
		  
            console.log("Success with withdrawals for loan");

            // close the modal and clean up 
            Materialize.toast('Transaction successful', 6000, 'rounded');
            $scope.cleanUp();
          }).error(function(){
            // close the modal and clean up 
			$scope.cleanUp();
            Materialize.toast('Transaction unsuccessful', 6000, 'rounded');
          });
      	};
		
		/* ******************* */
		// data fields
        $scope.amount = '';
        $scope.phoneNumber = '';

        $scope.submitted = true;
        var baseUrl = "http://localhost:8090/api/v1/withdrawals";

        // function to submit the form after all form validation
        $scope.submitDisbursalForm = function(){
			
           // Check to make sure the form is completely valid
           if($scope.disburseForm.$valid){
             $scope.submitted = false;
             $scope.loanRequest($rootScope.clientId);
           }
        };
	
      	// function to handle requests to the mobile money engine
      	$scope.loanRequest = function(clientId){
          // open the modal
          $('#loanDisbursalToMoMo').openModal({
            dismissible: false,
            opacity: '.5'
          });

          // request to mobile money engine
          $scope.accountId = "4904123";
	      var requestUrl = baseUrl + "?phone=" + $scope.phoneNumber + "&amount=" + $scope.amount + "&clientId=" + clientId + "&accountId=" + $scope.accountId;
		  
		  console.log(requestUrl);
      
		  // make request to the mobile money engine
          $http({
            method: "GET",
            url: requestUrl
          }).success(function(data){
            $scope.data = data;
		
			// TODO: make request to effect this change on the mifos platform
		  // now effect changes on the mifos platform
		  var mifosUrl = "https://demo.openmf.org/fineract-provider/api/v1/";
		  var changeRequestUrl = mifosUrl + "loans/" + $rootScope.accountId + "/transactions?command=repayment";
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
		  }).success(function(){
			  console.log("Successfully deposited");
		  }).error(function(){
		  	  console.log("Failed to do a deposit");
		  });
		  
            console.log("Success with withdrawals for loan");

            // close the modal and clean up 
            Materialize.toast('Transaction successful', 6000, 'rounded');
            $scope.cleanUp();
          }).error(function(){
            // close the modal and clean up 
			$scope.cleanUp();
            Materialize.toast('Transaction unsuccessful', 6000, 'rounded');
          });
      	};

        // function to clean up
        $scope.cleanUp = function(){
		  console.log("Now cleaning up modal thingz :-)");
		  $('.lean-overlay').remove();
          $('#loanDisbursalToMoMo').closeModal();
          $scope.amount = '';
          $scope.phoneNumber = '';
        };

        // function to go back to source page
        $scope.goBack = function(){
          window.history.back();
        };
}]);