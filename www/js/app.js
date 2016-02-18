// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','starter.services','ngSanitize','ngCordova'])


  .run(function ($ionicPlatform) {
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
    .state('welcome', {
      url: '/welcome',
      templateUrl: 'template/welcome.html',
      controller: 'welcomeCtrl'
    })
    function checkLocalToken(){
      $scope.user = User.loadUserInfo();
      var token = User.loadToken();
      if(token && $scope.user.id){
        User.getUserById($scope.user.id).then(function(data){
          $rootScope.currentUser = data;
          //聊天登录
          ChatDetail.login(data.id);
          $state.go('tab.main',{},{reload:true});
        })
      }else if($scope.user.id){
        $scope.user.id = undefined;
      }
    };
    $urlRouterProvider.otherwise('/welcome');
  })
