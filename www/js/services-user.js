

angular.module('starter.services')
.factory('User',function($http,$cordovaContacts){
  var LOCAL_TOKEN_KEY = "17NEITUI_TOKEN_KEY";
  var LOCAL_USERID_KEY = "17NEITUI_USERID_KEY";
  var LOCAL_PHONE_KEY = "17NEITUI_PHONE_KEY";

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


  function storeUserInfo(userId,phone){
    window.localStorage.setItem(LOCAL_USERID_KEY,userId);
    window.localStorage.setItem(LOCAL_PHONE_KEY,phone);
  }

  function uploadContacts(id,contacts){
    return $http.post(url_users_user_contacts(id),contacts).then(function(response){
      return response.data;
    })
  }

  function getAllContacts() {
      var options = {};
      options.filter = "";
      options.multiple = true;
      var res =  $cordovaContacts.find(options).then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
        contacts = [];
        for(var i=0;i<allContacts.length;i++){
          var c = allContacts[i];
          if(c.phoneNumbers){
            for(var j=0;j<c.phoneNumbers.length;j++){
                contact = {}
                contact.name="";
                if(c.name)
                    contact.name=c.name.formatted;
                contact.phone = c.phoneNumbers[j].value;
                contacts.push(contact);
            }
          }
        }
        return contacts;

      },function(error){
          console.log('getAllContacts error',error);
      })
      return res;
  }

  function updateSyncConstactsStatus(userId,status){
      user={id:userId,syncContacts:status}
      return $http.put(url_users_user(userId),user).then(function(response){
        return response.data;
      });
  }

  return {


    loadUserInfo : function(){
      var id = window.localStorage.getItem(LOCAL_USERID_KEY);
      var phone = window.localStorage.getItem(LOCAL_PHONE_KEY);
      return {id:id, phone: phone};
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
        if(response.data && response.data.token){
          var token = response.data.token;
          storeToken(token);
          storeUserInfo(response.data.id,response.data.phone)
          return response.data;
        };
        return null;
      });
    },

    updatePassword : function(user){
      return $http.put(url_auth_passowrd,user).then(function(response){
        if(response.data && response.data.token){
          var token = response.data.token;
          storeToken(token);
          storeUserInfo(response.data.id,response.data.phone)
          return response.data;
        };
        return null;
      });
    },

    add : function(user){
      return $http.post(url_users,user).then(function(response){
        if(response.data && response.data.token){
          var token = response.data.token;
          storeToken(token);
          storeUserInfo(response.data.id,response.data.phone)
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

    sendSMS : function(phone){
      return $http.post(url_auth_sms_randcode,{"phone":phone}).then(function(response){
        return response.data;
      })
    },

    syncContacts : function(userId){
      getAllContacts().then(function(contacts){
        uploadContacts(userId,contacts).then(function(data){
          updateSyncConstactsStatus(userId,1);
          return data;
        })
      })
    },

    disSyncContacts : function(userId){
      updateSyncConstactsStatus(userId,0);
    }

  }

});
