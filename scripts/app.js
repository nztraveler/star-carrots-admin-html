/**
 * Created by CT on 2017/2/22.
 */
"use strict";
function lazyLoadConfig($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        modules: [

            {
                name: 'area-selcet',
                files: [
                    "scripts/directive/area-select/areaConstant.js",
                    "scripts/directive/area-select/areaSelect.js"
                ]
            },

            //富文本
            {
                name: 'um',
                files: [
                    'vendor/um/umeditor.config.js',
                    'vendor/um/umeditor.min.js',
                    'vendor/um/lang/zh-cn/zh-cn.js',
                    'vendor/um/themes/default/css/umeditor.css'
                ]
            }
        ]
    });
}


function httpConfig($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // Set up global transformRequest function
    $httpProvider.defaults.transformRequest = function (data) {
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };


    // set up global transformRequest function
    // $httpProvider.defaults.transformRequest = function (data) {
    //     if (data === undefined) {
    //         return data;
    //     }
    //     return $.param(data);
    // };
    //拦截器
    // $httpProvider.interceptors.push(function ($rootScope, $q) {
    //     return {
    //         request: function (config) {
    //             return config;
    //         },
    //         responseError: function (rejection) {
    //             return $q.reject(rejection);
    //         },
    //         response: function (response) {
    //             //cookie失效
    //             if (response.data.code == -2) {
    //                 $rootScope.alert("系统检测到您登录状态异常，请重新登录", function () {
    //                     //转存版本信息
    //                     var ver = localStorage.ver;
    //                     //清除本地数据
    //                     localStorage.clear();
    //                     localStorage.ver = ver;
    //                     $rootScope.$state.go('skill.login', {login: 0});
    //                 });
    //                 return;
    //             }
    //
    //             return response;
    //         }
    //     }
    // });


}

function recordCookies($cookies) {
    return function (params) {
        var cookie = $cookies.records || '{"managerID":"","moduleID":"","targetID":"","operate":""}';
        cookie = JSON.parse(cookie);

        if (params) {
            var setCookies = {
                managerID: params.managerID || cookie.managerID,
                moduleID: params.moduleID || cookie.moduleID,
                operate: params.operate || cookie.operate,
                roleID: params.roleID || cookie.roleID,
                targetID: +params.targetID || cookie.targetID
            };

            if (params.operate == "POST") {
                delete setCookies.targetID;
            }
            $cookies.records = JSON.stringify(setCookies);
        } else {
            return cookie;
        }

    }
}


angular.module('admin',['ui.router','ui.bootstrap','oc.lazyLoad','mgcrea.ngStrap.datepicker','mgcrea.ngStrap.modal','ngCookies','angularFileUpload', 'angular-loading-bar'])
    .factory('recordCookies', recordCookies)
    .config(httpConfig)
    .config(lazyLoadConfig)
    .run(function ($rootScope, $templateCache, $modal,$cookies,$location) {

        $rootScope.isLogin = function () {
            return !!$cookies.login;
        };
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (!$rootScope.isLogin() && $location.path() !== "/login") {
                $state.go("login");
                return false;
            }
            if ($rootScope.isLogin() && $location.path() === "/login") {
                $state.go("field.homepage");
                return false;
            }

        });

        //alert confirm notify
        $rootScope.alert = function (content, okFn) {
            var modal = $modal({
                html: true,
                show: false,
                templateUrl: 'views/template/ptteng-alert-0.0.1.html',
                controller: function ($scope) {
                    $scope.content = content;
                    $scope.ok = function () {
                        typeof okFn == 'function' && okFn();
                        modal.$promise.then(modal.hide);
                    };
                }
            });
            modal.$promise.then(modal.show);
        };

        $rootScope.confirm = function (content, okFn, cancelFn) {
            var modal = $modal({
                html: true,
                show: false,
                templateUrl: 'views/template/ptteng-confirm-0.0.1.html',
                controller: function ($scope) {
                    $scope.content = content;
                    $scope.ok = function () {
                        typeof okFn == 'function' && okFn();
                        modal.$promise.then(modal.hide);
                    };
                    $scope.cancel = function ($scope) {
                        typeof cancelFn == 'function' && cancelFn();
                        modal.$promise.then(modal.hide);
                    };
                }
            });
            modal.$promise.then(modal.show);
        };
        //职业列表-删除确认
        $rootScope.operationConfirm = function (title, content, okFn, cancelFn) {
            var modal = $modal({
                html: true,
                show: false,
                templateUrl: 'views/template/operationConfirm.html',
                controller: function ($scope) {
                    $scope.title = title;
                    $scope.content = content;
                    $scope.ok = function () {
                        typeof okFn == 'function' && okFn();
                        modal.$promise.then(modal.hide);
                    };
                    $scope.cancel = function ($scope) {
                        typeof cancelFn == 'function' && cancelFn();
                        modal.$promise.then(modal.hide);
                    };
                }
            });
            modal.$promise.then(modal.show);
        };

    })
    .config(function ($stateProvider, $urlRouterProvider ,$ocLazyLoadProvider) {
    // 定义懒加载功能
    var _lazyLoad = function (loaded) {
        return function ($ocLazyLoad) {
            return $ocLazyLoad.load(loaded, {serie: true});
        }
    };

    $ocLazyLoadProvider.config({
        debug: true,//调试时设为true，上线时设为false
        events: true
    });
    $urlRouterProvider.otherwise('/login');
    // $urlRouterProvider.when('','/login');
    $stateProvider
        //登录模块

        .state('login',{
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'logInController',
            controllerAs: 'vm',
            resolve:{
                loadMyFile:_lazyLoad([
                    // 这里注入要加载的文件
                    'styles/login.css',
                    'scripts/login.js'
                ])
            }
        })

        .state('field',{
            url: '/panel',
            templateUrl: 'views/panel.html',
            resolve:{
                loadMyFile:_lazyLoad([
                    // 这里注入要加载的文件
                ])
            },
            redirectTo: 'field.homepage'  //指向默认页，用$state.go会导致刷新别的页面也会跳转到欢迎页
        })

        .state('field.homepage',{
            url: '/homepage',
            templateUrl: 'views/homepage.html',
            resolve:{
                loadMyFile:_lazyLoad([
                    // 这里注入要加载的文件
                    ])
            }
        })
//article管理
        .state('field.articleList',{
            url: '/articleList?title&author&startAt&endAt&type&status&page',
            templateUrl: 'views/article/articleList.html',
            controller: 'articleList',
            controllerAs: 'vm',
            resolve:{
                loadMyFile:_lazyLoad([
                    'scripts/articleList.js',
                ])
            }
        })
        //article编辑
        .state('field.articleDetali',{
            url: '/articleDetali?id',
            templateUrl: 'views/article/articleDetail.html',
            controller: 'articleDetailCtrl',
            controllerAs: 'vm',
            resolve:{
                loadMyFile:_lazyLoad([
                    'scripts/articleDetail.js',
                ])
            }
        })
        //公司列表管理
        .state('field.companyList',{
            url: '/companyList?page&size&name&product&province&city&county&financing&freezed&approved&industry',
            templateUrl: 'views/company/companyList.html',
            controller: 'companyList',
            controllerAs: 'vm',
            resolve:{
                loadMyFile:_lazyLoad([
                    'area-selcet',
                    'scripts/constant/areaConstant.js',
                    'scripts/companyList.js',
                ])
            }
        })


});