// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','starter.services','ngSanitize','ngCordova'])


  .run(function ($ionicPlatform,$ionicPopup,$ionicHistory,$state,User,$rootScope,$window) {
    $ionicPlatform.ready(function () {
      var localUser = User.loadUserInfo();
      $rootScope.localUser = localUser;
      //已登录跳转到主页
      if (localUser.id && User.loadToken()) {
        if($ionicHistory.currentStateName() == "login" || !$ionicHistory.currentStateName()){
          $state.go('home');
        }
      }else{
        $state.go('login');
      }
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(false);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      //jpush
      //启动极光推送服务
      //推送初始化
      var openNotificationInAndroidCallback=function(data){
        var json=data;
        if(typeof data === 'string'){
          json=JSON.parse(data);
        }
        var id=json.extras['cn.jpush.android.EXTRA'].id;
        if(id)
          $state.go('view',{id:id});
      }
      //Android接收到消息
      var _receiveMessageInAndroidCallback = function (data) {
        console.log('_receiveMessageInAndroidCallback: ' + data);
        alert('_receiveMessageInAndroidCallback: ' + data);
        //do something
      };
      //IOS打开通知栏消息
      var _receiveMessageIniOSCallback = function (data) {
        console.log('_receiveMessageIniOSCallback: ' + data);
        alert('_receiveMessageInAndroidCallback: ' + data);
        var json=data;
        if(typeof data === 'string'){
          json=JSON.parse(data);
        }
        var id=json.extras['cn.jpush.android.EXTRA'].id;
        if(id)
          $state.go('view',{id:id});
        //do something
      };
      $window.plugins.jPushPlugin.init();
      //注册Android接收到通知事件
     // $window.plugins.jPushPlugin.receiveMessageInAndroidCallback = _receiveMessageInAndroidCallback
      //注册IOS打开通知栏事件
      $window.plugins.jPushPlugin.receiveMessageIniOSCallback = _receiveMessageIniOSCallback;
      //打开推送消息事件处理
      $window.plugins.jPushPlugin.openNotificationInAndroidCallback=openNotificationInAndroidCallback;

      $window.plugins.jPushPlugin.setAlias(localUser.id);
//调试模式
      $window.plugins.jPushPlugin.setDebugMode(false);
      //handle android backbutton

      $ionicPlatform.registerBackButtonAction(function (event) {
        event.preventDefault();
        function showConfirm() {
          var confirmPopup = $ionicPopup.confirm({
            title: '<strong>退出应用?</strong>',
            template: '你确定要退出应用吗?',
            okText: '退出',
            cancelText: '取消'
          });

          confirmPopup.then(function (res) {
            if (res) {
              ionic.Platform.exitApp();
            } else {
              // Don't close
            }
          });
        }
        if($ionicHistory.currentStateName() == "home" || $ionicHistory.currentStateName() == "login"){
          showConfirm();
        }
        else {
          if(!$ionicHistory.goBack()){
            $state.go('home');
          };
        }
      }, 100);


    });
  })
  .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state("login", {
        url:'/login',
        templateUrl: "template/login.html",
        controller: 'loginCtrl'
      })
      .state("logout", {
        url:'/logout',
        templateUrl: "template/logout.html",
        controller: 'userLogoutCtrl'
      })
      .state("home", {
        url:'/home',
        templateUrl: "template/home.html",
        controller: 'homeCtrl'
      })
      .state("subCategory", {
        url:'/subCategory/:catid',
        templateUrl: "template/subCategory.html",
        controller: 'subCategoryCtrl'
      })
      .state("list", {
        url:'/list/:catid',
        templateUrl: "template/list.html",
        controller: 'listCtrl'
      })
      .state("view", {
        url:'/view/:id',
        templateUrl: "template/view.html",
        controller: 'viewCtrl'
      })
     // $urlRouterProvider.otherwise('/home');
  })

