'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('mainCtrl', function ($scope, dataService) {

      $scope.clients; 
      $scope.status = null;

      $scope.getClients = function(){
        dataService.getAllClients()
          .then(function(response){
            console.log(response.data);
            $scope.clients = response.data;
          }, function(error){
            $scope.status = "Unable to load client data: " + error.message;
            console.log($scope.status);
          })
      };

      $scope.getClients();

      $scope.testAuth = function(){
          //loginService.getBasicKey("mifos", "password");
            
          //loginService.setAuthorization();
          //loginService.test();
      };

      console.log("Testing now: ");
      $scope.testAuth();
  });
