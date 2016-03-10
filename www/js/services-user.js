

angular.module('starter.services')
.factory('User',function($http){
  var LOCAL_TOKEN_KEY = "DZZOFFICE_TOKEN_KEY";
  var LOCAL_USERID_KEY = "DZZOFFICE_USERID_KEY";
  var LOCAL_USERNAME_KEY = "DZZOFFICE_USERNAME_KEY";

  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;

    // Set the token as header for your requests!
    $http.defaults.headers.common['X-AUTH-TOKEN'] = token;
    // console.log("$http.defaults.headers.common['X-AUTH-TOKEN']",token);
  };

  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common['X-AUTH-TOKEN'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    window.localStorage.removeItem(LOCAL_USERID_KEY);
  };

  function storeToken (token){
    window.localStorage.setItem(LOCAL_TOKEN_KEY,token);
    useCredentials(token);
    // console.log("storeToken",token);
  };


  function storeUserInfo(userId, username){
    window.localStorage.setItem(LOCAL_USERID_KEY,userId);
    window.localStorage.setItem(LOCAL_USERNAME_KEY,username);
  }

  return {


    loadUserInfo : function(){
      var id = window.localStorage.getItem(LOCAL_USERID_KEY);
      var username = window.localStorage.getItem(LOCAL_USERNAME_KEY);
      return {id:id, username: username};
    },

    loadToken : function(){
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if(token){
        useCredentials(token);
        // console.log("loadToken",token);
        return true;
      }
      return false;
    },


    removeToken : function(){
      destroyUserCredentials();
    },

    authorization : function(user){
      return $http.post(url_authorization,user).then(function(response, status, headers, config){
        if(response.data && response.data.data.token){
          var token = response.data.data.token;
          storeToken(token);
          storeUserInfo(response.data.data.uid, response.data.data.username)
          return response.data.data;
        };
        return null;
      });
    },


    add : function(user){
      return $http.post(url_users,user).then(function(response){
        if(response.data && response.data.token){
          var token = response.data.token;
          storeToken(token);
          storeUserInfo(response.data.id, response.data.phone)
          return response.data;
        };
        return null;
      });
    },

    getUserById : function(id){
      return $http.get(url_users_user(id)).then(function(response){
        return response.data;
      });
    },


    getUserStat : function(id){
      return $http.get(url_users_user_stat(id)).then(function(response){
        return response.data;
      })
    },



  }

});
