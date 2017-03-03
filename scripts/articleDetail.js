/**
 * Created by q on 2016/9/6.
 */
'use strict';
angular.module('admin')
    .controller('articleDetailCtrl', function (articleConstant,$scope, FileUploader, $state,$stateParams, uploadService, ArticleManagementService, $rootScope) {
        var vm = this;
        vm.articleConstant = articleConstant;//注入搜索参数
        // $state.params['#']= undefined;
        vm.params = $stateParams;
        console.log(vm.params);

        //上传图片
        // 能否重复上传同一张图片，默认为false，可以如此覆盖 true|false
        FileUploader.FileSelect.prototype.isEmptyAfterSelection = function () {
            return true;
        };
        //图片上传1
        vm.uploader1 = uploadService.uploadFile(FileUploader);
        vm.uploader1.onSuccessItem = function (fileItem, response, status, headers) {
            if (status === 200) {
                vm.params.img = response.data.url;
            }
        };

        // 编辑
        if (vm.params.id) {
            //查询article  ID
            ArticleManagementService.getArticle(vm.params.id).then(function (res) {

                vm.params = res.data.data.article;
                console.log(vm.params);
            });
            //立即上线
            vm.pubArticle = function () {
                vm.params.status = 2;
                ArticleManagementService.editArticle(vm.params.id, vm.params).then(function (res) {
                    if (res.data.code === 0) {
                        $rootScope.alert("编辑成功");
                        $state.go("field.articleList");
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                })
            };
            //存入草稿
            vm.saveArticle = function () {
                vm.params.status = 0;
                ArticleManagementService.editArticle(vm.params.id, vm.params).then(function (res) {
                    if (res.data.code === 0) {
                        $rootScope.alert("编辑成功");
                        $state.go("field.articleList");
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                })
            }
        }
        // 新增
        else {
            if(vm.params.type== undefined){
                vm.params.type = null;
            };
            if(vm.params.industry== undefined){
                vm.params.industry = null;
            };
            //立即上线
            vm.pubArticle = function () {
                vm.params.status = 2;
                ArticleManagementService.addArticle(vm.params).then(function (res) {
                    if (res.data.code === 0) {
                        $rootScope.alert("新增成功");
                        $state.go("field.articleList");
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                })
            };
            //存入草稿
            vm.saveArticle = function () {
                vm.params.status = 1;
                // console.log("good");
                // console.log(vm.params);
                // // var a={a:2,b:3,c:6};
                // // a.a=undefined;
                // // a["#"]=undefined;
                // var b=$.param(vm.params);
                // console.log(b);
                // vm.aaa = $.param(vm.params);
                // vm.aa = vm.params;
                // vm.cc = $.param(vm.aa);
                // console.log(vm.cc);
                // console.log(params;
                // console.log($.param(vm.params));
                ArticleManagementService.addArticle(vm.params).then(function (res) {
                    if (res.data.code === 0) {
                        $rootScope.alert("新增成功");
                        $state.go("field.articleList");
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                })
            };
        }
    });