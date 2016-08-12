'use strict';
/* global $ */
/* Materialize */

angular.module('mobileMoneyApp')
	.controller('loanCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams', 'authFactory', 'dataFactory',
		function($rootScope, $scope, $http, $timeout, $stateParams, authFactory, dataFactory){

        // show spinner
        $scope.loading = true;
		$rootScope.clientId = $stateParams.id;
		
		authFactory.getAuthKey($rootScope.username, $rootScope.password)
			.then(function(response){
				var basicKey = response.data.base64EncodedAuthenticationKey;
				authFactory.setBasicAuthKey(basicKey);
				
				// get the personal details for a particular client
				dataFactory.getClientDetails($rootScope.clientId)
					.then(function(response){
		            	$scope.data = response.data;
		            	$scope.clientName = $scope.data.displayName;
		            	$rootScope.accountNo = $scope.data.accountNo;
						$rootScope.accountId = $scope.data.id;
		            	$scope.staffName = $scope.data.staffName;
			          	$scope.activDate = new Date($scope.data.activationDate);
						$scope.activationDate = $scope.activDate.toDateString();
		            	$scope.officeName = $scope.data.officeName;
		            	$scope.userName = $scope.data.timeline.activatedByUsername;
						
						// get client's account details
						dataFactory.getClientAccounts($rootScope.clientId)
							.then(function(response){
			  					$scope.loanAccounts = response.data.loanAccounts;
			  					$rootScope.savingsAccounts = response.data.savingsAccounts;
			  					$scope.loading = false;
							}, function(error){});
					}, function(error){});
			}, function(error){});
	}])
	
	.controller('processLoanCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams',
		function($rootScope, $scope, $http, $timeout, $stateParams){
			
			$rootScope.accountId = $stateParams.accId;
			
	        // show modal when client submits form
	        $(document).ready(function(){
	          	$('.modal-trigger').leanModal();
	  			$('.collapsible').collapsible();
	        });
	        $scope.submitted = true;
	        var baseUrl = "http://localhost:8090/api/v1/withdrawals";

	        // function to submit the form after all form validation
	        $scope.submitLoanForm = function(){
				
	           // Check to make sure the form is completely valid
	           if($scope.loanForm.$valid){
	             $scope.submitted = false;
	             $scope.loanRequest($rootScope.clientId);
	           }
	        };
		
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

	        // function to clean up
	        $scope.cleanUp = function(){
			  console.log("Now cleaning up modal thingz :-)");
			  $('.lean-overlay').remove();
	          $('#loanRepayModal').closeModal();
	          $scope.amount = '';
	          $scope.phoneNumber = '';
	        };

	        // function to go back to source page
	        $scope.goBack = function(){
	          window.history.back();
	        };
	}])
	
	.controller("processLoansWithSavingsCtrl", ['$rootScope', '$scope', '$http', '$stateParams',
		function($rootScope, $scope, $http, $stateParams){
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
	           if($scope.loanForm.$valid){
	             $scope.submitted = false;
	             $scope.loanRequest($rootScope.clientId);
	           }
	        };
		
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
	          }).error(function(){
	            // close the modal and clean up 
				$scope.cleanUp();
	            Materialize.toast('Transaction unsuccessful', 6000, 'rounded');
	          });
	      	};

	        // function to clean up
	        $scope.cleanUp = function(){
			  console.log("Now cleaning up modal thingz :-)");
	          $('#loanRepayModal').closeModal();
	          $scope.amount = '';
	          $scope.phoneNumber = '';
	        };

	        // function to go back to source page
	        $scope.goBack = function(){
	          window.history.back();
	        };
	}]);