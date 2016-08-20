'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('saveMoneyCtrl', ['$rootScope', '$scope', '$stateParams', '$state', 'authFactory', 'dataFactory', 
    function ($rootScope, $scope, $stateParams, $state, authFactory, dataFactory) {
  		
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
  .controller('processSaveCtrl', ['$rootScope', '$scope', '$stateParams', '$state', 'mobileMoneyFactory', 'utilFactory',
  	function($rootScope, $scope, $stateParams, $state, mobileMoneyFactory, utilFactory){
        // show modal when client submits form
        $(document).ready(function(){
          $('.modal-trigger').leanModal();
  		    $('.collapsible').collapsible();
        });

        $scope.submitted = true;
		    $rootScope.accountId = $stateParams.accId;
		
        // function to submit form
        $scope.submitSaveForm = function(){
          if($scope.saveForm.$valid){
            console.info("Submitting collected data");
            $scope.submitted = false;
            $scope.saveMoneyRequest($rootScope.clientId);
          }
        };
		
		$scope.saveMoneyRequest = function(clientId){
      // open modal
      $('#saveMoneyModal').openModal({
        dismissible: false,
        opacity: '.5'
      });

			$scope.accountId = "4904123";
			mobileMoneyFactory.transactions($scope.phoneNumber, $scope.amount, clientId, $scope.accountId, 2)
				.then(function(response){
					$scope.data = response.data;
          console.info("Processing savings mobile money transaction");
					
					utilFactory.savings($rootScope.accountId, $scope.amount, $rootScope.todayDate)
						.then(function(response){
			  			  	// close the modal and clean up 
			            Materialize.toast('Transaction successful', 6000, 'rounded');
			            $scope.cleanUp();
						}, function(error){
			                // close the modal and clean up 
			                Materialize.toast('Transaction unsuccessful', 6000, 'rounded');
			                $scope.cleanUp();
						})
				}, function(error){});
		};
		
        // function to clean up
        $scope.cleanUp = function(){
          console.info("Transaction processing complete. Cleaning up now");
          $('#saveMoneyModal').closeModal();
          $scope.amount = '';
          $scope.phoneNumber = '';
        };
  }]);
