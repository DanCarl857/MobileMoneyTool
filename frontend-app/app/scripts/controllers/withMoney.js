'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('withMoneyCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams', '$state', 'authFactory', 'dataFactory',
    function ($rootScope, $scope, $http, $timeout, $stateParams, $state, authFactory, dataFactory) {

      // client's details
      $rootScope.clientId = $stateParams.id;
      // show spinner
      $scope.loading = true;
	  
	  authFactory.getAuthKey($rootScope.username, $rootScope.password)
	  		.then(function(response){
				var basicKey = response.data.base64EncodedAuthenticationKey;
				authFactory.setBasicAuthKey(basicKey);
				
				dataFactory.getClientDetails($rootScope.clientId)
					.then(function(response){
			          	$scope.data = response.data;
			          	$scope.clientName = $scope.data.displayName;
			          	$scope.accountNo = $scope.data.accountNo;
			          	$scope.staffName = $scope.data.staffName;
			          	$scope.activDate = new Date($scope.data.activationDate);
						$scope.activationDate = $scope.activDate.toDateString();
						$rootScope.dateToUse = $scope.activationDate.substring(4);
			          	$scope.officeName = $scope.data.officeName;
			          	$scope.userName = $scope.data.timeline.activatedByUsername;
						
						dataFactory.getClientAccounts($rootScope.clientId)
							.then(function(response){
				              	// get and display client account details here
								$scope.loanAccounts = response.data.loanAccounts;
								$scope.savingsAccounts = response.data.savingsAccounts;
								$scope.loading = false;
							}, function(error){});
					}, function(error){});
	  		}, function(error){});
  }])
  
  // controller which actually processes withdrawal transaction
  .controller('processWithCtrl', ['$rootScope', '$scope', '$http', '$stateParams', '$state', 'mobileMoneyFactory', 'utilFactory',
  	function($rootScope, $scope, $http, $stateParams, $state, mobileMoneyFactory, utilFactory){
		
        // activate modals
        $(document).ready(function(){
          	$('.modal-trigger').leanModal();
  			$('.collapsible').collapsible();
        });
		
		$scope.submitted = true;
		$rootScope.accountId = $stateParams.accId;
		
        // function to submit the form after all form validation
        $scope.submitForm = function(){
           // Check to make sure the form is completely valid
           if($scope.withForm.$valid){
             $scope.submitted = false;
             $scope.withMoneyRequest($rootScope.clientId);
           }
        };
		
		$scope.withMoneyRequest = function(clientId){
			// open modal
			$('#withModal').openModal({
				dismissible: false,
				opacity: '.5'
			});
			
			mobileMoneyFactory.transactions($scope.phoneNumber, $scope.amount, clientId, $scope.accountId, 1)
				.then(function(response){
					$scope.data = response.data;
					
					utilFactory.withdrawals($rootScope.accountId, $scope.amount, $rootScope.dateToUse)
						.then(function(response){
				            // close the modal and clean up 
				            Materialize.toast('Transaction successful', 6000, 'rounded');
				            $scope.cleanUp();
						}, function(error){
				            // close the modal and clean up 
							$scope.cleanUp();
				            Materialize.toast('Transaction unsuccessful', 6000, 'rounded');
						});
				}, function(error){});
		};
		
        // function to clean up
        $scope.cleanUp = function(){
		  console.log("Now cleaning up modal thingz :-)");
          $('#withModal').closeModal();
          $scope.amount = '';
          $scope.phoneNumber = '';
        };
  }]);
