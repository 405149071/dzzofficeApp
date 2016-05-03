

angular.module('starter.services')
.factory('Views',function($http){

  return {
    loadList : function(catid,isHistory,page){
      return $http.get(url_news_list(catid,isHistory,page)).then(function(response){
        return response.data;
      })
    },
    searchList : function(keywords){
      return $http.get(url_search_list(keywords)).then(function(response){
        return response.data;
      })
    },
    loadView : function(viewId){
      return $http.get(url_news_view(viewId)).then(function(response){
        return response.data;
      })
    },
  }

});
