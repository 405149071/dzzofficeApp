

angular.module('starter.services')
.factory('Views',function($http){

  return {
    loadList : function(catid){
      return $http.get(url_news_list(catid)).then(function(response){
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
