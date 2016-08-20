'use strict';

angular.module('mobileMoneyApp')

	/* factory for authentication */
	.factory('authFactory', ['$http',
		function($http){
		
		var baseUrl = "https://demo.openmf.org/fineract-provider/api/v1/";
		var authFactory = {};
		
		authFactory.getAuthKey = function(username, password){
	        var loginCreds = {};
	        loginCreds.username = username;
	        loginCreds.password = password
			
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
		};
		
		return authFactory;
	}])
	
	/* factory to get client data */
	.factory('dataFactory', ['$http', function($http){
		
		var urlBase = "https://demo.openmf.org/fineract-provider/api/v1/";
		var dataFactory = {};
		
		dataFactory.getAllClients = function(){
			return $http.get(urlBase + "clients");
		};
		
		dataFactory.getClientDetails = function(clientId){
			return $http.get(urlBase + "clients/" + clientId);
		};
		
		dataFactory.getClientAccounts = function(clientId){
			return $http.get(urlBase + "clients/" + clientId + "/accounts");
		};
		
		dataFactory.getClientImage = function(clientId){
			return $http.get(urlBase + "/clients/" + clientId + "/images");
		};
		
		return dataFactory;
	}])
	
	/* mobile money engine processes */
	.factory('mobileMoneyFactory', ['$http', function($http){
		
		var baseUrl = "http://localhost:8090/api/v1/";
		var mobileMoneyFactory = {};
		
		mobileMoneyFactory.transactions = function(phone, amount, clientId, accountId, val){
			if(val == 1){
				return $http.get(baseUrl + "withdrawals?phone=" + phone + "&amount=" + amount + "&clientId=" + clientId + "&accountId=" + accountId);
			} else if(val == 2){
				return $http.get(baseUrl + "savings?phone=" + phone + "&amount=" + amount + "&clientId=" + clientId + "&accountId=" + accountId);
			} else {
				return $http.get(baseUrl + "loans?phone=" + phone + "&amount=" + amount + "&clientId=" + clientId + "&accountId=" + accountId);
			}
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
		
		utilFactory.initTransactions = function(staff, office){
			var requestUrl = "http://localhost:8090/api/v1/create?staff=" + staff + "&office=" + office; 
			return $http.get(requestUrl);
		};
		
		utilFactory.withdrawals = function(accountId, amount, dateToUse){
				var url = "https://demo.openmf.org/fineract-provider/api/v1/savingsaccounts/" + accountId
					 + "/transactions?command=withdrawal";

		      	return $http({
		      		method: "POST",
		      		url: url,
		      		data: {
					  "locale": "en",
					  "dateFormat": "MMMM dd yyyy",
					  "transactionDate": dateToUse,
					  "transactionAmount": amount,
					  "paymentTypeId": "",
					  "accountNumber": "",
					  "checkNumber": "",
					  "routingCode": "",
					  "receiptNumber": "",
					  "bankNumber": ""
					}
		      	});
			};
			
			utilFactory.savings = function(accountId, amount, dateToUse){
				var url = "https://demo.openmf.org/fineract-provider/api/v1/savingsaccounts/" + accountId 
					+ "/transactions?command=deposit";

		      	return $http({
		      		method: "POST",
		      		url: url,
		      		data: { 
					  "locale" : "en",
					  "dateFormat": "MMMM dd yyyy",
					  "transactionDate": dateToUse,
					  "transactionAmount": amount,
					  "paymentTypeId": "",
					  "accountNumber": "",
					  "checkNumber": "",
					  "routingCode": "",
					  "receiptNumber": "",
					  "bankNumber": ""
		      		}
		      	});
			};
		
			return utilFactory;
	}])
	
	/* factory for loan repayment */
	.factory('loanFactory', ['$http', function($http){
		
		var baseUrl = "https://demo.openmf.org/fineract-provider/api/v1/";
		var loanFactory = {};
		
		loanFactory.disburseToSavingsProcess = function(accountId, disburseDate){
  			var url = baseUrl + "loans/" + accountId + "?command=disburseToSavings";
			var data = {
    				 "dateFormat": "MMMM dd yyyy",
    				 "locale": "en",
    				 "transactionAmount":"",
    				 "fixedEmiAmount": "",
    				 "actualDisbursementDate": disburseDate,
    				 "note": "Disbursing to savings account using Mobile Money application"
    			 };
			return $http.post(url, data);
		};
		
		loanFactory.disburseToMoMo = function(accountId, amount, disburseDate){
			var url = baseUrl + "loans/" + accountId + "?command=disburse";
			var data = {
			  "dateFormat": "MMMM dd yyyy",
			  "locale": "en",
			  "transactionAmount": amount,
			  "fixedEmiAmount": "",
			  "actualDisbursementDate": disburseDate,
			  "paymentTypeId": "",
			  "note": "",
			  "accountNumber": "",
			  "checkNumber": "",
			  "routingCode": "",
			  "receiptNumber": "",
			  "bankNumber": ""
			};
			return $http.post(url, data);
		};
		
		loanFactory.loanRepayments = function(accountId, amount, repaymentDate){
			var url = baseUrl + "loans/" + accountId + "?command=repayment";
			var data = {
  				"locale" : "en",
  				"dateFormat": "MMMM dd yyyy",
  				"transactionDate": repaymentDate,
  				"transactionAmount": amount,
    			"paymentTypeId": "",
    			"accountNumber": "",
    			"checkNumber": "",
    			"routingCode": "",
    			"receiptNumber": "",
    			"bankNumber": ""
			};
			return $http.post(url, data);
		};
		
		return loanFactory;
	}]);
	