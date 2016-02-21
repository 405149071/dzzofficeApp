// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','starter.services','ngSanitize','ngCordova'])


  .run(function ($ionicPlatform,$ionicPopup,$ionicHistory) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
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
          $ionicHistory.goBack();
        }
      }, 100);
    });
  })
  .value(
    'user', window.localStorage.getItem('user')
  )
  .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state("login", {
        url:'/login',
        templateUrl: "template/login.html",
        controller: 'loginCtrl'
      })
      .state("home", {
        url:'/home',
        templateUrl: "template/home.html"
      })
    $urlRouterProvider.otherwise('/login');
  })
