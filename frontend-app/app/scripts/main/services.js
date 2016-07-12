'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .service('dataService', ['$http', function($http){
    var baseURL = 'scripts/clients.json';

    this.getAllClients = function(){
      return $http.get(baseURL);
    }
  }])
  .service('AuthenticationService', ['$http', '$timeout', function($http, $timeout){
  		var service = {};
  		var baseApiUrl = "https://demo.openmf.org";
  		var prodApiUrl = "/fineract-provider/api/";
  		var endUrl = "tenantIdentifier=default";
  		var basicAuthKey;

  		service.Login = function(username, password){

  			/* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function(){
                var response = { success: username === 'mifos' && password === 'password' };
                if(!response.success) {
                    response.message = 'Username or password is incorrect';
                }
                callback(response);
            }, 1000);

            /* Use this for real authentication */

  		};

  		service.ClearCredentials = function(){

  		};

  		service.SetBasicAuthKey = function(username, password){
  			var loginCreds = {};
  			loginCreds.username = username;
  			loginCreds.password = password;
  			console.log(loginCreds.username);
  			console.log(loginCreds.password);
  			var authKeyRequest = "https://localhost:8443" + prodApiUrl + "authentication?username="+ loginCreds.username + "&password=" + loginCreds.password + "&"+endUrl;
  			console.log(authKeyRequest);
  			$http({
  				method: 'POST',
  				url: authKeyRequest,
  				cache: false,
  				dataType: 'json',
  				contentType: "application/json; charset=utf-8"
  			})
  			.success(function(data){
  				// basicAuthKey = data.base64EncodedAuthenticationKey;
  				// console.log("Basic auth key: " + basicAuthKey);
  				console.log("Basic auth key: " + data);
  			})
  			.error(function(data){
  				console.log("Error with getting basic authentication key");
  			})
  		};

  		return service;
  }]);