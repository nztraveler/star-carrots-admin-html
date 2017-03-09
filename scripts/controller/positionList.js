/**
 * Created by CT on 2017/3/5.
 */
'use strict';
angular.module('admin').controller('positionList',['$http','$scope','$rootScope','$state','$stateParams','infoManagementService','commonUtil','ProfessionConstant','categoryData',positionSearch ]);
function positionSearch($http,$scope,$rootScope,$state,$stateParams,infoManagementService, commonUtil,ProfessionConstant,categoryData){
    var vm = this ;
    vm.articleSearch = {};
    vm.ProfessionConstant = ProfessionConstant;//注入constant
    vm.categoryData = categoryData;
    vm.searchParams =  $state.params;// 搜索参数
    // vm.searchParams.category = Number($state.params.category);
    // vm.searchParams.subCategory = Number($state.params.subCategory);

    console.log(vm.searchParams);
    vm.param = $state.params;// ajax参数
    //搜索选项默认配置,数值类型转换
    if(vm.searchParams.experience == undefined){
        vm.searchParams.experience=null;
    }else {
        vm.searchParams.experience = Number(vm.searchParams.experience);
    };
    if(vm.searchParams.education == undefined){
        vm.searchParams.education = null;
    }else{
        vm.searchParams.education  = Number(vm.searchParams.education );
    };
    if(vm.searchParams.compensation == undefined){
        vm.searchParams.compensation= null;
    }else{
        vm.searchParams.compensation  = Number(vm.searchParams.compensation );
    };

    // 获取二级联动中二级的数据
    vm.subCategoryData = commonUtil.getSubCategoryFn(vm.searchParams.category);
    console.log(vm.subCategoryData);

//时间插件日期转换
    vm.articleSearch.startAt = parseInt(vm.searchParams.startAt) || undefined;
    vm.articleSearch.endAt = parseInt(vm.searchParams.endAt) || undefined;
    console.log(vm.searchParams);

    // 通过ng-change获取选中id，改变二级联动的选项
    vm.subCategoryFn = function (id) {
        delete vm.searchParams.subCategory;
        if (id !== "") {
            // 获取二级联动中二级的数据
            vm.subCategoryData = commonUtil.getSubCategoryFn(id);
            console.log(vm.subCategoryData);
        }
        else {
            delete vm.subCategoryData;
        }
    };

    // 获取数据的ajax
    vm.getList = function(param){
        // console.log("2"+$state.params.page);
        $http.get('/carrots-admin-ajax/a/profession/search',{
                params: param//搜索的参数
            }
        ).success(function (res) {
            // console.log("3"+$state.params.page);
            if(res.code == 0){
                vm.list=res.data;
                console.log(res);
                vm.num = res.total;
                // 分页配置
                vm.maxSize = 5;// 下方分页处最多显示5个分页序号
                vm.maxPerPage = 10;//每页数量
                vm.param.page = $stateParams.page;
                // console.log("4"+$state.params.page);
            }
            else{
                vm.errorTip = res.data.message;//res为传回的数据
                alert(vm.errorTip);
            };
        });
    }
    vm.getList(vm.param);//第一次执行获取数据

    // 清除搜索项的函数
    vm.clear = function () {
        angular.forEach(vm.searchParams, function (data, index) {
            if (index !== 'size') {
                vm.searchParams[index] = '';
            }
        });
        vm.searchParams.experience = null;
        vm.searchParams.education = null;
        vm.searchParams.compensation = null;
    }

    //搜索功能，url传参
    vm.search = function () {
        // 日历插件数据处理
        if(vm.articleSearch.endAt !== undefined && vm.articleSearch.endAt !== null&&vm.articleSearch.endAt !== ''){
            vm.articleSearch.endAt=vm.articleSearch.endAt+86399999;//给结束时间加一个时间戳，定位到每天的23.59.59
        };
        vm.searchParams.startAt = vm.articleSearch.startAt;
        vm.searchParams.endAt = vm.articleSearch.endAt;
        vm.searchParams.page = 1;
        $state.go('.', vm.searchParams  );//以新url参数刷新页面
    }

    // 分页使用数据监听currentPage的改动
    $scope.$watch('vm.param.page', function () {
        $http.get('/carrots-admin-ajax/a/profession/search',{
                params: vm.searchParams//搜索的参数
            }
        ).then(function (res) {
            $state.go('.', vm.searchParams);//以新url参数刷新页面,必须要先请求ajax，再生效跳转，不然url的page参数会一直改变。
            // 跳转到本页面保持顶部
            commonUtil.scrollTo(0, 0);
        });

    });

    // 编辑页跳转
    vm.positionDetail = function(id){
        $state.go('field.positionDetali',{id:id});
    };
    // 删除
    vm.delPosition = function (id) {
        // alert(id);
        $rootScope.confirm("是否确认删除", function () {
            // 发送删除请求
            $http.delete('/carrots-admin-ajax/a/u/profession/'+id).then(function (res) {
                if (res.data.code === 0) {
                    $state.go('.', vm.searchParams,{reload: true});
                } else {
                    $rootScope.alert(res.data.message);
                }
            });
        })
    };

    // 改变状态
    vm.changePositionStatus = function (id, status) {
        // 上架
        if (status === 0) {
            $rootScope.operationConfirm("上架后该职位将在前台展示。", "是否执行上架操作？", function () {
                // 发送上线请求
                infoManagementService.putPositionstatus(id, 1).then(function (res) {
                    if (res.data.code === 0) {

                        $rootScope.alert("已成功上架", function () {
                        });
                        $state.go('.', vm.searchParams,{reload: true});
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                });
            });
        }
        // 下线
        else if (status === 1) {
            $rootScope.operationConfirm("下架后该职位将不在前台展示。", "是否执行下架操作？", function () {
                // 发送下线请求
                infoManagementService.putPositionstatus(id, 0).then(function (res) {
                    if (res.data.code === 0) {

                        $rootScope.alert("已成功下架", function () {
                        });
                        $state.go('.', vm.searchParams,{reload: true});
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                });
            });
        }
    };





}
