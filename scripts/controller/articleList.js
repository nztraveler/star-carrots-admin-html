/**
 * Created by CT on 2017/2/22.
 */
'use strict';
    angular.module('admin').controller('articleList',['articleConstant','$http','$scope','$rootScope','$state','$stateParams','ArticleManagementService',articleSearch ]);

function articleSearch(articleConstant,$http,$scope,$rootScope,$state,$stateParams,ArticleManagementService){//这里注入的东西，一定要和[]里的完全一样，不然会报错
    var vm = this ;
    vm.articleConstant = articleConstant;//注入搜索参数
    vm.articleSearch = $state.params;// 搜索参数
    vm.article = $state.params;//ajax参数
    console.log("1"+$state.params.page)
   //搜索选项默认配置,数值类型转换
    if(vm.articleSearch.status == undefined){
        vm.articleSearch.status=null;
    }else {
        vm.articleSearch.status = Number(vm.articleSearch.status);
    };
    if(vm.articleSearch.type == undefined){
        vm.articleSearch.type = null;
    }else{
        vm.articleSearch.type  = Number(vm.articleSearch.type );
    };
    vm.articleSearch.startAt = parseInt(vm.articleSearch.startAt) || undefined;
    vm.articleSearch.endAt = parseInt(vm.articleSearch.endAt) || undefined;


    // 获取数据的ajax
    vm.getList = function(paramArticle){
        console.log("2"+$state.params.page);
        $http.get('/carrots-admin-ajax/a/article/search',{
                params: paramArticle//搜索的参数
            }
        ).success(function (res) {
            console.log("3"+$state.params.page);
            if(res.code == 0){
                vm.list=res.data.articleList;
                vm.num = res.data.total;
                // 分页配置
                vm.maxSize = 5;// 下方分页处最多显示5个分页序号
                vm.maxPerPage = 10;//每页数量
                vm.article.page = $stateParams.page;
                console.log("4"+$state.params.page);
            }
            else{
                vm.errorTip = res.data.message;//res为传回的数据
                alert(vm.errorTip);
            };
        });
    }
    vm.getList(vm.article);//第一次执行获取数据

    // vm.article.page = parseInt(vm.article.page) || undefined;

// 清除搜索项的函数
    vm.clear = function () {
        angular.forEach(vm.articleSearch, function (data, index) {
            if (index !== 'size') {
                vm.articleSearch[index] = '';
            }
        });
        vm.articleSearch.type = null;
        vm.articleSearch.status = null;
    }
    //搜索功能，url传参
    vm.search = function () {

        if(vm.articleSearch.endAt !== undefined && vm.articleSearch.endAt !== null&&vm.articleSearch.endAt !== ''){
            vm.articleSearch.endAt=vm.articleSearch.endAt+86399999;//给结束时间加一个时间戳，定位到每天的23.59.59
        };

        $state.go('.', vm.articleSearch);//以新url参数刷新页面
    }

    // 分页使用数据监听currentPage的改动
    $scope.$watch('vm.article.page', function () {
        $http.get('/carrots-admin-ajax/a/article/search',{
                params: vm.article//搜索的参数
            }
        ).then(function (res) {
            $state.go('.', vm.article);//以新url参数刷新页面,必须要先请求ajax，再生效跳转，不然url的page参数会一直改变。
        });

    });
    // 编辑页跳转
    vm.articleDetail = function(id){
        $state.go('field.articleDetali',{id:id});
    };
    // 删除
    vm.delArticle = function (id) {
        // alert(id);
        $rootScope.confirm("是否确认删除", function () {
            // 发送删除请求
            $http.delete('/carrots-admin-ajax/a/u/article/'+id).then(function (res) {
                if (res.data.code === 0) {
                    $state.go('.', vm.article,{reload: true});
                } else {
                    $rootScope.alert(res.data.message);
                }
            });
        })
    };

    // 改变状态
    vm.changeArticleStatus = function (id, status) {
        // 上线
        if (status === 1||status === 0) {
            $rootScope.operationConfirm("上线后该图片将在轮播banner中展示。", "是否执行上线操作？", function () {
                // 发送上线请求
                ArticleManagementService.changeArticleStatus(id, 2).then(function (res) {
                    if (res.data.code === 0) {

                        $rootScope.alert("上线成功", function () {
                        });
                        $state.go('.', vm.article,{reload: true});
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                });
            });
        }
        // 下线
        else if (status === 2) {
            $rootScope.operationConfirm("下线后该图片将不展示站轮播banner中。", "是否执行下线操作？", function () {
                // 发送下线请求
                ArticleManagementService.changeArticleStatus(id, 1).then(function (res) {
                    if (res.data.code === 0) {

                        $rootScope.alert("下线成功", function () {
                        });
                        $state.go('.', vm.article,{reload: true});
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                });
            });
        }
    };




}