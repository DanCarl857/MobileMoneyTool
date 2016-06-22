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
  		var headers = {
  			'Access-Control-Allow-Origin': '*',
  			'Access-Control-Allow-Methods': 'POST< GET, OPTIONS, PUT',
  			'Content-Type': 'application/json',
  			'Accept': 'application/json'
  		};

  		// variables
  		var baseURL = "/fineract-provider/api/v1";
  		var tBaseUrl = '/demo.openmf.org';
  		var basicAuthKey = "";

  		// function to get the basic token for HTTP authentication
  		this.getBasicKey = function(username, password){
  			var uri = tBaseUrl + "/authentication?username=" + username + "&password=" + password;
  			var config = { headers: {'Content-Type': 'application/json; charset=utf-8'} };
  			var data = "";
  			$http({
  				method: "POST",
  				headers: headers,
  				url: uri,
  				data: data})
  				.success(function(data, status){
  					basicAuthKey = data.base64EncodedAuthenticationKey;
  					console.log(basicAuthKey);
  					$http.defaults.headers.common.Authorization = "Basic " + basicAuthKey;
  					return basicAuthKey;
  				})
  				.error(function(data, status){
  					console.log("Getting basic auth key failed");
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
	  		$http.get("https://demo.openmf.org/api/v1/clients")
	  			.success(function(response){

	  				console.log("Success: " + response);
	  				return response;
	  			})
	  			.error(function(response){
	  				console.log("Failure: " + response);
	  			})
  		}
  }]);