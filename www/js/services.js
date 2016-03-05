var url_base = "http://192.168.0.107:83/api.php?";
var url_base1 = "http://www.17neitui.com/rest";
var chat_server = "http://www.17neitui.com:80/";


//Auth
var url_auth = url_base+"mod=user";
var url_authorization = url_auth + "&action=login";
var url_auth_passowrd = url_auth + "/password";
var url_auth_sms_randcode = url_auth + "/sms/randcode";

//Users
var url_users = url_auth + "&action=userInfo&uid=";


url_users_user = function(id){
  return url_users + "/"+id;
}



//news
var url_news = url_base + "mod=news";
var url_category_list = url_news + "&action=category";
var url_news_list = url_news+"&action=list";
var url_news_view = url_news+"&action=view";


angular.module('starter.services', [])

.factory('httpInterceptor',function($rootScope,$q){

  return{
    'responseError' : function(response){
      $rootScope.$broadcast('loading:hide');
      $rootScope.$broadcast({
        401 : "Not Authenticated",
        403 : "Not Authorized"
      }[response.status],response);
      return $q.reject(response);
    },
    'request' : function(config){
      $rootScope.$broadcast('loading:show');
      return config;
    },
    'response': function(response) {
      if(response.data && response.data.error){
        $rootScope.responseMsg = response.data.error;
        $rootScope.$broadcast('modal:show');
      }
      $rootScope.$broadcast('loading:hide');

      return response;
    }
  }
})

.factory('WechatShare',function(){
  return {
    share : function(title,description,thumb,link,scene,$ionicPopup){
        Wechat.isInstalled(function (installed) {
            if(installed){

              if(scene==0)
                scene = Wechat.Scene.SESSION
              else
                scene = Wechat.Scene.TIMELINE

              Wechat.share({
                  message: {
                      title: title,
                      description:  description,
                      thumb: thumb,

                      media: {
                          type: Wechat.Type.LINK,
                          webpageUrl: link
                      }
                  },
                  scene: scene
              });
          }else{
            $ionicPopup.alert({ title: '提示', template:"亲，你还没有安装微信哦"});
          }
        }, function (reason) {
            $ionicPopup.alert({ title: '提示', template:"分享失败"});
        });
    }
  }
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpInterceptor');

});
