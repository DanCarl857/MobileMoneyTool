'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('withMoneyCtrl', ['$scope', '$http', '$timeout', '$stateParams', '$state', 
    function ($scope, $http, $timeout, $stateParams, $state) {

      // client's details
      var clientId = $stateParams.id;
      console.log(clientId);

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
