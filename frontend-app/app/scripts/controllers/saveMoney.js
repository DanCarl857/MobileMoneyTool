'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('saveMoneyCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams', '$state', 
    function ($rootScope, $scope, $http, $timeout, $stateParams, $state) {
  		
      // client's details
      $rootScope.clientId = $stateParams.id;
      $scope.accountNo = '';
      $scope.clientName = '';
      $scope.staffName = '';
 	  $scope.loanAccounts = [];
	  $scope.savingsAccounts = [];
	  
      $scope.amount = '';
      $scope.phoneNumber = '';
	  
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
            var getClientDetails = baseApiUrl + "clients/" + $scope.clientId;
          	console.log(getClientDetails);

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
          	var getClientAccountInfo = baseApiUrl + "clients/" + $scope.clientId + "/accounts";
          	$http({
            	method: "GET",
            	url: getClientAccountInfo
          	}).success(function(response){
              	// get and display client account details here
				$scope.loanAccounts = response.loanAccounts;
				$scope.savingsAccounts = response.savingsAccounts;
				$scope.loading = false;
          	});
        }).error(function(data){
          console.log("Error retrieving client data");
        });
      }).error(function(data){
        console.log("Error authenticating in client_page");
      });

          /* ====================================================== */
  }])
  .controller('processSaveCtrl', ['$rootScope', '$scope', '$http', '$stateParams', '$state',
  	function($rootScope, $scope, $http, $stateParams, $state){
        // show modal when client submits form
        $(document).ready(function(){
          $('.modal-trigger').leanModal();
  		$('.collapsible').collapsible();
        });

        $scope.submitted = true;
        var baseUrl = "http://localhost:8090/api/v1/savings";

        // function to submit form
        $scope.submitSaveForm = function(){
          if($scope.saveForm.$valid){
            $scope.submitted = false;
            $scope.saveMoneyRequest($rootScope.clientId);
          }
        };

        	// function to handle requests to the mobile money engine
        	$scope.saveMoneyRequest = function(clientId){
            // open the modal
            $('#sendMoneyModal').openModal({
              dismissible: false,
              opacity: '.5'
            });

            $scope.accountId = "4904123";
  	      	var srequestUrl = baseUrl + "?phone="+ $scope.phoneNumber + "&amount=" + $scope.amount + "&clientId="+ clientId + "&accountId=" + $scope.accountId;
            console.log(srequestUrl);
            $http({
              method: "GET",
              url: srequestUrl
            }).success(function(data){
              $scope.data = data;
              console.log("success with savings: " + $scope.data);

              // close the modal and clean up 
              Materialize.toast('Transaction successful', 6000, 'rounded');
              $scope.cleanUp();
            }).error(function(data){
              console.log("Error with saving money: "+ data);
              // close the modal and clean up 
              Materialize.toast('Transaction unsuccessful', 6000, 'rounded');
              $scope.cleanUp();
            })
        	};

          // function to clean up
          $scope.cleanUp = function(){
            $('#sendMoneyModal').closeModal();
            $scope.amount = '';
            $scope.phoneNumber = '';
          };

          $scope.goBack = function(){
            window.history.back();
          };
  }]);
