angular.module('starter.controllers')

  // -----------------User
  .controller('loginCtrl', function ($scope, $rootScope, $ionicLoading, $ionicPopup, $timeout, $state, User, $ionicHistory,$window) {
    $scope.uname = window.localStorage.getItem('input_user_name');
    $scope.password = window.localStorage.getItem('input_password');
    var loginStatus = false;
    $scope.doLogin = function (uname,password,isChecked) {
      user = {'uname': uname, 'password': password, 'isChecked': isChecked};
      if (!user || !user.uname) {
        return;
      }
      if (user.password) {
        $ionicLoading.show({
          template: '<div><ion-spinner icon="ios" ></ion-spinner></i></div><div>登陆中</div>'
        });
        User.authorization(user).then(function (data) {

          if (data == undefined || data == "") {
            $ionicLoading.show({
              template: '<div>用户名密码不一致，请重新输入</div>',
            });
          } else if (data.uid != undefined) {
            loginStatus = true;
            if (user.isChecked) {
              window.localStorage.setItem('input_user_name', user.uname);
              window.localStorage.setItem('input_password', user.password);
            } else {
              window.localStorage.setItem('input_user_name', '');
              window.localStorage.setItem('input_password', '');
            }
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
            $rootScope.currentUser = data;
            $window.plugins.jPushPlugin.setAlias(data.uid);
            $state.go('home', {reload: true})
          } else {
            $ionicLoading.show({
              template: '<div>服务器累了，请稍后重试</div>'
            });
          }
        }, function (data) {
          $ionicLoading.show({
            template: '<div>恩...网络有点问题，请待会再试一试</div>'
          });
        }).finally(function(){
          if (!loginStatus) {
            $timeout(function () {
              $ionicLoading.hide(); //由于某种原因3秒后关闭弹出
            }, 1500);
          }

        })
      }
    }
    function checkLocalToken() {
      $scope.user = User.loadUserInfo();
      var token = User.loadToken();
      console.log(token);
      console.log($scope.user);
      if (token && $scope.user.id) {
        User.getUserById($scope.user.id).then(function (data) {
          if(data.data.token==token){
            $rootScope.currentUser = data.data;
            $state.go('home');
          }
        })
      }
    };
    checkLocalToken();
  })
  .controller('userLogoutCtrl', function ($scope, $state, $ionicHistory, $ionicPopup, $rootScope, User,$window) {
    $scope.user = $rootScope.currentUser;
    $scope.logout = function () {
      $ionicHistory.clearHistory();
      $ionicHistory.clearCache();
      User.removeToken();
      $window.plugins.jPushPlugin.setAlias('');
      $state.go('login');
    }

    $scope.myGoBack = function () {
      if (!$ionicHistory.goBack()) {
        $state.go('home');
      }
      ;
    };
  })


;

