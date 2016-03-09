angular.module('starter.controllers')

  // -----------------User
  .controller('listCtrl', function ($scope, $stateParams,$rootScope, $ionicLoading, $ionicPopup, $timeout, $state, Views,$ionicHistory,Category,Helper) {
    $scope.Curepage = 1;
    var hasSubCategory = false;
    $ionicLoading.show({
      template: '<div><ion-spinner icon="ios" ></ion-spinner></i></div><div>加载中</div>'
    });
    var catid = $stateParams.catid;
    var categorys = Category.loadCategorys();
    Views.loadList(catid).then(function (data) {
      $ionicLoading.hide();
      if (data.status) {
        console.log(data.data);
        $scope.list = data.data.list;
      }else{
        Helper.noLoginPopup();
      }
    });
    $scope.myGoBack = function() {
      if(!$ionicHistory.goBack()){
        for(index in categorys){
          if(categorys[index].sub){
            for(i in categorys[index].sub){
              if(categorys[index].sub[i].catid==catid){
                hasSubCategory = true;
                $state.go('subCategory',{catid:categorys[index].catid});
              }
            }
          }
        }
        if(!hasSubCategory)
          $state.go('home');
      };
    };
    $scope.more=function(){
      $ionicLoading.show({
        template: '<div><ion-spinner icon="ios" ></ion-spinner></i></div><div>加载中</div>'
      });
      Views.loadList(catid,true).then(function (data) {
        $ionicLoading.hide();
        if (data.status) {
          $scope.list = data.data.list;
        }else{
          Helper.noLoginPopup();
        }
      });
    }
  })
  .controller('viewCtrl', function ($scope,$stateParams,$ionicHistory,Views,$state,$ionicLoading,Helper ) {
    $ionicLoading.show({
      template: '<div><ion-spinner icon="ios" ></ion-spinner></i></div><div>加载中</div>'
    });
   var viewId = $stateParams.id;
    Views.loadView(viewId).then(function (data) {
      $ionicLoading.hide();
      if (data.status) {console.log( data.data);
        $scope.view = data.data;
      }else{
        Helper.noLoginPopup();
      }
    });
    $scope.myGoBack = function() {
      if(!$ionicHistory.goBack()){
        $state.go('list',{catid:$scope.view.catid});
      };
    };
  })


;

