

angular.module('starter.services')
.factory('Category',function($http){
var LOCAL_CATEGORYS_KEY = 'DZZOFFICE_CATEGORYS_KEY';
  return {
    loadCategoryList : function(catid){
      return $http.get(url_category_list(catid)).then(function(response){
        return response.data;
      })
    },
    storeCategorys:function (categorys){
    window.localStorage.setItem(LOCAL_CATEGORYS_KEY,JSON.stringify(categorys));
  },
    loadCategorys:function (){
     var CategoryStr = window.localStorage.getItem(LOCAL_CATEGORYS_KEY);
      return JSON.parse(CategoryStr);
    },
    unreadCount:function(){
      return $http.get(url_unread_count()).then(function(response){
        if(response.status){
          return response.data.data;
        }else{
          return 0;
        }

      })
    }
  }

});
