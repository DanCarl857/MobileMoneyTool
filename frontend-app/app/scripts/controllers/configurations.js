'use strict';
/* global $ */

angular.module('mobileMoneyApp')
  .controller('configCtrl', ['$scope', '$window', function ($scope, $window) {
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
        $('.modal-trigger').leanModal({
          dismissible: false,
          opacity: .8,
          out_duration: 5
        });

        $('.tooltipped').tooltip({delay: 50});
  	 	});
  	 });  
     $scope.goBack = function(){
        window.history.back();
     }
     $scope.deny = function(){
        $window.location.reload();
     }
  }]);
