var url_base = "http://www.17neitui.com/api";
var url_base1 = "http://www.17neitui.com/rest";
var chat_server = "http://www.17neitui.com:80/";
//var socket = io.connect(chat_server, {reconnectionAttempts:3,reconnectionDelay: 3000, timeout: 30000});

//Auth
var url_auth = url_base+"/auth";
var url_authorization = url_auth + "/authorization";
var url_auth_passowrd = url_auth + "/password";
var url_auth_sms_randcode = url_auth + "/sms/randcode";

//Users
var url_users = url_base + "/users";

//chat
var url_contact = url_base1 + "/contact";
var url_chathistory = url_base1 + "/chat/history";
var url_chatcreate = url_base1 + "/chat/create";
var url_users_jobs = url_users + "/jobs";
var url_users_edus = url_users + "/edus";


url_users_jobs_job = function(id){
  return url_users_jobs+"/"+id;
}
url_users_edus_edu = function(id){
  return url_users_edus+"/"+id;
}

url_users_user = function(id){
  return url_users + "/"+id;
}

url_users_user_contacts =  function(id){
  return url_users_user(id) + "/contacts";
}

url_users_user_jobs = function(id){
  return url_users_user(id) + "/jobs";
}
url_users_user_edus = function(id){
  return url_users_user(id) + "/edus";
}

url_users_user_stat = function(id){
  return url_users_user(id)+"/stat";
}
url_users_user_checkEmail = function(id,email){
 return url_users_user(id)+"/checkemail?email="+email;
}

//Jobs
var url_jobs = url_base + "/jobs";
url_jobs_job = function(id){
  return url_jobs+"/"+id;
}
url_jobs_user = function(userId){
  return url_jobs+"/user"+"/"+userId;
}
url_jobs_user_feeds = function(userId,feedsType){
  return url_jobs+"/user"+"/"+userId+"/"+feedsType;
}

url_jobs_job_friends_rec = function(userId,jobId){
  return url_jobs_job(jobId)+"/rec/"+userId;
}

url_jobs_job_friends_job = function(userId,jobId){
  return url_jobs_job(jobId)+"/job/"+userId;
}

url_jobs_job_friends_employ = function(userId,jobId){
  return url_jobs_job(jobId)+"/employ/"+userId;
}

url_jobs_job_all_candidates = function(userId,jobId){
  return url_jobs_job(jobId)+"/candidates/"+userId;
}

//Candidates
var url_candidates = url_base+"/candidates";
var url_candidates_rec = url_candidates+"/rec";
var url_candidates_job = url_candidates+"/job";
var url_candidates_employ = url_candidates+"/employ";


url_candidates_candidate = function(candidateId){
  return url_candidates + "/" + candidateId;
}
url_candidates_rec_friends = function(userId){
  return url_candidates_rec + "/" + userId;
}
url_candidates_job_friends = function(userId){
  return url_candidates_job + "/" + userId;
}
url_candidates_employ_friends = function(userId){
  return url_candidates_employ + "/" + userId;
}
url_candidates_unread = function(userId){
  return url_candidates + "/unread/" + userId;
}

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
