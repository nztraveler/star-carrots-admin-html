/**
 * Created by CT on 2017/2/22.
 */
'use strict';
angular.module('admin').controller('articleList',['$http','$scope',articleSearch ]);

function articleSearch($http,$scope){//这里注入的东西，一定要和[]里的完全一样，不然会报错
    var vm = this ;

    // vm.search = Number($stateParams.oid); //把url参数oid和search类型绑定起来,并把类型转换为数值
    // vm.currentPage = $stateParams.page; //把url参数page和当前页数绑定起来
    vm.maxSize = 5;// 下方分页处最多显示5个分页序号
    vm.maxPerPage = 10;//每页数量
    // vm.currentPage = 1;
    // 获取后台数据
    //第一次进入页面，url中无参数，故设置默认参数为1
    // vm.search == undefined ||
    if ( vm.currentPage==undefined ){
        // vm.search = 1;
        vm.currentPage = 1;
        // $state.go('.', {oid:vm.search, page:vm.currentPage});//以新url参数刷新页面
    };
    // $http.get('/carrots-admin-ajax/a/article/search?page='+vm.currentPage)
    //     .success(function (res) {
    //         // 后台返回总数据量
    //         console.log(res.data);
    //         // vm.list=res.data.articleList;
    //         vm.num = res.data.total;//数据总数保存在num中，对应分页的'total-items',分页插件会自动计算出总页数
    //         //返回的具体数据保存在names中
    //         // vm.currentPage = $stateParams.page; //由于获取到了vm.names数据总数，分页插件会自动计算总页数并重置当前页数为1，所以需要再次绑定url中的当前页数
    //     })
    //     // .error(function (res) {
    //     //     console.log(res.data);
    //     // })

    // 点击搜索事件
//     vm.searchClick = function () {
// // 把number作为搜索参数传入，实现搜索
//         if (vm.search >= 1 && vm.search <= 8) {
//             vm.currentPage = 1;//初始化当前页
//             $state.go('.', {oid:vm.search, page:vm.currentPage});
//         }
//         else {
//             alert("请输入1~8的数字");
//         }
//     };


    
    
    
    
    vm.getList = function(){
        $http({
            url: '/carrots-admin-ajax/a/article/search?page='+vm.currentPage,
            method: 'GET',
        }).then(function (res) {
            if(res.data.code == 0){
                vm.list=res.data.data.articleList;
                vm.num = res.data.data.total;
            }
            else{
                vm.errorTip = res.data.message;//res为传回的数据
                alert(vm.errorTip);
            };

        });
    }
    vm.getList();

    // 分页使用数据监听currentPage的改动
    $scope.$watch('vm.currentPage', function () {
        vm.getList()
    });



}