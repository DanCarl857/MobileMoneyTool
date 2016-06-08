'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('withMoneyCtrl', function () {

  		$('.datepicker').pickadate({
        	selectMonths: true,
        	selectYears: 20
      	});
  });
