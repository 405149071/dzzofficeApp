angular.module('starter.controllers')

  // -----------------User
  .controller('homeCtrl', function ($scope, $rootScope, $ionicLoading, $ionicPopup, $timeout, $state, Category,Helper,User) {
    $ionicLoading.show({
      template: '<div><ion-spinner icon="ios" ></ion-spinner><div>加载中</div></div>'
    });
    if(!$rootScope.currentUser && User.loadToken()){
      User.getUserById($rootScope.localUser.id).then(function(data){
        if(data.status == false){
          $state.go('login');
        }else{
          data = data.data;
          $rootScope.currentUser = data;
          getCategory();
        }
      });
    }else{
      getCategory();
    }
  function getCategory(){
    Category.loadCategoryList(0).then(function (data) {
      $ionicLoading.hide();
      if (data.status) {
        //console.log(data.data);
        $scope.categorys = data.data;
        Category.storeCategorys(data.data);
      }else{
        Helper.noLoginPopup();
      }
    })
  }
  })
  .controller('subCategoryCtrl', function ($scope,$stateParams,$ionicHistory,Category,$state) {
   var catid = $stateParams.catid;
    /*Category.loadCategoryList(catid).then(function (data) {
     if (data.status) {
     console.log(data.data);
     $scope.categorys = data.data;
     }
     });*/
    var categorys= Category.loadCategorys();
    $scope.categorys = categorys;
    $scope.catid = catid;
    $scope.myGoBack = function() {
      if(!$ionicHistory.goBack()){
        $state.go('home');
      };
    };
  })


;

