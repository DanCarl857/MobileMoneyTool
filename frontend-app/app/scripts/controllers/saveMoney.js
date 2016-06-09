'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .controller('saveMoneyCtrl', function () {

  		$('.datepicker').pickadate({
        	selectMonths: true,
        	selectYears: 20
      	});
  });
