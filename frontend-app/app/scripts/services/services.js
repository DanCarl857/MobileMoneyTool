'use strict';

angular.module('mobileMoneyApp')
	/* factory for authentication */
	.factory('authFactory', ['$http',
		function($http){
		
		var baseUrl = "https://demo.openmf.org/fineract-provider/api/v1/";
		var authFactory = {};
		
		authFactory.getAuthKey = function(username, password){
	        var loginCreds = {};
	        loginCreds.username = "mifos";
	        loginCreds.password = "password";
			
	        var config = {
	          cache: false,
	          dataType: 'json',
	          contentType: "application/json; charset=utf-8"
	        };
			
			var authKeyRequest = baseUrl + "authentication?username="+ loginCreds.username + "&password=" + loginCreds.password + "&" 									+ "tenantIdentifier=default";
			return $http.post(authKeyRequest, config);
		};
		
		authFactory.setBasicAuthKey = function(key){
			$http.defaults.headers.common['Authorization'] = 'Basic ' + key;
		}
		
		return authFactory;
	}])
	
	/* factory to get client data */
	.factory('dataFactory', ['$http', function($http){
		
		var urlBase = "https://demo.openmf.org/fineract-provider/api/v1/";
		var dataFactory = {};
		
		dataFactory.getAllClients = function(){
			return $http.get(urlBase + "clients");
		};
		
		dataFactory.getClient = function(clientId){
			return $http.get(urlBase + "clients/" + clientId);
		};
		
		dataFactory.getClientAccounts = function(clientId){
			return $http.get(urlBase + "/clients/" + clientId + "/accounts");
		};
		
		dataFactory.getClientImage = function(clientId){
			return $http.get(urlBase + "/clients/" + clientId + "/images");
		};
		
		return dataFactory;
	}])
	
	/* mobile money engine processes */
	.factory('mobileMoneyFactory', ['$http', function($http){
		
		var baseUrl = "";
		var mobileMoneyFactory = {};
		
		mobileMoneyFactory.transactions = function(phone, amount, clientId, accountId, val){
			if(val == 1){
				return $http.get(baseUrl + "withdrawals/" + phone + "/" + amount + "/" + clientId + "/" + accountId);
			}
			return $http.get(baseUrl + "savings/" + phone + "/" + amount + "/" + clientId + "/" + accountId);
		};
		
		mobileMoneyFactory.sendMoney = function(phone, amount, recipient, clientId, accountId){
			return $http.get(baseUrl + "send/" + phone + "/" + amount + "/" + recipient + "/" + clientId + "/" + accountId);
		};
		
		return mobileMoneyFactory;
	}])
	
	/* utilities for the mobile money engine*/
	.factory('utilFactory', ['$http', function($http){
		
		var baseUrl = "http://localhost:8090/api/v1/transactions";
		var utilFactory = {};
		
		utilFactory.getAllTransactions = function(){
			return $http.get(baseUrl);
		};
		
		return utilFactory;
	}])
	
	/* factory for loan repayment */
	.factory('loanFactory', ['$http', function($http){
		
		var baseUrl = "";
		var loanFactory = {};
		
		return loanFactory;
	}]);
	