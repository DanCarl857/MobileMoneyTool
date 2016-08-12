'use strict';
/* global $ */
/* global Materialize */
angular.module('mobileMoneyApp')
  .controller('loanDisbursalCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams', 'authFactory', 'dataFactory', 
	function ($rootScope, $scope, $http, $timeout, $stateParams, authFactory, dataFactory) {
		
    // show spinner
    $scope.loading = true;
	
    // client's details
    $rootScope.clientId = $stateParams.id;
	
	// authenticate user
	authFactory.getAuthKey($rootScope.username, $rootScope.password)
    	.then(function (response) {
			var basicKey = response.data.base64EncodedAuthenticationKey;
			authFactory.setBasicAuthKey(basicKey);
	
			// get client data
			dataFactory.getClientDetails($scope.clientId)
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
					
					// get client account Info
					dataFactory.getClientAccounts($scope.clientId)
						.then(function(response){
							$scope.loanAccounts = response.data.loanAccounts;
							$rootScope.savingsAccounts = response.data.savingsAccounts;
							$scope.loading = false;
						}, function(error){});
				}, function(error){});
    	}, function (error){});
}])

.controller('disburseToSavingsCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams', 'loanFactory',
	function($rootScope, $scope, $http, $timeout, $stateParams, loanFactory){
		
		$rootScope.accountId = $stateParams.accId;
		
        $(document).ready(function(){
          	$('.modal-trigger').leanModal();
  			$('.collapsible').collapsible();
        });
		
		$scope.disburseToSavings = function(){
	        $('#loanDisbursalToSavings').openModal({
	          dismissible: false,
	          opacity: '.5'
	        });
			
			loanFactory.disburseToSavingsProcess($rootScope.accountId, $rootScope.dateToUse)
				.then(function(response){
                	Materialize.toast('Loan successfully disbursed to Savings account', 6000, 'rounded');
					$('.lean-overlay').remove();
                	$('#loanDisbursalToSavings').closeModal();
				}, function(error){
                	Materialize.toast('Failure to disburse loans.No savings account has been configured for this', 6000, 'rounded');
					$('.lean-overlay').remove();
                	$('#loanDisbursalToSavings').closeModal();
				});
		};
}])

.controller('disburseToMoMoCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams', 'mobileMoneyFactory', 'loanFactory',
	function($rootScope, $scope, $http, $timeout, $stateParams, mobileMoneyFactory, loanFactory){
  	
      $scope.submitted = true;

      // function to submit the form after all form validation
      $scope.submitDisbursalForm = function(){
		
         // Check to make sure the form is valid
         if($scope.disburseForm.$valid){
           $scope.submitted = false;
           $scope.loanRequest($rootScope.clientId);
         }
      };
	  
	  $scope.loanRequest = function(clientId){
	  		// open modal when user submits valid form
		  	$('#loanDisbursalToMoMo').openModal({
		  		dismissible: false,
				opacity: '.5'
		  	});
			
			// make request to mobile money engine
			// 1 - withdrawal
			// 2 - savings
			// 3 - loan transactions
			mobileMoneyFactory.transactions($scope.phoneNumber, $scope.amount, clientId, $scope.accountId, 1)
				.then(function(response){
					// since transaction is successful, 
					// update the platform of these changes
					loanFactory.disburseToMoMo($scope.accountId, $scope.amount, $rootScope.dateToUse)
						.then(function(response){
		                	Materialize.toast('Loan successfully disbursed to Savings account', 6000, 'rounded');
							$('.lean-overlay').remove();
		                	$('#loanDisbursalToMoMo').closeModal();
						}, function(){
		                	Materialize.toast('Failure to disburse loans to mobile money account', 6000, 'rounded');
							$('.lean-overlay').remove();
		                	$('#loanDisbursalToMoMo').closeModal();
						});
				});
	  };
}]);