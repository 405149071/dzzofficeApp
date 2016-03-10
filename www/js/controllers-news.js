angular.module('starter.controllers')

  // -----------------User
  .controller('listCtrl', function ($scope, $stateParams, $rootScope, $ionicLoading, $ionicPopup, $timeout, $state, Views, $ionicHistory, Category, Helper) {
    var count = 0;
    var perpage = 0;
    var curepage = 1;
    var page = 1;
    var hasSubCategory = false;
    var loadMore = true;

    $ionicLoading.show({
      template: '<div><ion-spinner icon="ios" ></ion-spinner></i></div><div>加载中</div>'
    });
    var catid = $stateParams.catid;
    var categorys = Category.loadCategorys();
    Views.loadList(catid, false, page).then(function (data) {
      $ionicLoading.hide();
      if (data.status) {
        console.log(data.data);
        count = data.data.count;
        perpage = data.data.perpage;
        curepage = data.data.page;
        $scope.list = data.data.list;
      } else {
        Helper.noLoginPopup();
      }
    });
    $scope.myGoBack = function () {
      if (!$ionicHistory.goBack()) {
        for (index in categorys) {
          if (categorys[index].sub) {
            for (i in categorys[index].sub) {
              if (categorys[index].sub[i].catid == catid) {
                hasSubCategory = true;
                $state.go('subCategory', {catid: categorys[index].catid});
              }
            }
          }
        }
        if (!hasSubCategory)
          $state.go('home');
      }
      ;
    };
    $scope.more = function () {
      pageCount = perpage > 0 ? parseInt(count / perpage) : 0;
      page = pageCount > page ? page + 1 : page;
      if (loadMore) {
        $ionicLoading.show({
          template: '<div><ion-spinner icon="ios" ></ion-spinner></i></div><div>加载中</div>'
        });
        Views.loadList(catid, true, page).then(function (data) {
          $ionicLoading.hide();
          if (data.status) {
            count = data.data.count;
            perpage = data.data.perpage;
            curepage = data.data.page;
            if (page > 1) {
              var data = data.data.list;
              data.forEach(function (v) {
                $scope.list.push(v)
              });
              if (page == pageCount)
                loadMore = false;
            } else {
              $scope.list = data.data.list;
            }
          } else {
            Helper.noLoginPopup();
          }
        });
      }
    }
  })
  .controller('viewCtrl', function ($scope, $stateParams, $ionicHistory, Views, $state, $ionicLoading, Helper) {
    $ionicLoading.show({
      template: '<div><ion-spinner icon="ios" ></ion-spinner></i></div><div>加载中</div>'
    });
    var viewId = $stateParams.id;
    Views.loadView(viewId).then(function (data) {
      $ionicLoading.hide();
      if (data.status) {
        console.log(data.data);
        $scope.view = data.data;
      } else {
        Helper.noLoginPopup();
      }
    });
    $scope.myGoBack = function () {
      if (!$ionicHistory.goBack()) {
        $state.go('list', {catid: $scope.view.catid});
      }
      ;
    };
  })


;

