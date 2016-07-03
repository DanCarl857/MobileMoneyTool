'use strict';
/* global $ */

angular.module('mobileMoneyApp')
  .controller('configCtrl', ['$scope', function ($scope) {
  	 $(document).ready(function(){
  	 	$('.collapsible').collapsible({
  	 		accordion: false
  	 	});
  	 });  

     console.log("we rock");
  }]);
