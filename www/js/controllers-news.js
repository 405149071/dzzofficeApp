angular.module('starter.controllers')

  // -----------------User
  .controller('listCtrl', function ($scope, $stateParams,$rootScope, $ionicLoading, $ionicPopup, $timeout, $state, Views) {
    var catid = $stateParams.catid;
    Views.loadList(catid).then(function (data) {
      if (data.status) {
        console.log(data.data);
        $scope.list = data.data.list;
      }
    });
    $scope.myGoBack = function() {
      if(!$ionicHistory.goBack()){
        $state.go('home');
      };
    };
  })
  .controller('viewCtrl', function ($scope,$stateParams,$ionicHistory,Views) {
   var viewId = $stateParams.id;
    Views.loadView(viewId).then(function (data) {
      if (data.status) {
        console.log(data.data);
        $scope.view = data.data;
      }
    });
    $scope.myGoBack = function() {
      if(!$ionicHistory.goBack()){
        $state.go('home');
      };
    };
  })


;

