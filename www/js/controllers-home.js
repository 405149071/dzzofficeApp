angular.module('starter.controllers')

  // -----------------User
  .controller('homeCtrl', function ($scope, $rootScope, $ionicLoading, $ionicPopup, $timeout, $state, Category,Helper,User,Views) {
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
    $scope.searchList = false;
    $scope.visible = false;
    $scope.svisible = true;
    $scope.search=function(keywords){
      if(keywords==undefined||!keywords){
        $ionicPopup.alert({ title: '提示', template:"亲，你还没有输入搜索内容哦"});
      }else{
        $ionicLoading.show({
          template: '<div><ion-spinner icon="ios" ></ion-spinner><div>加载中</div></div>'
        });
        getList(keywords);
        $scope.searchList = true;
        $scope.visible=!$scope.visible;
        $scope.svisible =  !$scope.svisible;
      }
    }
    $scope.cancel=function(){
      $scope.searchList = false;
      $scope.visible=!$scope.visible;
      $scope.svisible =  !$scope.svisible;
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
    function getList(keywords){
      Views.searchList(keywords).then(function (data) {
        $ionicLoading.hide();
        if (data.status) {
            $scope.list = data.data.list;
        } else {
          Helper.noLoginPopup();
        }
      });
    }
  })
  .controller('subCategoryCtrl', function ($scope,$stateParams,$ionicHistory,Category,$state) {
   var catid = $stateParams.catid;
    Category.loadCategoryList(catid).then(function (data) {
     if (data.status) {
     console.log(data.data);
     $scope.categorys = data.data;
     }
     });
   // var categorys= Category.loadCategorys();
   // $scope.categorys = categorys;
    $scope.catid = catid;
    $scope.myGoBack = function() {
      if(!$ionicHistory.goBack()){
        $state.go('home');
      };
    };
  })


;

