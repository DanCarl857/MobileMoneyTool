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
  		var baseApiUrl = "https://demo.openmf.org/fineract-provider/api/v1/";
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
  			// did this because the request seems to expect json input
  			var loginCreds = {};
  			loginCreds.username = username;
  			loginCreds.password = password;
  			
  			var authKeyRequest = baseApiUrl + "authentication?username="+ loginCreds.username + "&password=" + loginCreds.password + "&"+endUrl;
  			console.log(authKeyRequest);
  			$http({
  				method: 'POST',
  				url: authKeyRequest,
  				cache: false,
  				dataType: 'json',
  				contentType: "application/json; charset=utf-8"
  			})
  			.success(function(data){
  				basicAuthKey = data.base64EncodedAuthenticationKey;
  				console.log(basicAuthKey);
  				return basicAuthKey;
  			})
  			.error(function(data){
  				console.log("Error with getting basic authentication key");
  			})
  		};

  		return service;
  }]);