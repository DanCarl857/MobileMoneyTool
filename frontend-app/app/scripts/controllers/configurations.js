'use strict';
/* global $ */

angular.module('mobileMoneyApp')
  .controller('configCtrl', ['$scope', function ($scope) {
  	// activate collapsibles on UI
  	 $(document).ready(function(){
  	 	$('.collapsible').collapsible({
  	 		accordion: false
  	 	});

  	 	// activate select form fields on UI
  	 	$(document).ready(function(){
  	 		$('select').material_select();
  	 	});
  	 });  

     console.log("we rock");
  }]);
