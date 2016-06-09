'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('sendMoneyCtrl', function ($scope) {

  		$('.datepicker').pickadate({
        	selectMonths: true,
        	selectYears: 20
      	});
  });
