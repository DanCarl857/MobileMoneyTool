'use strict';
/* global $ */

angular.module('mobileMoneyApp')
  .controller('configCtrl', ['$scope', function ($scope) {
    // variables
    // TODO: get these from the database
    $scope.accountId = "4123456";
    $scope.savingsURL = "http://api.furthermarket.com/FM/MTN/MoMo/requestpayment";
    $scope.withURL = "http://api.furthermarket.com/FM/MTN/MoMo/requestpayment";
    $scope.sendURL = "http://api.furthermarket.com/FM/MTN/MoMo/placepayment";
    $scope.otherURL = "http://api.furthermarket.com/FM/MTN/MoMo/checkpayment"

  	// activate collapsibles on UI
  	 $(document).ready(function(){
  	 	$('.collapsible').collapsible({
  	 		accordion: false
  	 	});

  	 	// activate select form fields on UI
  	 	$(document).ready(function(){
  	 		$('select').material_select();
        $('.tooltipped').tooltip({delay: 50});
  	 	});
  	 });  


     $scope.goBack = function(){
        console.log("Testing");
        window.history.back();
     }

     console.log("we rock");
  }]);
