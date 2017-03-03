/**
 * Created by CT on 2017/2/21.
 */
'use strict';
angular.module('admin').controller('logInController',['$state', '$http','$scope','$rootScope','$cookies','$timeout',   'recordCookies', logIn]);

function logIn($state,$http,$scope,$rootScope,$cookies,$timeout,  recordCookies){
    var vm = this ;
    vm.submit = function () {
        console.log('1');
        var params = {
           name: vm.name,
            pwd: vm.pwd
        };

        $http({
            url: '/carrots-admin-ajax/a/login',
            method: 'POST',
            data: params, //将对象转换成序列化，例如这样"mobile=" + mobile+ "&pwd=" + pwd
            headers: {'Content-Type': 'application/x-www-form-urlencoded'} // post发送方法，需要定义头部

        }).then(function (res) {
            if(res.data.code == 0){
                $cookies.login = "true";
                $state.go("field");
                recordCookies({managerID: res.data.data.manager.id, roleID: res.data.data.manager.roleID});
                // managerService.saveSelfDetail(res.data.data);
            }
            else{
                vm.errorTip = res.data.message;//res为传回的数据
                alert(vm.errorTip);
                $timeout(function () {
                    vm.errorTip = "";
                }, 3000);
            };

        });
    };

};