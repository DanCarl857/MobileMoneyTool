'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('transCtrl', ['$scope', '$http', 
	function ($scope, $http) {
	  var baseUrl = "http://localhost:8090/api/v1/transactions";
	  $scope.id = "";
	  
	  $http({
		  method: "GET",
		  url: baseUrl
	  }).success(function(data){
		  $scope.data = new Object();
		  $scope.data = data;
		  
		  for(var i = 0; i < $scope.data.length; i++){
			  for(var obj in $scope.data[i]){
				  console.log(obj);
			  }
		  }
		  
		  console.log("Data from engine: " + $scope.data["id"]);
	  }).error(function(response){
		  console.log("Error getting all transactions from the database: " + response);
	  });
     
  }]);
