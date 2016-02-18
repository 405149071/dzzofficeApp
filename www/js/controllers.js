FEEDS_REC = "feeds_rec";
FEEDS_JOB = "feeds_job";
FEEDS_EMPLOY = "feeds_employ";

PAGE_SIZE = 30;

isAuthorized = false;

angular.module('starter.controllers', [])

    .controller('welcomeCtrl', function ($scope, $state,User) {
        //check update first
        //Update.checkUpdate(false).then(function(){
        $scope.countdown = 5;
        var interval = setInterval(function () {
            $scope.countdown--;
            $scope.$digest();
        }, 1000);

        var timer = setTimeout(function () {
            $scope.startApp();
        }, 5000);

        $scope.startApp = function () {
            clearInterval(interval);
            clearTimeout(timer);
           // $state.go('login');
          checkLocalToken();
        };

        $scope.slideChanged = function (index) {
            $scope.slideIndex = index;
        };
       /*},function(err){
            ionic.Platform.exitApp();
        });
        */
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
        }else{
          $state.go('login');
        }
      };

    })
;

