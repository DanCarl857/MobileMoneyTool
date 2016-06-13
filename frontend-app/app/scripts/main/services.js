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
  	var baseURL = "";
  	var apiVer = "/fineract-provider/api/v1";
  	var tenantIdentifier = "";
  	
  	var config = {
  		headers: {
  			'Content-Type': 'application/json;charset=utf-8;'
  		}
  	};

  	this.setBaseUrl = function(url){
  		baseURL = url;
  		console.log(baseURL);
  	};

  	this.setTenantIdentifier = function(tenant){
  		tenantIdentifier = tenant;
  		console.log(tenantIdentifier);
  	};

  	this.loginUser = function(username, password){
  		console.log("username: " + username + "and Password: " + password);
  		var loginUrl = "authentication?username" + username + "&password=" + password;

  		var data = $.param({
  			userName: username,
  			password: password
  		});

  		baseURL = "https://demo.openmf.org" +  apiVer + "/" + loginUrl;

  		$http.post(baseURL, data, config)
  			.success(function(response, status, headers, config){
  				basicAuthKey = response.base64EncodedAuthenticationKey;
  			})
  			.error(function(data, status, header, config){
  				console.log("Status: " + status + " header: " + header);
  			})
  	};
  }]);