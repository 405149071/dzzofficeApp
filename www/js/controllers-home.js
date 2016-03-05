angular.module('starter.controllers')

  // -----------------User
  .controller('homeCtrl', function ($scope,$rootScope, $ionicLoading, $ionicPopup, $timeout,$state,Category,$ionicHistory) {
    Category.loadCategoryList().then(function (data) {
      if(data.status){console.log(data.data);
        $scope.categorys = data.data;
      }
    })

  })



;

