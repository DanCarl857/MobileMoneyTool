'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('withMoneyCtrl', ['$scope', '$http', '$timeout', '$stateParams', '$state', 
    function ($scope, $http, $timeout, $stateParams, $state) {

      // client's details
      $scope.clientId = $stateParams.id;
      $scope.clientNo = '';
      $scope.clientName = '';
      $scope.staffName = '';
      console.log($scope.clientId + " " + $scope.clientName);
      $scope.loading = true;

      var baseApiUrl = "https://demo.openmf.org/fineract-provider/api/v1/";
      var endUrl = "tenantIdentifier=default";

      /* =================================================================== */
      var basicAuthKey;

        var loginCreds = {};
        loginCreds.username = "mifos";
        loginCreds.password = "password";

        $scope.clientsPerPage = 15;

        var config = {
          cache: false,
          dataType: 'json',
          contentType: "application/json; charset=utf-8"
        };
        
        var authKeyRequest = baseApiUrl + "authentication?username="+ loginCreds.username + "&password=" + loginCreds.password + "&"+endUrl;
        console.log(authKeyRequest);

        $http.post(authKeyRequest, config)
          .success(function(data){
            basicAuthKey = data.base64EncodedAuthenticationKey;
            console.log("key in main: "+ basicAuthKey);

            // set authorization in header
            $http.defaults.headers.common['Authorization'] = 'Basic ' + basicAuthKey;

            // make request to get client's information 
            var getClientDetails = baseApiUrl + "clients/" + $scope.clientId;
          console.log(getClientDetails);

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
          console.log("test data: "+ $scope.userName);

          // now get the client's account details
          var getClientAccountInfo = baseApiUrl + "clients/" + $scope.clientId + "/accounts";
          console.log(getClientAccountInfo);

          $http({
            method: "GET",
            url: getClientAccountInfo
          }).success(function(response){
              // get and display client accounts 
          });

          $scope.loading = false;
        }).error(function(data){
          console.log("Error retrieving client data");
        });
      }).error(function(data){
        console.log("Error authenticating in client_page");
      });

          /* ====================================================== */

      // show modal when client submits form
      $(document).ready(function(){
        $('.modal-trigger').leanModal();
      });

        $scope.submitted = true;
        var baseUrl = "http://localhost:8090/api/v1/withdrawals";

        // function to submit the form after all form validation
        $scope.submitForm = function(){
          // Check to make sure the form is completely valid
          if($scope.withForm.$valid){
            $scope.submitted = false;
            $scope.withMoneyRequest(clientId);
          }
        };
        
        $scope.amount = '';
        $scope.phoneNumber = '';

      	// function to handle requests to the mobile money engine
      	$scope.withMoneyRequest = function(clientId){
          // open the modal
          $('#withModal').openModal({
            dismissible: false,
            opacity: '.5'
          });

          $scope.accountId = "4904123";
	      	var requestUrl = baseUrl + "?phone=" + $scope.phoneNumber + "&amount=" + $scope.amount + "&clientId=" + clientId + "&accountId=" + $scope.accountId;
          console.log(requestUrl);
          $http({
            method: "GET",
            url: requestUrl
          }).success(function(data){
            $scope.data = data;
            console.log("Success with withdrawals: " + $scope.data);

            // close the modal and clean up 
            Materialize.toast('Transaction successful', 6000, 'rounded');
            $scope.cleanUp();
          }).error(function(data){
            // close the modal and clean up 
            Materialize.toast('Transaction unsuccessful', 6000, 'rounded');
            $scope.cleanUp();
          });
      	};

        // function to clean up
        $scope.cleanUp = function(){
          $('#withModal').closeModal();
          $scope.amount = '';
          $scope.phoneNumber = '';
        };

        // function to go back to source page
        $scope.goBack = function(){
          window.history.back();
        };
  }]);
