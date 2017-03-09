/**
 * Created by CT on 2017/3/3.
 */
'use strict';
angular.module('admin').controller('companyList',['companyListConstant','articleConstant','$http','$scope','$rootScope','$state','$stateParams','infoManagementService','commonUtil',companySearch ]);
function companySearch(companyListConstant,articleConstant,$http,$scope,$rootScope,$state,$stateParams,infoManagementService, commonUtil){//这里注入的东西，一定要和[]里的完全一样，不然会报错
    var vm = this ;
    vm.articleConstant = articleConstant;//注入搜索参数
    vm.companyListConstant= companyListConstant;
    vm.company = $state.params;// 搜索参数
    vm.param = $state.params;//ajax参数
    //搜索选项默认配置,数值类型转换
    if(vm.company.industry == undefined){
        vm.company.industry=null;
    }else {
        vm.company.industry = Number(vm.company.industry);
    };
    if(vm.company.financing == undefined){
        vm.company.financing = null;
    }else{
        vm.company.financing  = Number(vm.company.financing );
    };

    // 地址默认显示
    console.log($state.params.province);
    // 省市区数据转换
    vm.company.address = commonUtil.areaDateTransform($state.params.province, $state.params.city, $state.params.county);
    console.log(vm.company.address);
    // 获取数据的ajax
    vm.getList = function(param){
        // console.log("2"+$state.params.page);
        $http.get('/carrots-admin-ajax/a/company/search',{
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
        angular.forEach(vm.company, function (data, index) {
            if (index !== 'size') {
                vm.company[index] = '';
            }
        });
        vm.company.industry = null;
        vm.company.financing = null;
    }

    //搜索功能，url传参
    vm.search = function () {
        if (vm.company.address) {
            vm.company.province = vm.company.address.province;
            vm.company.city = vm.company.address.city;
            vm.company.county = vm.company.address.district;
        }
        vm.company.page = 1;
        console.log(vm.company);
        $state.go('.', vm.company);//以新url参数刷新页面
    }

    // 分页使用数据监听currentPage的改动
    $scope.$watch('vm.param.page', function () {
        $http.get('/carrots-admin-ajax/a/company/search',{
                params: vm.param//搜索的参数
            }
        ).then(function (res) {
            $state.go('.', vm.param);//以新url参数刷新页面,必须要先请求ajax，再生效跳转，不然url的page参数会一直改变。
            // 跳转到本页面保持顶部
            commonUtil.scrollTo(0, 0);
        });
    });

    // 删除
    vm.delCompany = function (id) {
        // alert(id);
        $rootScope.confirm("是否确认删除", function () {
            // 发送删除请求
            $http.delete('/carrots-admin-ajax/a/u/company/'+id).then(function (res) {
                if (res.data.code === 0) {
                    $state.go('.', vm.param,{reload: true});
                } else {
                    $rootScope.alert(res.data.message);
                }
            });
        })
    };
// 编辑
    vm.companyDetail = function(id){
        $state.go('field.companyDetail',{companyId: id});
    }


    // 冻结解冻
    vm.freeze = function (id, type, status) {
        // 上线
        if (status === 0) {
            $rootScope.operationConfirm("冻结后该公司下的所有信息将不可用。", "是否执行冻结操作？", function () {
                // 发送冻结请求
                infoManagementService.changeCompanyStatus(id, type,1).then(function (res) {
                    if (res.data.code === 0) {

                        $rootScope.alert("冻结成功", function () {
                        });
                        $state.go('.', vm.article,{reload: true});
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                });
            });
        }
        // 解冻
        else if (status === 1) {
            $rootScope.operationConfirm("解冻后该公司下的信息将可继续使用", "是否执行解冻操作？", function () {
                // 发送解冻请求
                infoManagementService.changeCompanyStatus(id, type, 0).then(function (res) {
                    if (res.data.code === 0) {

                        $rootScope.alert("解冻成功", function () {
                        });
                        $state.go('.', vm.article,{reload: true});
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                });
            });
        }
    };

    // 认证解除认证
    vm.approve = function (id, type, status) {
        // 认证
        if (status === 0) {
            $rootScope.operationConfirm("认证后该公司将被标记为推荐公司", "是否执行认证操作？", function () {
                // 发送冻结请求
                infoManagementService.changeCompanyStatus(id, type,1).then(function (res) {
                    if (res.data.code === 0) {

                        $rootScope.alert("认证成功", function () {
                        });
                        $state.go('.', vm.article,{reload: true});
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                });
            });
        }
        // 解除
        else if (status === 1) {
            $rootScope.operationConfirm("解除认证后该公司将不再标记为推荐公司", "是否执行解除操作？", function () {
                // 发送解冻请求
                infoManagementService.changeCompanyStatus(id, type, 0).then(function (res) {
                    if (res.data.code === 0) {

                        $rootScope.alert("解除成功", function () {
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
