/**
 * Created by CT on 2017/2/22.
 */
"use strict";
angular.module('admin',['ui.router','oc.lazyLoad'])
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
            url: '/articleList',
            templateUrl: 'views/articleList.html',
            controller: 'articleList',
            controllerAs: 'vm',
            resolve:{
                loadMyFile:_lazyLoad([
                    'styles/articleList.css',
                    'scripts/articleList.js'
                ])
            }
        })



});