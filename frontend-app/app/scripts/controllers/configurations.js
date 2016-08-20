'use strict';
/* global $ */

angular.module('mobileMoneyApp')
  .controller('configCtrl', ['$scope', '$window', function ($scope, $window) {
    // variables
    $scope.hide = false;
    $scope.withHide = false;

    $scope.savingsParams = [];
    $scope.withdrawalParams = [];

    // function to add a parameter
    $scope.addSavingsParam = function(){
      $scope.hide = true;
      $scope.savingsParams.push({savingsParamName: $scope.savingsParamName, savingsParamValue: $scope.savingsParamValue});
      $scope.savingsParamName = '';
      $scope.savingsParamValue = '';
    }

    $scope.delSavingsParam = function(index){
      $scope.savingsParams.splice(index, 1);
    }

    $scope.addWithParams = function(){
      $scope.withHide = true;
      $scope.withdrawalParams.push({withParamName: $scope.withParamName, withParamValue: $scope.withParamValue});
      $scope.withParamName = '';
      $scope.withParamValue = '';
    }

    $scope.delWithParams = function(index){
      $scope.withdrawalParams.splice(index, 1);
    }

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
          opacity: '.8',
          out_duration: 5
        });

        $('.tooltipped').tooltip({delay: 50});
  	 	});
  	 });  
     $scope.goBack = function(){
        window.history.back();
     };
     $scope.deny = function(){
        $window.location.reload();
     };
  }]);
