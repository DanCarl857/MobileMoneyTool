'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('mainCtrl', ['$rootScope', '$http', '$scope', 
	function ($scope, $http) {
		
      $scope.totalClients = 0;
      $scope.clients = [];

      $scope.loading = true;

      var service = {};
      var baseApiUrl = "https://demo.openmf.org/fineract-provider/api/v1/";
      var endUrl = "tenantIdentifier=default";
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
        $http.post(authKeyRequest, config)
          .success(function(data){
            basicAuthKey = data.base64EncodedAuthenticationKey;

            // set authorization in header
            $http.defaults.headers.common['Authorization'] = 'Basic ' + basicAuthKey;

            // make request to get all clients 
            var clientsRequest = baseApiUrl + "clients";
            $http.get(clientsRequest)
              .success(function(data){
                $scope.clients = data.pageItems;
                $scope.totalClients = data.totalFilteredRecords;
                $scope.loading = false;
              })
              .error(function(data){
                console.log("Error getting clients");
              });
          })
          .error(function(data){
            console.log("Error authenticating in main");
          });
  }]);
