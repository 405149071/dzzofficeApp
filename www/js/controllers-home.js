angular.module('starter.controllers')

  // -----------------User
  .controller('homeCtrl', function ($scope, $rootScope, $ionicLoading, $ionicPopup, $timeout, $state, Category) {
    Category.loadCategoryList(0).then(function (data) {
      if (data.status) {
        //console.log(data.data);
        $scope.categorys = data.data;
      }
    })
  })
  .controller('subCategory', function ($scope,$stateParams,$ionicHistory,Category) {
   var catid = $stateParams.catid;
    Category.loadCategoryList(catid).then(function (data) {
      if (data.status) {
        console.log(data.data);
        $scope.categorys = data.data;
      }
    });
    $scope.myGoBack = function() {
      if(!$ionicHistory.goBack()){
        $state.go('home');
      };
    };
  })


;

