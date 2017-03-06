/**
 * Created by CT on 2017/3/4.
 */
'use strict';
angular.module('admin')
    .controller('companyDetail', function (commonUtil,articleConstant,$scope, FileUploader, $state,$stateParams, uploadService, infoManagementService, $rootScope,companyListConstant,companyIndustryGroup) {
        var vm = this;
        vm.detail = {};
        vm.detail.company = {};
        vm.area = {};
        vm.detail.productList = [];//不先声明会报错
        vm.detail.productList[0] = {};
        vm.articleConstant = articleConstant;//注入搜索参数
        vm.companyListConstant = companyListConstant;//注入搜索参数
        // 公司行业多选数据
        vm.companyIndustryGroup = companyIndustryGroup;

        // $state.params['#']= undefined;
        vm.companyId = $state.params.companyId;
        console.log(vm.params);
//搜索选项默认配置,数值类型转换
        if(vm.detail.company.financing == undefined){
            vm.detail.company.financing = null;
            console.log(1);
        };
        //上传图片
        // 能否重复上传同一张图片，默认为false，可以如此覆盖 true|false
        FileUploader.FileSelect.prototype.isEmptyAfterSelection = function () {
            return true;
        };
        //图片上传1
        vm.uploader1 = uploadService.uploadFile(FileUploader);
        vm.uploader1.onSuccessItem = function (fileItem, response, status, headers) {
            if (status === 200) {
                vm.detail.company.logo = response.data.url;
            }
        };
        //图片上传2
        vm.uploader2 = uploadService.uploadFile(FileUploader);
        vm.uploader2.onSuccessItem = function (fileItem, response, status, headers) {
            if (status === 200) {
                vm.detail.productList[0].logo = response.data.url;
            }
        };
        //图片上传3
        vm.uploader3 = uploadService.uploadFile(FileUploader);
        vm.uploader3.onSuccessItem = function (fileItem, response, status, headers) {
            if (status === 200) {
                vm.detail.company.map = response.data.url;
            }
        };


        // 新增标签
        vm.isTagValid = true;
        vm.addTag = function () {
            var tagObj = {"tag": vm.tag};
            vm.detail.tagList = vm.detail.tagList || [];
            // 判断新增标签是否为空，是否有重复
            if (!commonUtil.isNone(vm.tag) && commonUtil.isRepeat(tagObj, vm.detail.tagList)) {
                // 新增标签
                vm.detail.tagList.push(tagObj);
                vm.isTagValid = true;
            }
            else {
                // 报错
                vm.isTagValid = false
            }
        };

        // 删除标签
        vm.delTag = function (index) {
            vm.detail.tagList.splice(index, 1);
        };




        // 编辑
        if (vm.companyId) {
            //查询公司  ID
            infoManagementService.getCompanyDetail(vm.companyId).then(function (res){
                if (res.data.code === 0){
                    vm.detail = res.data.data;
                    console.log(vm.detail);
                    //电话号码转换
                    if(vm.detail.company.phone !== undefined){
                        vm.detail.company.phone = Number(vm.detail.company.phone);
                    }
                    // 省市区数据转换\
                    // vm.areaData={};
                    commonUtil.areaTransform( vm.area, vm.detail.company, 0);
                    // 公司行业数据转换为下拉多选数据
                    commonUtil.companyIndustryTransform(companyIndustryGroup, vm.detail.industryList);
                    // vm.area = commonUtil.areaDateTransform(res.data.data.company.province, res.data.data.company.city, res.data.data.company.county);

                    // vm.area = {
                    //     city:"2",
                    //     district: "19",
                    //     province: "2"
                    // }
                    console.log(vm.area);
                }

            });


        };

        // 新增/编辑 操作
        vm.newCompany = function () {
            // 省市区数据转换
            commonUtil.areaTransform(vm.detail.company, vm.area, 1);
            // 下拉多选数据 转换为 公司行业数据
            vm.detail.industryList = commonUtil.selectIndustryListTransform(vm.detail.industryList, vm.selectedIndustryGroup);

            // 新增操作
            if (!vm.companyId) {
                infoManagementService.addCompany(vm.detail).then(function (res) {
                    if (res.data.code === 0) {
                        $state.go("field.companyList", {}, {reload: true});
                    } else {
                        $rootScope.alert(res.data.message)
                    }
                });
            }
            // 编辑操作
            else if (vm.companyId) {
                infoManagementService.editCompany(vm.companyId, vm.detail).then(function (res) {
                    if (res.data.code === 0) {
                        $state.go("field.companyList", {}, {reload: true});
                    } else {
                        $rootScope.alert(res.data.message)
                    }
                });
            }
        };



    })