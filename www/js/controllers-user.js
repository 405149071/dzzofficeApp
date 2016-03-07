angular.module('starter.controllers')

  // -----------------User
  .controller('loginCtrl', function ($scope,$rootScope, $ionicLoading, $ionicPopup, $timeout,$state,User,$ionicHistory) {
    $scope.doLogin = function (user) {
      function checkLocalToken(){
        $scope.user = User.loadUserInfo();
        var token = User.loadToken();
        console.log(token);
        console.log($scope.user);
        if(token && $scope.user.id){
          User.getUserById($scope.user.id).then(function(data){
            $rootScope.currentUser = data;
            $state.go('home');
          })
        }
      };
      if (!user || !user.uname) {
        return;
      }
      if(user.password){
        $ionicLoading.show({
          template: '<div><ion-spinner icon="ios" ></ion-spinner></i></div><div>登陆中</div>'
        });
        User.authorization(user).then(function (data) {

          if (data == undefined || data == "") {
            $ionicLoading.show({
              template: '<div>用户名密码不一致，请重新输入</div>',
            });
          } else if (data.uid != undefined) {
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
            $rootScope.currentUser = data;
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
        })
      }
      $timeout(function () {
        $ionicLoading.hide(); //由于某种原因3秒后关闭弹出
      }, 1500);
      checkLocalToken();
    }

  })
    .controller('userLogoutCtrl',function($scope,$state,$ionicHistory,$ionicPopup,$rootScope,User){console.log($rootScope.currentUser);
        $scope.user = $rootScope.currentUser;
        $scope.logout=function(){
          $ionicHistory.clearHistory();
          $ionicHistory.clearCache();
          User.removeToken();
          $state.go('login');
        }

      $scope.myGoBack = function() {
        if(!$ionicHistory.goBack()){
           $state.go('home');
        };
      };
    })



;

