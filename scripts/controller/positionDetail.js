/**
 * Created by CT on 2017/3/6.
 */
'use strict';
angular.module('admin')
    .controller('positionDetailCtrl', function (commonUtil,articleConstant,$scope, $state,$stateParams, infoManagementService, $rootScope,companyListConstant,companyIndustryGroup,ProfessionConstant, categoryData) {
        var vm = this;
        vm.params = {};
        vm.params.companyName = $state.params.companyName;
        vm.params.companyId = $state.params.companyId;
        vm.positionTags = [];
        vm.ProfessionConstant = ProfessionConstant;//注入搜索参数
        vm.categoryData = categoryData;


        // 通过ng-change获取选中id,替换下级的选项的数据
        vm.subCategoryFn = function (id) {
            delete vm.params.subCategory;
            if (id !== "") {
                // 获取二级联动中二级的数据
                vm.subCategoryData = commonUtil.getSubCategoryFn(id);
                console.log(vm.subCategoryData);
            }
            else {
                delete vm.subCategoryData;
            }
        };
        // 通过参数，判断跳转路径
        vm.stateGo=function () {
            if($state.params.n === true){
                $state.go("field.positionList");
            }
            else {
                $state.go("field.positionList", {
                    companyId: vm.params.companyId,
                    companyName: vm.params.companyName
                }, {reload: true});
            };
        }


        //获取公司福利标签列表
        infoManagementService.getCompanyTags($state.params.companyId).then(function (res) {
            vm.Multiselect = commonUtil.companyTags(res.data.tags);
            console.log(vm.Multiselect);
            // 判断新增 or 编辑
            // 新增
            if ($state.params.id === undefined) {
                vm.params.name = null;
                // 保存和取消功能，跳转判断
                vm.save = function () {
                    infoManagementService.postPosition(vm.params, vm.positionTags).then(function (res) {
                            if (res.data.code === 0) {
                                vm.stateGo();
                            }
                            else {
                                $rootScope.alert(res.data.message)
                            }
                        }
                    )
                };
            }
            // 编辑
            else {
                infoManagementService.getPositionDetail($state.params.id).then(function (res) {
                    if (res.data.code === 0) {
                        console.log(res.data.data);
                        var record = res.data.data;
                        vm.params = res.data.data;
                        vm.params.id = $state.params.id;

                        // 获取二级联动中二级的数据
                        vm.subCategoryData = commonUtil.getSubCategoryFn(vm.params.category);

                        //匹配公司标签和职位标签，设置默认选中
                        vm.Multiselect = vm.Multiselect.map(function (item) {
                            if (record.tags.some(function (itemtext) {
                                    return (item.name === itemtext.tag)
                                })) {
                                item.check = true;
                                return item
                            } else {
                                return item
                            }
                        });

                        // 数据处理
                        vm.positionTags = record.tags.map(function (item) {
                            return item.tag
                        });

                        // 保存和取消功能，跳转判断
                        vm.save = function () {
                            infoManagementService.putPosition(vm.params, vm.positionTags, vm.params.id).then(function (res) {
                                    if (res.data.code === 0) {
                                        vm.stateGo();
                                    }
                                    else {
                                        $rootScope.alert(res.data.message)
                                    }
                                }
                            )
                        };
                    }
                    else {
                        $rootScope.alert(res.data.message)
                    }
                })
            }
        });
        //标签点击取值
        vm.checkboxMulti = commonUtil.checkboxMulti;

        //搜索选项默认配置,数值类型转换
        if(vm.params.experience == undefined){
            vm.params.experience=null;
        }else {
            vm.params.experience = Number(vm.params.experience);
        };
        if(vm.params.education == undefined){
            vm.params.education = null;
        }else{
            vm.params.education  = Number(vm.params.education );
        };
        if(vm.params.compensation == undefined){
            vm.params.compensation= null;
        }else{
            vm.params.compensation  = Number(vm.params.compensation );
        };


    });