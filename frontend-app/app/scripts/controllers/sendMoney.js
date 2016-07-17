'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('sendMoneyCtrl', ['$scope', '$http', '$stateParams', '$state', 
    function ($scope, $http, $stateParams, $state) {
  		  // client's details
      var clientId = $stateParams.id;
      console.log(clientId);

      // show modal when client submits form
      $(document).ready(function(){
        $('.modal-trigger').leanModal();
      });

        $scope.submitted = true;
        var baseUrl = "http://localhost:8090/api/v1/send";

        // function to submit the form
        $scope.submitSendForm = function(){
          if($scope.sendForm.$valid){
            $scope.submitted = false;
            $scope.sendMoneyRequest(clientId);
          }
        };

        $scope.amount = '';
        $scope.phone = '';
        $scope.rec_name = '';
        $scope.rec_phone = '';

        $scope.sendMoneyRequest = function(clientId){
          // open the modal
          $('#withModal').openModal({
            dismissible: false,
            opacity: '.5'
          });

          var sendRequestUrl = baseUrl + "?phone=" + $scope.phone + "&amount=" + $scope.amount + "&recipient=" + $scope.rec_name + "&clientId=" + clientId;
          console.log(sendRequestUrl);
          $http({
            method: "GET",
            url: sendRequestUrl
          }).success(function(data){
            $scope.data = data;

            // close the modal and clean up 
            Materialize.toast('Transaction successful', 6000, 'rounded');
            $scope.cleanUp();
            console.log("data: "+ $scope.data);
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
