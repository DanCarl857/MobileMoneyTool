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

						// now get the date of today
						$scope.newDate = new Date();
						$scope.newDate1 = $scope.newDate.toDateString();
						$rootScope.todayDate = $scope.newDate1.substring(4);

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
	
	.controller("processLoanFinaleCtrl", ['$rootScope', '$scope', '$http', '$stateParams', 'mobileMoneyFactory', 'loanFactory',
		function($rootScope, $scope, $http, $stateParams, mobileMoneyFactory, loanFactory){
			$scope.submitted = true;
			$rootScope.accountId = $stateParams.accId;
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
				console.info(clientId);
  	          // open the modal
  	          $('#loanRepayModal').openModal({
  	            dismissible: false,
  	            opacity: '.5'
  	          });
			  
			  // make request to mobile money engine
			  $scope.accountId = "4904123";
			  mobileMoneyFactory.transactions($scope.phoneNumber, $scope.amount, clientId, $scope.accountId, 3)
			  	.then(function(response){
			  		loanFactory.loanRepayments($rootScope.accountId, $scope.amount, $rootScope.todayDate);
					
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
			  $('.lean-overlay').remove();
	          $('#loanRepayModal').closeModal();
	          $scope.amount = '';
	          $scope.phoneNumber = '';
	        };
		}]);