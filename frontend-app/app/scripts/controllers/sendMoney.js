'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('sendMoneyCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams', '$state', 
    function ($rootScope, $scope, $http, $timeout, $stateParams, $state) {
		
        // client's details
        $rootScope.clientId = $stateParams.id;
        $scope.clientNo = '';
        $scope.clientName = '';
        $scope.staffName = '';
   	  	$scope.loanAccounts = [];
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
  					$scope.savingsAccounts = response.savingsAccounts;
					$scope.loanAccounts = response.loanAccounts;
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
  
  .controller('processSendCtrl', ['$scope', '$http', '$stateParams', '$state',
  	function($rootScope, $scope, $http, $stateParams, $state){

    console.log("In the send Money process");
		
		// required fields
        $scope.amount = '';
        $scope.phone = '';
        $scope.rec_name = '';
        $scope.rec_phone = '';
		
        // show modal when client submits form
        $(document).ready(function(){
          $('.modal-trigger').leanModal();
        });

          $scope.submitted = true;
          var baseUrl = "http://localhost:8090/api/v1/send";

          // function to submit the form
          $scope.submitSendForm = function(){
			console.log("Testing in process ctrl");
            if($scope.sendForm.$valid){
              $scope.submitted = false;
              $scope.sendMoneyRequest($rootScope.clientId);
            }
          };
		  
          $scope.sendMoneyRequest = function(clientId){
			console.log("in send money request");
            // open the modal
            $('#sendMoneyModal').openModal({
              dismissible: false,
              opacity: '.5'
            });

            var sendRequestUrl = baseUrl + "?phone=" + $scope.phone + "&amount=" + $scope.amount + "&recipient=" + $scope.rec_name + "&clientId=" + clientId;
            $http({
              method: "GET",
              url: sendRequestUrl
            }).success(function(data){
              $scope.data = data;

			  // now effect changes on the mifos platform
			  // TODO: make use of service for all this
			  var mifosUrl = "https://demo.openmf.org/fineract-provider/api/v1/";
			  var changeRequestUrl = mifosUrl + "savingsaccounts/" + 321 + "/transactions?command=withdrawal";
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
			  
              // close the modal and clean up 
              Materialize.toast('Transaction successful', 6000, 'rounded');
              $scope.cleanUp();
            }).error(function(data){
              console.log("Error with sending money: "+ data);
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
