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
						$rootScope.dateToUse = $scope.activationDate.substring(4);
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
	
	.controller('processLoanCtrl', ['$rootScope', '$scope', '$http', '$stateParams', 'mobileMoneyFactory',
		function($rootScope, $scope, $http, $stateParams, mobileMoneyFactory){
			$rootScope.accountId = $stateParams.accId;
	}])
	
	.controller("processLoansWithSavingsCtrl", ['$rootScope', '$scope', '$http', '$stateParams',
		function($rootScope, $scope, $http, $stateParams){
	        // show modal when client submits form
	        $(document).ready(function(){
	          	$('.modal-trigger').leanModal();
	  			$('.collapsible').collapsible();
	        });

	        $scope.submitted = true;

	        // function to submit the form after all form validation
	        $scope.submitForm = function(){
	           // Check to make sure the form is completely valid
	           if($scope.loanForm.$valid){
	             $scope.submitted = false;
	             $scope.loanRequest($rootScope.clientId);
	           }
	        };

	        // function to clean up
	        $scope.cleanUp = function(){
			  console.log("Now cleaning up modal thingz :-)");
	          $('#loanRepayModal1').closeModal();
	          $scope.amount = '';
	          $scope.phoneNumber = '';
	        };

	        // function to go back to source page
	        $scope.goBack = function(){
	          window.history.back();
	        };
	}])
	
	.controller("processLoanFinaleCtrl", ['$rootScope', '$scope', '$http', '$stateParams', 'mobileMoneyFactory', 'loanFactory',
		function($rootScope, $scope, $http, $stateParams, mobileMoneyFactory, loanFactory){
			$scope.submitted = true;
	        // show modal when client submits form
	        $(document).ready(function(){
	          	$('.modal-trigger').leanModal();
	  			$('.collapsible').collapsible();
	        });
			
	        // function to submit the form after all form validation
	        $scope.submitLoanForm = function(){
				
	           // Check to make sure the form is valid
	           if($scope.loanForm.$valid){
	             $scope.submitted = false;
	             $scope.loanRepayments($rootScope.clientId);
	           }
	        };
			
			$scope.loanRepayments = function(clientId){
  	          // open the modal
  	          $('#loanRepayModal').openModal({
  	            dismissible: false,
  	            opacity: '.5'
  	          });
			  
			  // make request to mobile money engine
			  $scope.accountId = "4904123";
			  mobileMoneyFactory.transactions($scope.phoneNumber, $scope.amount, clientId, $scope.accountId, 3)
			  	.then(function(response){
			  		loanFactory.loanRepayments($rootScope.accountId, $scope.amount, $rootScope.dateToUse);
					
		            // close the modal and clean up 
		            Materialize.toast('Transaction successful', 6000, 'rounded');
		            $scope.cleanUp();
			  	}, function(error){
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
		}]);