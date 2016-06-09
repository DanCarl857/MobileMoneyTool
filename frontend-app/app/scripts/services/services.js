'use strict';
/*global $ */

angular.module('mobileMoneyApp')
  .service('dataService', ['$http', function($http){
    var baseURL = 'scripts/clients.json';

    this.getAllClients = function(){
      return $http.get(baseURL);
    }
  }]);