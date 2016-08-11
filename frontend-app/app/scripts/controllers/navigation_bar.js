'use strict';
/* global $*/

angular.module('mobileMoneyApp')
  .controller('navCtrl', ['$scope', function($scope) {

  		$(document).ready(function(){
  			$(".dropdown-button").dropdown();
  		});
  }])
  .controller('dropCtrl', ['$scope', '$state', function($scope, $state){
	$scope.logout = function(){
		$state.transitionTo('login');
	}
  }])