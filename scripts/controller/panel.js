/**
 * Created by CT on 2017/3/9.
 */
angular.module('admin')
    .controller('panel',['$scope','$state','$stateParams', function($scope,$state,$stateParams){
    var vm = this ;
        vm.params = $state.params;// 搜索参数

        // 比较函数，当url的id和传入的id相等是，返回true
        vm.panel = function (id) {
            if(id == vm.params.panelId ){
                return true;
            }else{
                return false;
            }
        }

        // 点击按钮后，stateGo改变panel的参数，同时跳到子页面
        vm.stateGo = function(id){
            if(id ==1 ){
                // $state.go('field',);
                $state.go('field.companyList',{panelId:1});
            }else if (id ==2){
                $state.go('field.positionList',{panelId:2});
            }else if (id ==3){
                $state.go('field.articleList',{panelId:3});
            }
        };



        // if(vm.params.panelId == '1'){
        //
        // }else if(vm.params.panelId == '1'){
        //
        // }

        // $scope.role = user.role.name;
        // $scope.manager = user.manager.name;
        // vm.msgCollapsed = false;
        // $scope.Url = $location.url();
        // $scope.change = function (n) {
        //     $scope.Url = n
        // };

}])