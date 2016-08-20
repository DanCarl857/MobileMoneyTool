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
						console.info("Getting client details");
			          	$scope.data = response.data;
			          	$scope.clientName = $scope.data.displayName;
			          	$scope.accountNo = $scope.data.accountNo;
			          	$scope.staffName = $scope.data.staffName;
			          	$scope.activDate = new Date($scope.data.activationDate);
						$scope.activationDate = $scope.activDate.toDateString();

						// now get the date of today
						$scope.newDate = new Date();
						$scope.newDate1 = $scope.newDate.toDateString();
						$rootScope.todayDate = $scope.newDate1.substring(4);


			          	$scope.officeName = $scope.data.officeName;
			          	$scope.userName = $scope.data.timeline.activatedByUsername;
						
						dataFactory.getClientAccounts($rootScope.clientId)
							.then(function(response){
								console.info("Getting client account details");
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
		$scope.moAccountId = "4904123";
		
        // function to submit the form after all form validation
        $scope.submitForm = function(){
           // Check to make sure the form is completely valid
           if($scope.withForm.$valid){
           	 console.info("Submitting collected data");
             $scope.submitted = false;
             $scope.withMoneyRequest($rootScope.clientId);
           }
        };
		
		$scope.withMoneyRequest = function(clientId){
			// decide which modal to open
			if($state.current.url == "/processTransfer"){
				$('#sendMoneyModal').openModal({
					dismissible: false,
					opacity: '.5'
				});
			} else {
				$('#withModal').openModal({
					dismissible: false,
					opacity: '.5'
				});
			}
			
			mobileMoneyFactory.transactions($scope.phoneNumber, $scope.amount, clientId, $scope.moAccountId, 1)
				.then(function(response){
					console.info("Processing mobile money transaction");
					$scope.data = response.data;

					if($state.current.url == "/processTransfer"){
						console.log("Jeez");
						mobileMoneyFactory.sendMoney($scope.phone, $scope.amount, $scope.rec_name, clientId, $rootScope.accountId)
                			.then(function(response){
                    			$scope.data = response.data;
                    
			                    utilFactory.withdrawals($rootScope.accountId, $scope.amount, $rootScope.todayDate)
			                        .then(function(response){
			                            // close the modal and clean up 
			                            Materialize.toast('Transaction successful', 6000, 'rounded');
			                            $('#sendMoneyModal').closeModal();
			                            $scope.amount = '';
			                            $scope.phoneNumber = '';
			                        }, function(error){
			                            Materialize.toast('Transaction unsuccessful', 6000, 'rounded');
			                            $('#sendMoneyModal').closeModal();
			                            $scope.amount = '';
			                            $scope.phoneNumber = '';
			                        });
                		}, function(error){});
					} else{
						utilFactory.withdrawals($rootScope.accountId, $scope.amount, $rootScope.todayDate)
						.then(function(response){
							console.info("Processing withdrawal mobile money transaction");
				            // close the modal and clean up 
				            Materialize.toast('Transaction successful', 6000, 'rounded');
				            $scope.cleanUp();
						}, function(error){
				            // close the modal and clean up 
							$scope.cleanUp();
				            Materialize.toast('Transaction unsuccessful', 6000, 'rounded');
						});
					}
				}, function(error){
					// close the modal and clean up 
					$scope.cleanUp();
					$('#sendMoneyModal').closeModal();
			        $scope.amount = '';
			        $scope.phoneNumber = '';
			        $scope.rec_name = '';
			  		$scope.rec_phone = '';
				    Materialize.toast('Transaction unsuccessful', 6000, 'rounded');
				});
		};
		
        // function to clean up
        $scope.cleanUp = function(){
		  console.info("Process completed. Cleaning up now");
          $('#withModal').closeModal();
          $scope.amount = '';
          $scope.phoneNumber = '';
        };
  }]);
