'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('transCtrl', ['$scope', '$http', 'utilFactory',
	function ($scope, $http, utilFactory) {
	  $(document).ready(function(){
	  	$('.tooltipped').tooltip({delay: 50});
	  });
	  
	  utilFactory.getAllTransactions()
            .then(function (response) {
				$scope.transactions = response.data;
            }, function (error) {
                console.log("Error getting all transactions from the database");
            });
	 
      $scope.goBack = function(){
        window.history.back();
      };
  }]);
