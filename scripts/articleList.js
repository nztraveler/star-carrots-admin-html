/**
 * Created by CT on 2017/2/22.
 */
'use strict';
angular.module('admin').controller('articleList',['$state', '$http','$scope','$rootScope',articleSearch ]);

function articleSearch($state,$http,$scope,$rootScope){
    var vm = this ;

    $http({
        url: '/carrots-admin-ajax/a/article/search',
        method: 'GET',

    }).then(function (res) {
        if(res.data.code == 0){
            vm.list=res.data.data.articleList;
        }
        else{
            vm.errorTip = res.data.message;//res为传回的数据
            alert(vm.errorTip);
        };

    });

}