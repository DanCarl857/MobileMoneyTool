'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .service('dataService', ['$http', function($http){
    var baseURL = 'scripts/clients.json';

    this.getAllClients = function(){
      return $http.get(baseURL);
    }
  }])
  .service('loginService', ['$http', function($http){
  		// variables
  		var baseURL = "/fineract-provider/api/v1";
  		var tBaseUrl = 'https://localhost:8443/fineract-provider/api/v1';
  		var basicAuthKey = "";

  		// function to get the basic token for HTTP authentication
  		this.getBasicKey = function(username, password){
        username = "mifos";
        password = "password";
  			var uri = "https://localhost:8443/fineract-provider/api/authentication?username=" + username + "&password=" + password;
  			var config = { headers: {'Content-Type': 'application/json; charset=utf-8'} };
  			$http({
  				method: "POST",
          url: uri
        })
  				.success(function(data, status){
  					basicAuthKey = data.access_token;
  					console.log("Basic key: " + basicAuthKey);
  					$http.defaults.headers.common.Authorization = "Basic " + basicAuthKey;
  					return basicAuthKey;
  				})
  				.error(function(data, status){
  					console.log("Getting basic auth key failed " + data);
  				});
  		}

  		/* function to set authorization using the generated key
  		this.setAuthorization = function(){
  			$http.defaults.headers.common.Authorization = "Basic " + getBasicKey();
  		}*/

  		// function to delete the authorization
  		this.cancelAuthorization = function(){
  			delete $http.defaults.headers.common.Authorization;
  		}

  		this.test = function(){
	  		$http.get("https://localhost:8443/fineract-provider/api/v1/clients")
	  			.success(function(response){

	  				console.log("Success: " + response);
	  				return response;
	  			})
	  			.error(function(response){
	  				console.log("Failure: " + response);
	  			})
  		}
  }]);