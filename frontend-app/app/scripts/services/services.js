'use strict'
/* global $ */

angular.module('mobileMoneyApp')
	/* factory for authentication */
	.factory('authFactory', ['$http', function($http){
		
		var baseUrl = "";
		var authFactory = {};
		
		authFactory.getAuthKey = function(username, password){
			return $http.post(baseUrl, username, password);
		};
		
		return authFactory;
	}])
	
	/* factory to get client data */
	.factory('dataFactory', ['$http', function($http){
		
		var urlBase = '';
		var dataFactory = {};
		
		dataFactory.getAllClients = function(){
			return $http.get(urlBase + "/clients");
		};
		
		dataFactory.getClient = function(clientId){
			return $http.get(urlBase + "/clients/" + clientId);
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
		
		var baseUrl = "";
		var utilFactory = {};
		
		return utilFactory;
	}])
	
	