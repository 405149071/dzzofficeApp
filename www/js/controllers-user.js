angular.module('starter.controllers')

  // -----------------User
  .controller('loginCtrl', function ($scope,$rootScope, $ionicLoading, $ionicPopup, $timeout,$state,User) {
    $scope.doLogin = function (user) {
      if (!user || !user.uname) {
        return;
      }
      if(user.pwd){
        $ionicLoading.show({
          template: '<div><ion-spinner icon="ios" ></ion-spinner></i></div><div>登陆中</div>'
        });
        User.authorization(user).then(function (data) {

          if (data == undefined || data == "") {
            $ionicLoading.show({
              template: '<div>用户名密码不一致，请重新输入</div>'
            });
          } else if (data.id != undefined) {
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
    }
  })
    .controller('userLogoutCtrl',function($scope,$state,$ionicHistory,$ionicPopup){

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if(toState.name == "tab.logout"){
                $ionicHistory.clearHistory();
                $ionicHistory.clearCache();
                $state.go('login');
            }
        });

    })



;

