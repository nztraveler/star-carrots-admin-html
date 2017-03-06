/**
 * Created by CT on 2017/3/5.
 */
'use strict';
angular.module('admin').controller('positionList',['$http','$scope','$rootScope','$state','$stateParams','infoManagementService','commonUtil','ProfessionConstant',positionSearch ]);
function positionSearch($http,$scope,$rootScope,$state,$stateParams,infoManagementService, commonUtil,ProfessionConstant){
    var vm = this ;
    vm.ProfessionConstant = ProfessionConstant;//注入constant





}
