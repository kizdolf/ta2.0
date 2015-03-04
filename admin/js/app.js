'use strict';

var adminTA = angular.module('adminTA', 
	['adminTA.controllers', 'adminTA.routes', 'LocalStorageModule', 'adminTA.factorys', 'lr.upload']); 

adminTA.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('adminTA')
    .setStorageType('sessionStorage')
    .setNotify(true, true);
});
