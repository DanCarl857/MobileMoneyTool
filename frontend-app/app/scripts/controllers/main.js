'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('mainCtrl', ['$rootScope', '$http', '$scope', 'dataService', function ($scope, $http, dataService) {

      $scope.clients = [];
      $scope.totalClients = 0;
      $scope.status = null;
      var basicKey = '';

      /*$scope.getClients = function(){
        dataService.getAllClients()
          .then(function(response){
            console.log(response.data);
            $scope.clients = response.data;
          }, function(error){
            $scope.status = "Unable to load client data: " + error.message;
            console.log($scope.status);
          })
      };

      $scope.getClients();*/

      var service = {};
      var baseApiUrl = "https://demo.openmf.org/fineract-provider/api/v1/";
      var endUrl = "tenantIdentifier=default";
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
        console.log(authKeyRequest);
        $http.post(authKeyRequest, config)
          .success(function(data){
            basicAuthKey = data.base64EncodedAuthenticationKey;
            console.log("key in main: "+ basicAuthKey);

            // set authorization in header
            $http.defaults.headers.common['Authorization'] = 'Basic ' + basicAuthKey;

            // make request to get all clients 
            var clientsRequest = baseApiUrl + "clients";

            console.log(clientsRequest);
            $http.get(clientsRequest)
              .success(function(data){
                $scope.data = data.pageItems;
                $scope.totalClients = data.totalFilteredRecords;

                var keys = [];
                for(var i = 0; i < $scope.totalClients; i++){
                  var obj = $scope.data[i];
                  keys.push(obj);
                  for(var key in obj){
                    var name = obj["displayName"];
                    var id = obj["id"];
                    console.log(id + " " + name);
                  }
                }
              })
              .error(function(data){
                console.log("Error getting clients");
              });
          })
          .error(function(data){
            console.log("Error authenticating in main");
          });
          
  }]);
