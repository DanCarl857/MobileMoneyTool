'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('saveMoneyCtrl', ['$scope', '$http', '$stateParams', '$state', 
    function ($scope, $http, $stateParams, $state) {
  		
      // client's details
      var clientId = $stateParams.id;
      console.log(clientId);

      // show modal when client submits form
      $(document).ready(function(){
        $('.modal-trigger').leanModal();
      });

      $scope.submitted = true;
      var baseUrl = "http://localhost:8090/api/v1/savings";

      // function to submit form
      $scope.submitSaveForm = function(){
        if($scope.saveForm.$valid){
          $scope.submitted = false;
          $scope.saveMoneyRequest(clientId);
        }
      };

      $scope.amount = '';
      $scope.phoneNumber = '';

      // function to handle requests to the mobile money engine
      	$scope.saveMoneyRequest = function(clientId){
          // open the modal
          $('#withModal').openModal({
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
